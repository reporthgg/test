import { prisma } from "@/lib/prisma";
import {
  findBitrixLead,
  sendLeadToBitrix,
  type BitrixLeadPayload,
  type BitrixSendResult,
} from "@/lib/bitrix";

export type BitrixDeliveryRecord = {
  version: 1;
  status: "pending" | "sent" | "failed" | "uncertain" | "not_configured";
  attempts: number;
  payload: BitrixLeadPayload;
  remoteId?: number;
  attemptedAt?: string;
  errorCode?: string;
};

export type BitrixDeliverySummary = Pick<
  BitrixDeliveryRecord,
  "status" | "remoteId" | "attemptedAt" | "errorCode"
>;

const RETRY_DELAY_MS = 60_000;
const STATUSES = new Set(["pending", "sent", "failed", "uncertain", "not_configured"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseDelivery(extra: string | null): {
  fields: Record<string, unknown>;
  delivery: BitrixDeliveryRecord;
} | null {
  if (!extra) return null;
  try {
    const fields: unknown = JSON.parse(extra);
    if (!isRecord(fields) || !isRecord(fields._bitrix)) return null;
    const value = fields._bitrix;
    if (value.version !== 1 || typeof value.status !== "string" || !STATUSES.has(value.status) ||
      typeof value.attempts !== "number" || !Number.isSafeInteger(value.attempts) || value.attempts < 0 ||
      !isRecord(value.payload) || typeof value.payload.name !== "string" ||
      typeof value.payload.phone !== "string") return null;
    for (const field of ["email", "source", "title", "comment", "originId"]) {
      if (value.payload[field] != null && typeof value.payload[field] !== "string") return null;
    }
    if (value.attemptedAt !== undefined &&
      (typeof value.attemptedAt !== "string" || !Number.isFinite(Date.parse(value.attemptedAt)))) return null;
    if (value.remoteId !== undefined &&
      (typeof value.remoteId !== "number" || !Number.isSafeInteger(value.remoteId) || value.remoteId <= 0)) return null;
    if (value.status === "sent" && value.remoteId === undefined) return null;
    if (value.errorCode !== undefined &&
      (typeof value.errorCode !== "string" || !/^[A-Z0-9_.:-]{1,100}$/i.test(value.errorCode))) return null;
    return { fields, delivery: value as BitrixDeliveryRecord };
  } catch {
    return null;
  }
}

export function getBitrixDeliverySummary(extra: string | null): BitrixDeliverySummary | null {
  const parsed = parseDelivery(extra);
  if (!parsed) return null;
  const { status, remoteId, attemptedAt, errorCode } = parsed.delivery;
  return { status, remoteId, attemptedAt, errorCode };
}

export async function sendStoredLeadToBitrix(leadId: string): Promise<BitrixDeliverySummary> {
  if (typeof leadId !== "string" || !leadId || leadId.length > 200) {
    throw new Error("Некорректный идентификатор заявки.");
  }
  const lead = await prisma.lead.findUniqueOrThrow({ where: { id: leadId }, select: { extra: true } });
  const parsed = parseDelivery(lead.extra);
  if (!parsed) throw new Error("У этой заявки нет сохранённого пакета для Bitrix.");
  const { fields, delivery } = parsed;
  if (delivery.status === "sent") return getBitrixDeliverySummary(lead.extra)!;

  const needsReconciliation = delivery.attempts > 0 &&
    (delivery.status === "pending" || delivery.status === "uncertain");
  if (needsReconciliation && (!delivery.attemptedAt ||
    Date.now() - Date.parse(delivery.attemptedAt) < RETRY_DELAY_MS)) {
    return { status: delivery.status, attemptedAt: delivery.attemptedAt, errorCode: "RETRY_LATER" };
  }

  const active: BitrixDeliveryRecord = {
    ...delivery,
    status: "pending",
    attempts: delivery.attempts + 1,
    attemptedAt: new Date().toISOString(),
    errorCode: undefined,
  };
  const activeExtra = JSON.stringify({ ...fields, _bitrix: active });
  const claimed = await prisma.lead.updateMany({
    where: { id: leadId, extra: lead.extra },
    data: { extra: activeExtra },
  });
  if (claimed.count !== 1) {
    const current = await prisma.lead.findUnique({ where: { id: leadId }, select: { extra: true } });
    return getBitrixDeliverySummary(current?.extra ?? null) ??
      { status: "uncertain", errorCode: "DELIVERY_STATE_CHANGED" };
  }

  let outcome: BitrixSendResult;
  try {
    if (needsReconciliation) {
      const existing = await findBitrixLead(leadId);
      if (existing.status === "sent") outcome = existing;
      else if (existing.status === "not_found") {
        outcome = await sendLeadToBitrix({ ...delivery.payload, originId: leadId });
      } else {
        outcome = { status: "uncertain", errorCode: existing.errorCode };
      }
    } else {
      outcome = await sendLeadToBitrix({ ...delivery.payload, originId: leadId });
    }
  } catch {
    outcome = { status: "uncertain", errorCode: "DELIVERY_ERROR" };
  }

  const completed: BitrixDeliveryRecord = {
    ...active,
    status: outcome.status,
    remoteId: outcome.status === "sent" ? outcome.remoteId : undefined,
    errorCode: outcome.status === "sent" ? undefined : outcome.errorCode,
  };
  const saved = await prisma.lead.updateMany({
    where: { id: leadId, extra: activeExtra },
    data: { extra: JSON.stringify({ ...fields, _bitrix: completed }) },
  });
  if (saved.count !== 1) return { status: "uncertain", errorCode: "DELIVERY_STATE_CHANGED" };
  return {
    status: completed.status,
    remoteId: completed.remoteId,
    attemptedAt: completed.attemptedAt,
    errorCode: completed.errorCode,
  };
}
