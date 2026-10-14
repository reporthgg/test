import type { Locale } from "@/i18n/config";
import { getAbroadDict } from "@/i18n/pages/abroad";
import { abroadFaqContent } from "@/components/abroad/abroad-sections-content";
import { campsFaqContent } from "@/components/camps/tour-faq-content";
import { examsFaqContent } from "@/components/exams/exams-sections-content";
import { contactsContent } from "@/components/landing/contacts-content";
import { getSchoolContactsContent } from "@/components/school/school-contacts-content";
import { site } from "@/lib/site";
import { absoluteUrl, htmlLang, localizedUrl, ogImage, siteUrl } from "@/lib/seo";
import { breadcrumbLabels, seoCopy, seoPaths, type SeoPage } from "@/lib/seo-content";

export type JsonLdNode = { "@type": string | string[]; [key: string]: unknown };
export type JsonLdDocument = { "@context": "https://schema.org"; "@graph": JsonLdNode[] };
export type FaqEntry = { question: string; answer: string };
export type FaqPage = "home" | "school" | "camps" | "abroad" | "exams";

export function jsonLdDocument(nodes: JsonLdNode[]): JsonLdDocument {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</gu, "\\u003c");
}

export function organizationId(base: string = siteUrl()): string {
  return `${base}/#organization`;
}

export function websiteId(base: string = siteUrl()): string {
  return `${base}/#website`;
}

function officeKey(office: (typeof site.offices)[number]): string {
  return office.mapPreview.split("/").pop()?.replace(/\.png$/u, "") ?? office.address;
}

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export function openingHours(text: string = site.workingHours): JsonLdNode[] {
  const ranges = Array.from(text.matchAll(/(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})/gu));
  if (ranges.length !== 2) return [];
  const time = (hours: string, minutes: string) => `${hours.padStart(2, "0")}:${minutes}`;
  return ranges.map((range, index) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: index === 0 ? weekdays : ["Saturday"],
    opens: time(range[1], range[2]),
    closes: time(range[3], range[4]),
  }));
}

export function organizationNodes(locale: Locale, base: string = siteUrl()): JsonLdNode[] {
  const t = contactsContent[locale];
  const home = localizedUrl(locale, "/", base);
  const logo = { "@type": "ImageObject", url: absoluteUrl("/landing/hero/logo.png", base), width: 456, height: 184 };
  const image = absoluteUrl(ogImage.url, base);
  const hours = openingHours();
  const offices: JsonLdNode[] = site.offices.map((office) => ({
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `${base}/#office-${officeKey(office)}`,
    name: `${site.name}, ${t.cities[office.city]}, ${t.addresses[office.address]}`,
    url: `${home}#offices`,
    image,
    logo,
    telephone: site.phone.tel,
    email: site.email,
    parentOrganization: { "@id": organizationId(base) },
    address: {
      "@type": "PostalAddress",
      streetAddress: t.addresses[office.address],
      addressLocality: t.cities[office.city],
      addressCountry: "KZ",
    },
    geo: { "@type": "GeoCoordinates", latitude: office.lat, longitude: office.lon },
    hasMap: office.gis,
    ...(hours.length ? { openingHoursSpecification: hours } : {}),
  }));

  return [
    {
      "@type": "EducationalOrganization",
      "@id": organizationId(base),
      name: site.name,
      url: home,
      logo,
      image,
      description: `${seoCopy.home[locale].description} ${site.admissions[locale]}.`,
      foundingDate: String(site.foundedYear),
      email: site.email,
      telephone: site.phone.tel,
      sameAs: [site.instagram],
      areaServed: { "@type": "Country", name: "Kazakhstan" },
      contactPoint: [
        { "@type": "ContactPoint", telephone: site.phone.tel, contactType: "customer service", areaServed: "KZ" },
        { "@type": "ContactPoint", telephone: `+${site.whatsapp.number}`, contactType: "customer support", areaServed: "KZ", url: site.whatsapp.link },
      ],
      department: offices.map((office) => ({ "@id": office["@id"] })),
    },
    ...offices,
  ];
}

export function websiteNode(locale: Locale, base: string = siteUrl()): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": websiteId(base),
    url: localizedUrl(locale, "/", base),
    name: site.name,
    inLanguage: htmlLang(locale),
    publisher: { "@id": organizationId(base) },
  };
}

export function breadcrumbNode(locale: Locale, trail: readonly { name: string; path: string }[], base: string = siteUrl()): JsonLdNode {
  const items = [{ name: breadcrumbLabels.home[locale], path: "/" }, ...trail];
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: localizedUrl(locale, item.path, base),
    })),
  };
}

export function pageBreadcrumb(page: Exclude<SeoPage, "home">, locale: Locale, base: string = siteUrl()): JsonLdNode {
  return breadcrumbNode(locale, [{ name: breadcrumbLabels[page][locale], path: seoPaths[page] }], base);
}

export function faqEntries(page: FaqPage, locale: Locale): FaqEntry[] {
  switch (page) {
    case "home":
      return contactsContent[locale].faq.map(({ question, answer }) => ({ question, answer }));
    case "school":
      return getSchoolContactsContent(locale).faq.map(({ question, answer }) => ({ question, answer }));
    case "camps":
      return campsFaqContent[locale].items.map(({ question, answer }) => ({ question, answer }));
    case "exams":
      return examsFaqContent[locale].items.map(({ question, answer }) => ({ question, answer }));
    case "abroad": {
      const answers = getAbroadDict(locale).faq.items;
      return abroadFaqContent[locale].items.map(({ question, answer }) => ({
        question,
        answer: typeof answer === "number" ? answers[answer].a : answer,
      }));
    }
  }
}

export function faqNode(page: FaqPage, locale: Locale, base: string = siteUrl()): JsonLdNode {
  return {
    "@type": "FAQPage",
    url: localizedUrl(locale, seoPaths[page], base),
    inLanguage: htmlLang(locale),
    mainEntity: faqEntries(page, locale).map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function pageJsonLd(page: SeoPage, locale: Locale, base: string = siteUrl()): JsonLdDocument {
  const nodes: JsonLdNode[] = [];
  if (page === "home") nodes.push(websiteNode(locale, base), ...organizationNodes(locale, base));
  else nodes.push(pageBreadcrumb(page, locale, base));
  if (page === "about") nodes.push(...organizationNodes(locale, base));
  if (page === "home" || page === "school" || page === "camps" || page === "abroad" || page === "exams") {
    nodes.push(faqNode(page, locale, base));
  }
  return jsonLdDocument(nodes);
}

export function testJsonLd(locale: Locale, test: { slug: string; title: string }, base: string = siteUrl()): JsonLdDocument {
  return jsonLdDocument([
    breadcrumbNode(locale, [
      { name: breadcrumbLabels.tests[locale], path: seoPaths.tests },
      { name: test.title, path: `/test/${test.slug}` },
    ], base),
  ]);
}
