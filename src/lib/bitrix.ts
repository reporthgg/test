// Отправка заявки в Bitrix24 через входящий вебхук (crm.lead.add).
// Вебхук берётся из настроек в БД, затем из BITRIX_WEBHOOK_URL. Ошибки не роняют основной запрос.

import { getBitrixWebhookUrl } from "@/lib/settings";

export type BitrixLeadPayload = {
  name: string;
  phone: string;
  email?: string | null;
  title?: string;
  comment?: string;
  source?: string | null;
  originId?: string;
};

type BitrixFailure = {
  status: "failed" | "uncertain" | "not_configured";
  errorCode: string;
};

export type BitrixSendResult = { status: "sent"; remoteId: number } | BitrixFailure;
export type BitrixLookupResult = BitrixSendResult | { status: "not_found" };

const ORIGINATOR = "gscstudy.com";
const RATE_LIMIT_ERRORS = new Set(["QUERY_LIMIT_EXCEEDED", "OPERATION_TIME_LIMIT"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function leadId(value: unknown): number | null {
  const id = typeof value === "string" && /^[1-9]\d*$/.test(value) ? Number(value) : value;
  return typeof id === "number" && Number.isSafeInteger(id) && id > 0 ? id : null;
}

async function requestBitrix(
  method: "crm.lead.add" | "crm.lead.list",
  payload: Record<string, unknown>,
): Promise<{ status: "received"; data: Record<string, unknown> } | BitrixFailure> {
  let configured: string | null;
  try {
    configured = await getBitrixWebhookUrl();
  } catch {
    return { status: "failed", errorCode: "SETTINGS_UNAVAILABLE" };
  }
  if (!configured?.trim()) return { status: "not_configured", errorCode: "NO_WEBHOOK" };

  let url: URL;
  try {
    url = new URL(configured.trim());
    if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) throw new Error();
    const last = url.pathname.replace(/\/$/, "").split("/").at(-1) ?? "";
    if (/^crm\.lead\.(add|list)(\.json)?$/i.test(last)) {
      url.pathname = url.pathname.replace(/crm\.lead\.(add|list)(\.json)?\/?$/i, `${method}.json`);
    } else {
      if (last.includes(".")) throw new Error();
      url.pathname = `${url.pathname.replace(/\/$/, "")}/${method}.json`;
    }
    url.hash = "";
  } catch {
    return { status: "failed", errorCode: "INVALID_WEBHOOK_URL" };
  }

  for (let attempt = 0; attempt < 2; attempt++) {
    let res: Response;
    try {
      res = await fetch(url.toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        // не ждём слишком долго
        signal: AbortSignal.timeout(8000),
        redirect: "error",
      });
    } catch {
      return { status: "uncertain", errorCode: "NETWORK_ERROR" };
    }

    let body: unknown;
    try {
      body = await res.json();
    } catch {
      body = null;
    }
    const data = isRecord(body) ? body : null;
    const hasError = data !== null && Object.hasOwn(data, "error");
    const hasResult = data !== null && Object.hasOwn(data, "result");
    const providerCode = data?.error;
    const errorCode = hasError && typeof providerCode === "string" && /^[A-Z0-9_.:-]{1,100}$/i.test(providerCode)
      ? providerCode
      : hasError ? "BITRIX_ERROR" : `HTTP_${res.status}`;

    if (!hasResult && (res.status === 429 || (hasError && RATE_LIMIT_ERRORS.has(errorCode)))) {
      if (attempt === 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        continue;
      }
      return { status: "failed", errorCode: "RATE_LIMITED" };
    }
    if (!res.ok) {
      return { status: res.status >= 500 || hasResult ? "uncertain" : "failed", errorCode };
    }
    if (hasError) return { status: hasResult ? "uncertain" : "failed", errorCode };
    if (!data) return { status: "uncertain", errorCode: "INVALID_RESPONSE" };
    return { status: "received", data };
  }
  return { status: "failed", errorCode: "RATE_LIMITED" };
}

export async function sendLeadToBitrix(lead: BitrixLeadPayload): Promise<BitrixSendResult> {
  const fullTitle = lead.title || `Заявка с сайта: ${lead.name}`;
  const title = Array.from(fullTitle).slice(0, 255).join("");
  const fields: Record<string, unknown> = {
    TITLE: title,
    NAME: lead.name,
    PHONE: [{ VALUE: lead.phone, VALUE_TYPE: "WORK" }],
    SOURCE_DESCRIPTION: lead.source || "site",
    COMMENTS: title === fullTitle ? lead.comment || "" : `Полное название: ${fullTitle}\n\n${lead.comment || ""}`,
  };
  if (lead.email) {
    fields.EMAIL = [{ VALUE: lead.email, VALUE_TYPE: "WORK" }];
  }
  if (lead.originId) {
    fields.ORIGINATOR_ID = ORIGINATOR;
    fields.ORIGIN_ID = lead.originId;
  }

  const response = await requestBitrix("crm.lead.add", {
    fields,
    params: { REGISTER_SONET_EVENT: "Y" },
  });
  if (response.status !== "received") return response;
  const id = leadId(response.data.result);
  return id === null
    ? { status: "uncertain", errorCode: "INVALID_RESPONSE" }
    : { status: "sent", remoteId: id };
}

export async function findBitrixLead(originId: string): Promise<BitrixLookupResult> {
  const response = await requestBitrix("crm.lead.list", {
    filter: { "=ORIGINATOR_ID": ORIGINATOR, "=ORIGIN_ID": originId },
    select: ["ID"],
    order: { ID: "ASC" },
  });
  if (response.status !== "received") return response;
  const rows = response.data.result;
  if (!Array.isArray(rows)) return { status: "uncertain", errorCode: "INVALID_RESPONSE" };
  if (rows.length === 0) return { status: "not_found" };
  const id = isRecord(rows[0]) ? leadId(rows[0].ID) : null;
  return id === null
    ? { status: "uncertain", errorCode: "INVALID_RESPONSE" }
    : { status: "sent", remoteId: id };
}
