import assert from "node:assert/strict";
import { test } from "node:test";
import { legacyRedirect } from "./legacy-redirects";

test("current pages and technical paths are never redirected", () => {
  for (const path of [
    "/", "/school", "/exams/", "/abroad", "/camps", "/about", "/tests", "/thankyou", "/privacy", "/consent",
    "/kz", "/en/school", "/kz/test/ielts", "/test/tilda-ielts", "/admin/leads", "/api/leads",
    "/_next/static/chunk", "/.well-known/assetlinks.json", "/uploads/photo.jpg", "/fonts/futura.woff2",
  ]) {
    assert.equal(legacyRedirect(path), null, path);
  }
});

test("old gscstudy.kz addresses lead to the closest current section", () => {
  const cases: Record<string, string> = {
    "/admission-ielts": "/exams",
    "/admission-sat": "/exams",
    "/en/admission-sat": "/en/exams",
    "/news/registriruyites-na-ielts-v-shkolakh-gsc-study": "/exams",
    "/camps/letnie-kanikuly-v-londone": "/camps",
    "/course/novinka-letnie-kanikuly-s-izucheniem-intensivnogo-angliyiskogo-yazyka-v-dubae": "/camps",
    "/kz/camps/summer-london": "/kz/camps",
    "/language-program/speaking-club": "/school",
    "/angliyskiy-dlya-detey-interesno-i-polezno-v-gsc-astana": "/school",
    "/ru/language-school": "/school",
    "/course/london": "/school",
    "/en/universities/arizona-state-university": "/en/abroad",
    "/public/universities/university-of-tulsa": "/abroad",
    "/public/visa-stud/studencheskaya-viza-vo-franciu": "/abroad",
    "/kz/schools/boarding": "/kz/abroad",
    "/country/canada": "/abroad",
    "/glion-london-campus": "/abroad",
    "/foundationcampus-uk": "/abroad",
    "/admission-motivacionnoe-pismo": "/abroad",
    "/obuchenie-v-kitae": "/abroad",
    "/reviews": "/#reviews",
    "/%D0%BE%D1%82%D0%B7%D1%8B%D0%B2%D1%8B/": "/#reviews",
    "/kz/reviews": "/kz#reviews",
    "/centers/view/2": "/#offices",
    "/nashi-ofisy-po-kazahstanu": "/#offices",
    "/en/centers/view/1": "/en#offices",
    "/ru/privacy-policy": "/privacy",
    "/o-kompanii": "/about",
    "/%D0%BE-gsc/": "/about",
    "/contacts": "/about",
    "/kz/franchise": "/kz/about",
    "/public/ru/about": "/about",
    "/public/kz/about": "/kz/about",
    "/ru": "/",
    "/ru/school": "/school",
  };
  for (const [from, to] of Object.entries(cases)) {
    assert.equal(legacyRedirect(from), to, from);
  }
});

test("unrelated old pages stay 404 instead of going to the home page", () => {
  for (const path of ["/news/kak-sozdat-uspeshnyyi-stratap", "/category/novosti/page/2", "/0, 0, 0", "/login", "/feed/", "/gallery", "/%E0%A4%A"]) {
    assert.equal(legacyRedirect(path), null, path);
  }
});
