import type { MetadataRoute } from "next";
import { locales, type Locale } from "@/i18n/config";
import { prisma } from "@/lib/prisma";
import { buildSitemap, type SitemapPage } from "@/lib/seo";
import { seoPaths, type SeoPage } from "@/lib/seo-content";

export const dynamic = "force-dynamic";

type Dates = Partial<Record<Locale, Date>>;

const pages: readonly { page: SeoPage; priority: number; changeFrequency: SitemapPage["changeFrequency"] }[] = [
  { page: "home", priority: 1, changeFrequency: "weekly" },
  { page: "school", priority: 0.9, changeFrequency: "monthly" },
  { page: "exams", priority: 0.9, changeFrequency: "monthly" },
  { page: "abroad", priority: 0.9, changeFrequency: "monthly" },
  { page: "camps", priority: 0.8, changeFrequency: "weekly" },
  { page: "tests", priority: 0.7, changeFrequency: "weekly" },
  { page: "about", priority: 0.6, changeFrequency: "monthly" },
];

function latest(...dates: (Date | undefined)[]): Date | undefined {
  const valid = dates.filter((date): date is Date => date instanceof Date && !Number.isNaN(date.getTime()));
  return valid.length ? new Date(Math.max(...valid.map((date) => date.getTime()))) : undefined;
}

function sameForAll(date: Date | undefined): Dates {
  return date ? Object.fromEntries(locales.map((locale) => [locale, date])) : {};
}

async function loadDynamicData(): Promise<{
  content: Map<string, Dates>;
  camps?: Date;
  tests: { slug: string; updatedAt: Date }[];
}> {
  try {
    const [contentRows, camp, tests] = await Promise.all([
      prisma.pageContent.findMany({ select: { slug: true, locale: true, updatedAt: true } }),
      prisma.camp.findFirst({ where: { published: true }, orderBy: { updatedAt: "desc" }, select: { updatedAt: true } }),
      prisma.test.findMany({
        where: { published: true, questions: { some: {} } },
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
        select: { slug: true, updatedAt: true },
      }),
    ]);
    const content = new Map<string, Dates>();
    for (const row of contentRows) {
      const dates = content.get(row.slug) ?? {};
      if ((locales as readonly string[]).includes(row.locale)) dates[row.locale as Locale] = row.updatedAt;
      content.set(row.slug, dates);
    }
    return { content, camps: camp?.updatedAt, tests };
  } catch {
    return { content: new Map(), tests: [] };
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { content, camps, tests } = await loadDynamicData();
  const testsUpdated = latest(...tests.map((test) => test.updatedAt));

  const entries: SitemapPage[] = pages.map(({ page, priority, changeFrequency }) => {
    const cms = content.get(page) ?? {};
    const extra = page === "camps" ? camps : page === "tests" ? testsUpdated : undefined;
    const lastModified: Dates = {};
    for (const locale of locales) {
      const date = latest(cms[locale], extra);
      if (date) lastModified[locale] = date;
    }
    return { path: seoPaths[page], priority, changeFrequency, lastModified };
  });

  for (const test of tests) {
    entries.push({
      path: `/test/${encodeURIComponent(test.slug)}`,
      priority: 0.6,
      changeFrequency: "monthly",
      lastModified: sameForAll(test.updatedAt),
    });
  }

  return buildSitemap(entries);
}
