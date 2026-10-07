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

test("canonical teachers retain two portraits without promising unavailable videos", () => {
  assert.deepEqual(
    schoolTeachers.map(({ id, image }) => ({ id, image })),
    [
      { id: "ayaulym", image: "/school/teacher-ayaulym.png" },
      { id: "dariya", image: "/school/teacher-dariya.png" },
      { id: "madina", image: null },
      { id: "li-wei", image: null },
    ],
  );
  for (const locale of locales) {
    assert.doesNotMatch(schoolTeachersContent[locale].description, /видео|video|бейне/iu);
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

test("all 32 original section assets exist and are non-empty", async () => {
  const files = [
    ...schoolProgramArtwork.flatMap((art) => [
      `program-${art.id}.${art.extension}`, `program-${art.id}-mobile.png`,
    ]),
    ...schoolTeachers.flatMap((teacher) => teacher.image ? [path.basename(teacher.image)] : []),
    "teacher-badge.svg", "test-arrow-white.svg", "test-arrow-blue.svg", "test-note.svg",
    "teaching-students.jpg", "teaching-retouch.png", "teaching-teacher.png", "teaching-child.jpg",
    "teaching-marker-1.svg", "teaching-marker-2.svg", "teaching-marker-3.svg", "teaching-marker-4.svg",
    "teaching-group.svg", "teaching-location.svg",
  ];
  assert.equal(files.length, 32);
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
