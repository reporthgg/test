// Отправка заявки в Bitrix24 через входящий вебхук (crm.lead.add).
// Вебхук берётся из настроек в БД, затем из BITRIX_WEBHOOK_URL. Ошибки не роняют основной запрос.

import { getBitrixWebhookUrl } from "@/lib/settings";

type LeadPayload = {
  name: string;
  phone: string;
  email?: string | null;
  title?: string;
  comment?: string;
  source?: string | null;
};

export async function sendLeadToBitrix(lead: LeadPayload): Promise<boolean> {
  const url = await getBitrixWebhookUrl();
  if (!url) return false;

  const fields: Record<string, unknown> = {
    TITLE: lead.title || `Заявка с сайта: ${lead.name}`,
    NAME: lead.name,
    PHONE: [{ VALUE: lead.phone, VALUE_TYPE: "WORK" }],
    SOURCE_DESCRIPTION: lead.source || "site",
    COMMENTS: lead.comment || "",
  };
  if (lead.email) {
    fields.EMAIL = [{ VALUE: lead.email, VALUE_TYPE: "WORK" }];
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields, params: { REGISTER_SONET_EVENT: "Y" } }),
      // не ждём слишком долго
      signal: AbortSignal.timeout(8000),
    });
    return res.ok;
  } catch (e) {
    console.error("[bitrix] failed:", e);
    return false;
  }
}
