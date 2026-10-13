import assert from "node:assert/strict";
import { test } from "node:test";
import { formatGeneralLeadComment } from "./bitrix-comments";
import { CONSENT_VERSION, consentRecord } from "./legal";
import { parsePage, parseUtm } from "./lead-tracking";

test("UTM parsing keeps only known, short, printable values", () => {
  assert.deepEqual(parseUtm({ utm_source: " instagram ", utm_medium: "", utm_campaign: "x".repeat(201), utm_term: "a\u0007b", gclid: "1" }), { utm_source: "instagram" });
  assert.equal(parseUtm({ utm_medium: " " }), undefined);
  assert.equal(parseUtm(["utm_source"]), undefined);
  assert.equal(parseUtm("utm_source=ig"), undefined);
});

test("page must be a site path", () => {
  assert.equal(parsePage("/kz/school"), "/kz/school");
  assert.equal(parsePage("https://evil.example/"), undefined);
  assert.equal(parsePage(`/${"a".repeat(400)}`), undefined);
  assert.equal(parsePage(42), undefined);
});

test("consent record names the document version and Astana time", () => {
  assert.deepEqual(consentRecord(new Date("2026-10-13T09:05:00Z")), {
    consentVersion: CONSENT_VERSION,
    consentAt: "2026-10-13 14:05 (UTC+5)",
  });
  assert.match(CONSENT_VERSION, /^consent v1, 2026-10-13$/u);
});

test("lead comment lists page, UTM and the consent record in plain text", () => {
  const comment = formatGeneralLeadComment({
    name: "Тест",
    consent: true,
    page: "/school",
    locale: "kz",
    utm: { utm_source: "ig", utm_campaign: "autumn" },
    ...consentRecord(new Date("2026-10-13T09:05:00Z")),
    _bitrix: { secret: true },
  });
  assert.equal(comment, [
    "Имя: Тест",
    "Согласие на обработку персональных данных: Да",
    "Страница: /school",
    "Язык версии: kz",
    "UTM-метки: utm_source=ig, utm_campaign=autumn",
    `Версия согласия: ${CONSENT_VERSION}`,
    "Время согласия: 2026-10-13 14:05 (UTC+5)",
  ].join("\n"));
});
