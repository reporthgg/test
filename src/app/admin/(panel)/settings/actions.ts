"use server";

import { revalidatePath } from "next/cache";
import {
  setSetting,
  type SettingKey,
} from "@/lib/settings";
import { sendLeadToBitrix } from "@/lib/bitrix";

const KEYS: SettingKey[] = [
  "bitrixWebhookUrl",
  "contactPhone",
  "contactWhatsapp",
  "notifyEmail",
  "contactEmail",
];

export async function saveSettings(formData: FormData): Promise<void> {
  for (const key of KEYS) {
    const value = String(formData.get(key) ?? "");
    await setSetting(key, value);
  }
  revalidatePath("/admin/settings");
}

export async function sendTestLead(): Promise<{ ok: boolean; reason?: string }> {
  const result = await sendLeadToBitrix({
    name: "Тест из админки",
    phone: "+70000000000",
    title: "Проверка вебхука Bitrix24",
    comment: "Тестовая заявка, можно удалить.",
    source: "admin-test",
  });

  return result.status === "sent"
    ? { ok: true }
    : { ok: false, reason: result.status === "not_configured" ? "no-webhook" : result.errorCode };
}
