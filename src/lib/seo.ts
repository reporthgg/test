import type { Metadata, MetadataRoute } from "next";
import { defaultLocale, locales, withLocale, type Locale } from "@/i18n/config";
import { site } from "@/lib/site";

export const SITE_URL = "https://gscstudy.com";

export const htmlLangs: Record<Locale, string> = { ru: "ru", kz: "kk", en: "en" };
export const ogLocales: Record<Locale, string> = { ru: "ru_RU", kz: "kk_KZ", en: "en_US" };

export const ogImage = { url: "/opengraph-image.png", width: 1200, height: 630, type: "image/png" } as const;

export function htmlLang(locale: Locale): string {
  return htmlLangs[locale];
}

export function siteUrl(): string {
  return SITE_URL;
}

export function absoluteUrl(path: string, base: string = siteUrl()): string {
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function localizedUrl(locale: Locale, path: string, base: string = siteUrl()): string {
  return absoluteUrl(withLocale(locale, path), base);
}

export function languageAlternates(path: string, base: string = siteUrl()): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) languages[htmlLangs[locale]] = localizedUrl(locale, path, base);
  languages["x-default"] = localizedUrl(defaultLocale, path, base);
  return languages;
}

export const indexableRobots: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
};

export const hiddenRobots: NonNullable<Metadata["robots"]> = { index: false, follow: false };

export type PageMetadataInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  index?: boolean;
  base?: string;
};

export function buildPageMetadata({ locale, path, title, description, index = true, base = siteUrl() }: PageMetadataInput): Metadata {
  const url = localizedUrl(locale, path, base);
  const image = { ...ogImage, alt: site.name };
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path, base) },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url,
      locale: ogLocales[locale],
      alternateLocale: locales.filter((item) => item !== locale).map((item) => ogLocales[item]),
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    robots: index ? indexableRobots : hiddenRobots,
  };
}

export type SitemapPage = {
  path: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  lastModified?: Partial<Record<Locale, Date>>;
};

export function buildSitemap(pages: readonly SitemapPage[], base: string = siteUrl()): MetadataRoute.Sitemap {
  return pages.flatMap((page) => locales.map((locale) => {
    const lastModified = page.lastModified?.[locale];
    return {
      url: localizedUrl(locale, page.path, base),
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages: languageAlternates(page.path, base) },
    };
  }));
}

export const privatePaths = ["/admin", "/api/", "/thankyou"] as const;

export const trackingParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid", "yclid"] as const;

export function buildRobots(base: string = siteUrl()): MetadataRoute.Robots {
  const disallow = privatePaths.flatMap((path) => [path, ...locales.filter((locale) => locale !== defaultLocale).map((locale) => `/${locale}${path}`)]);
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: "Yandex", allow: "/", disallow, other: { "Clean-param": trackingParams.join("&") } },
    ],
    sitemap: absoluteUrl("/sitemap.xml", base),
    host: base,
  };
}
