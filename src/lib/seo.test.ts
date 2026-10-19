import assert from "node:assert/strict";
import { test } from "node:test";
import { locales } from "@/i18n/config";
import { contactsContent } from "@/components/landing/contacts-content";
import {
  buildPageMetadata,
  buildRobots,
  buildSitemap,
  languageAlternates,
  siteUrl,
} from "./seo";
import { breadcrumbLabels, notFoundCopy, seoCopy, seoUpdatedAt, testSeoCopy, thankYouSeoCopy } from "./seo-content";
import { faqEntries, openingHours, pageJsonLd, serializeJsonLd, testJsonLd, type FaqPage } from "./structured-data";
import { site } from "./site";

const base = "https://example.kz";

test("site URL is the production .com domain", () => {
  assert.equal(siteUrl(), "https://gscstudy.com");
});

test("hreflang alternates cover every locale and x-default", () => {
  assert.deepEqual(languageAlternates("/", base), {
    ru: `${base}/`,
    kk: `${base}/kz`,
    en: `${base}/en`,
    "x-default": `${base}/`,
  });
  assert.deepEqual(languageAlternates("/school", base), {
    ru: `${base}/school`,
    kk: `${base}/kz/school`,
    en: `${base}/en/school`,
    "x-default": `${base}/school`,
  });
});

test("each locale gets a self-referencing canonical and Open Graph locale", () => {
  const expected = { ru: [`${base}/exams`, "ru_RU"], kz: [`${base}/kz/exams`, "kk_KZ"], en: [`${base}/en/exams`, "en_US"] };
  for (const locale of locales) {
    const metadata = buildPageMetadata({ locale, path: "/exams", title: "T", description: "D", base });
    assert.equal(metadata.alternates?.canonical, expected[locale][0]);
    const openGraph = metadata.openGraph as { url?: string; locale?: string; alternateLocale?: string[] };
    assert.equal(openGraph.url, expected[locale][0]);
    assert.equal(openGraph.locale, expected[locale][1]);
    assert.equal(openGraph.alternateLocale?.length, 2);
  }
  const hidden = buildPageMetadata({ locale: "ru", path: "/x", title: "T", description: "D", index: false, base });
  assert.deepEqual(hidden.robots, { index: false, follow: false });
});

test("robots hides private sections in every locale and points to the sitemap", () => {
  const robots = buildRobots(base);
  const rules = Array.isArray(robots.rules) ? robots.rules : [robots.rules];
  for (const rule of rules) {
    for (const path of ["/admin", "/kz/admin", "/en/admin", "/api/", "/thankyou", "/kz/thankyou", "/en/thankyou"]) {
      assert.ok(([] as string[]).concat(rule.disallow ?? []).includes(path), `${rule.userAgent}: ${path}`);
    }
    assert.equal(rule.allow, "/");
  }
  assert.equal(robots.sitemap, `${base}/sitemap.xml`);
  assert.equal(robots.host, base);
  const yandex = rules.find((rule) => rule.userAgent === "Yandex");
  assert.match(String(yandex?.other?.["Clean-param"]), /^utm_source&.*yclid$/u);
});

test("sitemap lists every locale with hreflang alternates and only real dates", () => {
  const date = new Date("2026-09-01T00:00:00Z");
  const sitemap = buildSitemap([
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/camps", priority: 0.8, changeFrequency: "weekly", lastModified: { kz: date } },
  ], base);
  assert.deepEqual(sitemap.map((entry) => entry.url), [
    `${base}/`, `${base}/kz`, `${base}/en`,
    `${base}/camps`, `${base}/kz/camps`, `${base}/en/camps`,
  ]);
  assert.equal(sitemap[0].lastModified, undefined);
  assert.equal(sitemap[4].lastModified, date);
  assert.equal(sitemap[3].alternates?.languages?.["x-default"], `${base}/camps`);
  assert.ok(sitemap.every((entry) => !/admin|api|thankyou/u.test(entry.url)));
});

test("every page has a real content date for sitemap lastmod", () => {
  assert.deepEqual(Object.keys(seoUpdatedAt).sort(), Object.keys(seoCopy).sort());
  for (const [page, date] of Object.entries(seoUpdatedAt)) {
    assert.match(date, /^\d{4}-\d{2}-\d{2}$/u, page);
    assert.ok(!Number.isNaN(new Date(date).getTime()), page);
  }
});

test("titles and descriptions are localized, unique, sized for snippets and free of long dashes", () => {
  const titles = new Set<string>();
  for (const page of Object.values(seoCopy)) {
    for (const locale of locales) {
      const { title, description } = page[locale];
      assert.ok(title.length <= 65, `${title} (${title.length})`);
      assert.ok(description.length >= 110 && description.length <= 175, `${description} (${description.length})`);
      assert.ok(!titles.has(title), `duplicate title ${title}`);
      titles.add(title);
    }
  }
  const strings = JSON.stringify([seoCopy, breadcrumbLabels, notFoundCopy, thankYouSeoCopy])
    + locales.map((locale) => testSeoCopy[locale].title("X") + testSeoCopy[locale].description("X", "1", "2")).join("");
  assert.doesNotMatch(strings, new RegExp(`[${String.fromCharCode(0x2013)}${String.fromCharCode(0x2014)}]`, "u"));
});

test("FAQ structured data mirrors the questions rendered on each page", () => {
  const pages: FaqPage[] = ["home", "school", "camps", "abroad", "exams"];
  for (const locale of locales) {
    assert.deepEqual(faqEntries("home", locale), contactsContent[locale].faq.map(({ question, answer }) => ({ question, answer })));
    for (const page of pages) {
      const entries = faqEntries(page, locale);
      assert.ok(entries.length >= 5, `${page}/${locale}`);
      for (const entry of entries) {
        assert.ok(entry.question.trim() && entry.answer.trim(), `${page}/${locale}: ${entry.question}`);
      }
    }
  }
});

test("page JSON-LD has the expected types and parses back", () => {
  const types = (page: Parameters<typeof pageJsonLd>[0]) => pageJsonLd(page, "en", base)["@graph"].map((node) => [].concat(node["@type"] as never).join("+"));
  assert.deepEqual(types("home"), [
    "WebSite",
    "EducationalOrganization",
    "EducationalOrganization+LocalBusiness",
    "EducationalOrganization+LocalBusiness",
    "EducationalOrganization+LocalBusiness",
    "FAQPage",
  ]);
  assert.deepEqual(types("school"), ["BreadcrumbList", "FAQPage"]);
  assert.deepEqual(types("tests"), ["BreadcrumbList"]);
  assert.deepEqual(types("about").slice(0, 2), ["BreadcrumbList", "EducationalOrganization"]);

  const office = pageJsonLd("home", "en", base)["@graph"][2] as unknown as { address: { streetAddress: string; addressLocality: string }; geo: object };
  assert.equal(office.address.streetAddress, "15 Syganak St");
  assert.equal(office.address.addressLocality, "Astana");
  assert.ok(office.geo);

  const breadcrumb = testJsonLd("kz", { slug: "ielts", title: "IELTS</script>" }, base);
  const serialized = serializeJsonLd(breadcrumb);
  assert.doesNotMatch(serialized, /<\/script>/u);
  const parsed = JSON.parse(serialized) as { "@graph": { itemListElement: { item: string }[] }[] };
  assert.deepEqual(parsed["@graph"][0].itemListElement.map((item) => item.item), [`${base}/kz`, `${base}/kz/tests`, `${base}/kz/test/ielts`]);
});

test("Organization carries legal data, credentials, profiles and the admissions figures", () => {
  for (const locale of locales) {
    const [organization, ...offices] = pageJsonLd("about", locale, base)["@graph"].slice(1) as Record<string, unknown>[];
    assert.equal(organization.legalName, "ТОО «GSCSTUDY CORPORATION»");
    assert.equal(organization.taxID, "221240037945");
    assert.deepEqual(organization.alternateName, ["GSC", "GSCSTUDY"]);
    assert.equal((organization.hasCredential as unknown[]).length, 3);
    const sameAs = organization.sameAs as string[];
    for (const office of site.offices) assert.ok(sameAs.includes(office.gis), office.address);
    assert.ok(sameAs.includes(site.hh) && sameAs.includes(site.instagram));
    assert.ok(sameAs.some((url) => url.includes("quality-english.com/associate-school/gsc-study")));
    assert.match(String(organization.description), /600\+/u);
    assert.doesNotMatch(String(organization.description), /643|246/u);
    assert.deepEqual(offices.slice(0, 3).map((office) => office.sameAs), site.offices.map((office) => [office.gis]));
  }
});

test("opening hours are parsed from the site schedule", () => {
  assert.deepEqual(openingHours("Пн-Пт 9:00-18:00 · Сб 10:00-15:00").map((item) => [item.opens, item.closes]), [["09:00", "18:00"], ["10:00", "15:00"]]);
  assert.deepEqual(openingHours("по записи"), []);
  assert.deepEqual(openingHours(site.workingHours).map((item) => [item.opens, item.closes]), [["10:00", "19:00"], ["10:00", "14:00"]]);
});
