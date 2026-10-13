"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { cleanOverride, type PageOverride } from "@/lib/page-content";

const LOCALES = ["ru", "kz", "en"] as const;

async function requireAdmin(): Promise<void> {
  if (!await verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value)) throw new Error("Войдите в админку для сохранения.");
}

// slug → публичный путь на сайте
function publicPath(slug: string): string {
  return slug === "home" ? "/" : `/${slug}`;
}

export async function savePageContent(
  slug: string,
  perLocale: Record<string, PageOverride>
) {
  await requireAdmin();
  for (const locale of LOCALES) {
    const cleaned = cleanOverride(perLocale[locale] ?? {});
    const data = JSON.stringify(cleaned);
    await prisma.pageContent.upsert({
      where: { slug_locale: { slug, locale } },
      create: { slug, locale, data },
      update: { data },
    });
  }

  // Обновляем кэш админ-редактора и публичной страницы (все локали).
  revalidatePath(`/admin/pages/${slug}`);
  revalidatePath(publicPath(slug), "layout");

  return { ok: true as const };
}
