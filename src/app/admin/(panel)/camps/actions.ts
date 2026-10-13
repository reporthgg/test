"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

async function requireAdmin(): Promise<void> {
  if (!await verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value)) throw new Error("Войдите в админку для сохранения.");
}

function num(v: FormDataEntryValue | null): number | null {
  const s = String(v ?? "").trim();
  if (!s) return null;
  const n = parseInt(s, 10);
  return Number.isFinite(n) ? n : null;
}

export async function createCamp() {
  await requireAdmin();
  const count = await prisma.camp.count();
  const camp = await prisma.camp.create({
    data: { city: "Новый лагерь", country: "", order: count, published: false },
  });
  revalidatePath("/admin/camps");
  return camp.id;
}

export async function saveCamp(id: string, formData: FormData) {
  await requireAdmin();
  await prisma.camp.update({
    where: { id },
    data: {
      city: String(formData.get("city") ?? "").slice(0, 120),
      country: String(formData.get("country") ?? "").slice(0, 120),
      dates: String(formData.get("dates") ?? "") || null,
      ageRange: String(formData.get("ageRange") ?? "") || null,
      housing: String(formData.get("housing") ?? "") || null,
      seats: num(formData.get("seats")),
      price: String(formData.get("price") ?? "") || null,
      summary: String(formData.get("summary") ?? "") || null,
      image: String(formData.get("image") ?? "") || null,
      order: num(formData.get("order")) ?? 0,
      published: formData.get("published") === "on",
    },
  });
  revalidatePath("/admin/camps");
  revalidatePath("/camps");
}

export async function deleteCamp(id: string) {
  await requireAdmin();
  await prisma.camp.delete({ where: { id } });
  revalidatePath("/admin/camps");
  revalidatePath("/camps");
}
