import assert from "node:assert/strict";
import { stat, readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import { getSchoolDict } from "@/i18n/pages/school";
import { locales } from "@/i18n/config";
import { schoolProgramArtwork, schoolProgramsContent } from "./school-programs-content";
import { schoolTeachers, schoolTeachersContent } from "./school-teachers-content";

test("programme pricing is consultation-only in every locale", () => {
  assert.equal(schoolProgramsContent.ru.price, "Стоимость уточняется на консультации");
  assert.equal(schoolProgramsContent.kz.price, "Бағасы кеңес кезінде нақтыланады");
  assert.equal(schoolProgramsContent.en.price, "Pricing is confirmed during the consultation");
  for (const locale of locales) {
    assert.doesNotMatch(schoolProgramsContent[locale].price, /[\d₸]/u);
  }
});

test("teachers: Ayaulym unchanged, the Syganak office team follows her", () => {
  assert.deepEqual(
    schoolTeachers.map(({ id, profile }) => ({
      id,
      name: profile.name.ru,
      subjects: profile.subjects.ru,
      office: profile.office ?? null,
      image: profile.image.src,
    })),
    [
      { id: "ayaulym", name: "Аяулым", subjects: "General English, Academic English", office: null, image: "/school/teacher-ayaulym.png" },
      { id: "yulia", name: "Юлия", subjects: "General English", office: "syganak", image: "/school/teacher-yulia.jpg" },
      { id: "dana", name: "Дана", subjects: "General English", office: "syganak", image: "/school/teacher-dana.jpg" },
      { id: "diana", name: "Диана", subjects: "General English, IELTS", office: "syganak", image: "/school/teacher-diana.jpg" },
      { id: "alina", name: "Алина", subjects: "General English", office: "syganak", image: "/school/teacher-alina.jpg" },
      { id: "kamila", name: "Камила", subjects: "General English, IELTS", office: "syganak", image: "/school/teacher-kamila.jpg" },
    ],
  );
  assert.deepEqual(schoolTeachers.map(({ tone }) => tone), ["pink", "green", "blue", "pink", "green", "blue"]);
  assert.equal(schoolTeachers[0].profile.experience, 9);
  assert.equal(schoolTeachers[0].profile.qualification, "CELTA");
  assert.equal(schoolTeachers[0].profile.image.cover, undefined);
  for (const locale of locales) {
    assert.doesNotMatch(schoolTeachersContent[locale].description, /видео|video|бейне/iu);
    assert.match(schoolTeachersContent[locale].offices.syganak, /Greenline/u);
  }
});

test("all existing programmes remain present in every locale", () => {
  for (const locale of locales) {
    const existing = getSchoolDict(locale);
    assert.equal(schoolProgramArtwork.length, existing.courses.length);
    assert.equal(schoolProgramsContent[locale].descriptions.length, existing.courses.length);
    const indices = new Set(schoolProgramArtwork.map((art) => art.courseIndex));
    assert.equal(indices.size, existing.courses.length);
    for (const art of schoolProgramArtwork) {
      const course = existing.courses[art.courseIndex];
      assert.ok(course.title);
      assert.ok(course.rows[art.badgeRow][1]);
      assert.ok(existing.filters.some((filter) => filter.key === course.cat));
    }
  }
  assert.deepEqual(
    schoolProgramArtwork.map((art) => getSchoolDict("ru").courses[art.courseIndex].title),
    ["General English", "Academic English", "Business English", "Speaking Club",
      "English for Teens", "English for Kids", "Китайский язык", "Интенсив"],
  );
});

test("all active section assets exist and are non-empty", async () => {
  const files = [
    ...schoolProgramArtwork.flatMap((art) => [
      `program-${art.id}.${art.extension}`, `program-${art.id}-mobile.png`,
    ]),
    ...schoolTeachers.map(({ profile }) => path.basename(profile.image.src)),
    "teacher-badge.svg", "test-arrow-white.svg", "test-arrow-blue.svg", "test-note.svg",
    "teaching-students.jpg", "teaching-retouch.png", "teaching-teacher.png", "teaching-child.jpg",
    "teaching-marker-1.svg", "teaching-marker-2.svg", "teaching-marker-3.svg", "teaching-marker-4.svg",
    "teaching-group.svg", "teaching-location.svg",
  ];
  assert.equal(files.length, 36);
  for (const file of files) {
    const asset = path.join(process.cwd(), "public", "school", file);
    const info = await stat(asset);
    assert.ok(info.isFile() && info.size > 100, file);
    if (file.endsWith(".svg")) {
      const svg = await readFile(asset, "utf8");
      assert.match(svg, /<svg\b[^>]*\bwidth="[\d.]+"[^>]*\bheight="[\d.]+"/u, file);
    }
  }
});
