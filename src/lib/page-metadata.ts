import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getPageContent, type PageOverride } from "@/lib/page-content";
import { buildPageMetadata } from "@/lib/seo";
import { seoCopy, seoPaths, type SeoPage } from "@/lib/seo-content";

export async function pageMetadata(page: SeoPage, locale: Locale): Promise<Metadata> {
  const copy = seoCopy[page][locale];
  const overrides: PageOverride = page === "tests" ? {} : await getPageContent(page, locale);
  return buildPageMetadata({
    locale,
    path: seoPaths[page],
    title: overrides.metaTitle ?? copy.title,
    description: overrides.metaDescription ?? copy.description,
  });
}
