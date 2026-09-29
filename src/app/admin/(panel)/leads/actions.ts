"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { sendStoredLeadToBitrix } from "@/lib/bitrix-delivery";

export async function updateLeadStatus(id: string, status: string) {
  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/admin/leads");
}

export async function deleteLead(id: string) {
  await prisma.lead.delete({ where: { id } });
  revalidatePath("/admin/leads");
}

export async function retryLeadBitrix(id: string): Promise<{ ok: boolean; message: string }> {
  if (!await verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value)) {
    return { ok: false, message: "Войдите в админку для отправки." };
  }
  if (typeof id !== "string" || !id || id.length > 200) {
    return { ok: false, message: "Некорректный идентификатор заявки." };
  }
  try {
    const result = await sendStoredLeadToBitrix(id);
    if (result.status === "sent") return { ok: true, message: `Доставка подтверждена. Лид №${result.remoteId}.` };
    if (result.errorCode === "RETRY_LATER") {
      return { ok: false, message: "Подождите минуту после предыдущей попытки, затем проверьте доставку." };
    }
    if (result.status === "not_configured") {
      return { ok: false, message: "Настройте вебхук Bitrix в настройках сайта." };
    }
    if (result.status === "pending") {
      return { ok: false, message: "Отправка уже выполняется." };
    }
    if (result.status === "uncertain") {
      return { ok: false, message: "Bitrix пока не подтвердил доставку. Следующая попытка сначала проверит наличие лида." };
    }
    return { ok: false, message: `Bitrix не принял заявку. Код: ${result.errorCode ?? "UNKNOWN"}.` };
  } catch {
    return { ok: false, message: "Не удалось проверить отправку. Данные заявки сохранены." };
  } finally {
    revalidatePath("/admin/leads");
  }
}
