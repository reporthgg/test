import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { BitrixLeadPayload } from "@/lib/bitrix";
import { sendStoredLeadToBitrix, type BitrixDeliveryRecord } from "@/lib/bitrix-delivery";
import { formatGeneralLeadComment } from "@/lib/bitrix-comments";
import { isRecord } from "@/lib/test-content";

// Поля, которые кладём в отдельные колонки; остальное — в extra (JSON)
const KNOWN = new Set(["name", "phone", "email", "city", "source"]);
const MAX_BODY_BYTES = 1_000_000;

class LeadValidationError extends Error {
  constructor(
    message: string,
    readonly details: Record<string, string> = {},
    readonly code = "INVALID_LEAD",
    readonly status = 400,
  ) {
    super(message);
    this.name = "LeadValidationError";
  }
}

function errorResponse(
  status: number,
  code: string,
  message: string,
  details: Record<string, string> | null = null,
): NextResponse {
  return NextResponse.json(
    { ok: false, error: message, code, message, details },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

async function readPayload(request: Request): Promise<unknown> {
  if (!/^application\/json(?:\s*;|$)/iu.test(request.headers.get("content-type") ?? "")) {
    throw new LeadValidationError(
      "Ожидается application/json", {}, "UNSUPPORTED_MEDIA_TYPE", 415,
    );
  }
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
    throw new LeadValidationError("Запрос слишком большой", {}, "PAYLOAD_TOO_LARGE", 413);
  }
  const reader = request.body?.getReader();
  if (!reader) throw new LeadValidationError("Пустой запрос", {}, "INVALID_JSON");
  const decoder = new TextDecoder();
  let length = 0;
  let text = "";
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      length += chunk.value.byteLength;
      if (length > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new LeadValidationError("Запрос слишком большой", {}, "PAYLOAD_TOO_LARGE", 413);
      }
      text += decoder.decode(chunk.value, { stream: true });
    }
    text += decoder.decode();
  } finally {
    reader.releaseLock();
  }
  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new LeadValidationError("Некорректный JSON", {}, "INVALID_JSON");
  }
}

function textField(
  value: unknown,
  field: string,
  maxLength: number,
  required = false,
): string {
  if (value == null && !required) return "";
  if (typeof value !== "string" || value.length > maxLength ||
    /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(value)) {
    throw new LeadValidationError("Некорректное поле формы", {
      [field]: `Ожидается текст не длиннее ${maxLength} символов`,
    });
  }
  const text = value.trim();
  if (required && !text) {
    throw new LeadValidationError("Имя и телефон обязательны", {
      [field]: "Заполните обязательное поле",
    });
  }
  return text;
}

function validateExtraValue(value: unknown, field: string, depth = 0): void {
  if (typeof value === "string" && /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(value)) {
    throw new LeadValidationError("Некорректное поле формы", {
      [field]: "Недопустимые символы в значении",
    });
  }
  if (depth > 20 || (typeof value === "string" && value.length > 100_000) ||
    (typeof value === "number" && !Number.isFinite(value))) {
    throw new LeadValidationError("Некорректное поле формы", {
      [field]: "Превышена допустимая длина или сложность значения",
    });
  }
  if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) {
      validateExtraValue(item, `${field}.${index}`, depth + 1);
    }
  } else if (isRecord(value)) {
    for (const [key, item] of Object.entries(value)) {
      if (key === "_bitrix" || key.length > 200) {
        throw new LeadValidationError("Недопустимое поле формы", {
          [field ? `${field}.${key}` : key]: "Поле не принимается от клиента",
        });
      }
      validateExtraValue(item, field ? `${field}.${key}` : key, depth + 1);
    }
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const raw = await readPayload(request);
    if (!isRecord(raw)) throw new LeadValidationError("Ожидается JSON-объект");
    validateExtraValue(raw, "");
    const name = textField(raw.name, "name", 200, true);
    const phone = textField(raw.phone, "phone", 60, true);
    const email = textField(raw.email, "email", 200) || null;
    const city = textField(raw.city, "city", 120) || null;
    const source = textField(raw.source, "source", 120) || "site";
    const digits = phone.replace(/\D/gu, "");
    if (!/^\+?[\d\s().-]+$/u.test(phone) || digits.length < 5 || digits.length > 20) {
      throw new LeadValidationError("Некорректный телефон", { phone: "Проверьте номер телефона" });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email)) {
      throw new LeadValidationError("Некорректный email", { email: "Проверьте адрес email" });
    }
    if (Object.hasOwn(raw, "consent") && raw.consent !== true) {
      throw new LeadValidationError("Подтвердите согласие на обработку персональных данных", {
        consent: "Согласие должно быть передано как true",
      });
    }
    const body = { ...raw, name, phone, email, city, source };

    // «интерес» — первое осмысленное поле формы (курс/страна/экзамен/направление)
    const interestValue = [raw.course, raw.country, raw.exam, raw.camp, raw.program]
      .find((value) => value !== "" && value != null);
    const interest = interestValue == null ? null : typeof interestValue === "string"
      ? interestValue : JSON.stringify(interestValue);

    // всё, что не попало в отдельные колонки, — в extra
    const extra = Object.fromEntries(
      Object.entries(body).filter(([key, value]) => !KNOWN.has(key) && value !== "" && value != null),
    );
    const leadId = randomUUID();
    const payload: BitrixLeadPayload = {
      name,
      phone,
      email,
      source,
      title: `Заявка с сайта: ${name}`,
      comment: formatGeneralLeadComment(body),
      originId: leadId,
    };
    const deliveryRecord: BitrixDeliveryRecord = {
      version: 1,
      status: "pending",
      attempts: 0,
      payload,
    };

    await prisma.lead.create({
      data: {
        id: leadId,
        name,
        phone,
        email,
        city,
        source,
        interest,
        extra: JSON.stringify({ ...extra, _bitrix: deliveryRecord }),
      },
    });

    // отправляем в Bitrix24 (если настроен вебхук)
    let crmDelivered = false;
    try {
      const delivery = await sendStoredLeadToBitrix(leadId);
      crmDelivered = delivery.status === "sent";
    } catch {
      console.error("[lead] CRM delivery failed", leadId);
    }

    return NextResponse.json({ ok: true, crmDelivered }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (e) {
    if (e instanceof LeadValidationError) {
      return errorResponse(e.status, e.code, e.message, e.details);
    }
    console.error("[lead] storage failed");
    return errorResponse(500, "LEAD_SAVE_FAILED", "Не удалось сохранить заявку");
  }
}
