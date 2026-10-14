import assert from "node:assert/strict";
import { stat, readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import { getSchoolDict } from "@/i18n/pages/school";
import { locales } from "@/i18n/config";
import { schoolProgramArtwork, schoolProgramPrice, schoolProgramsContent } from "./school-programs-content";
import { experienceLabel, schoolTeachers, schoolTeachersContent } from "./school-teachers-content";

test("programme pricing: General English has a price, the rest are consultation-only", () => {
  assert.equal(schoolProgramsContent.ru.price, "Стоимость уточняется на консультации");
  assert.equal(schoolProgramsContent.kz.price, "Бағасы кеңес кезінде нақтыланады");
  assert.equal(schoolProgramsContent.en.price, "Pricing is confirmed during the consultation");
  for (const locale of locales) {
    assert.doesNotMatch(schoolProgramsContent[locale].price, /[\d₸]/u);
    for (const { id } of schoolProgramArtwork) {
      const price = schoolProgramPrice(id, locale);
      if (id === "general") {
        assert.match(price.replace(/\s/gu, " "), /^60 000 ₸ \/ \S/u);
      } else {
        assert.equal(price, schoolProgramsContent[locale].price);
      }
    }
  }
  assert.equal(schoolProgramPrice("general", "ru").replace(/\s/gu, " "), "60 000 ₸ / 12 часов в месяц");
});

test("teachers: Ayaulym first, then the Syganak, Almaty and Uly Dala teams", () => {
  assert.deepEqual(
    schoolTeachers.map(({ id, profile }) => ({
      id,
      name: profile.name.ru,
      subjects: profile.subjects.ru,
      office: profile.office ?? null,
      image: profile.image.src,
    })),
    [
      { id: "ayaulym", name: "Аяулым Камбарова", subjects: "General English", office: "ulyDala", image: "/school/teacher-ayaulym.jpg" },
      { id: "yulia", name: "Юлия", subjects: "General English", office: "syganak", image: "/school/teacher-yulia.jpg" },
      { id: "dana", name: "Дана", subjects: "General English", office: "syganak", image: "/school/teacher-dana.jpg" },
      { id: "diana", name: "Диана", subjects: "General English, IELTS", office: "syganak", image: "/school/teacher-diana.jpg" },
      { id: "alina", name: "Алина", subjects: "General English", office: "syganak", image: "/school/teacher-alina.jpg" },
      { id: "kamila", name: "Камила", subjects: "General English, IELTS", office: "syganak", image: "/school/teacher-kamila.jpg" },
      { id: "asel", name: "Асель Мусина", subjects: "General English", office: "seifullin", image: "/school/teacher-asel.jpg" },
      { id: "alina-kazhkenova", name: "Алина Кажкенова", subjects: "Китайский язык, HSK", office: "seifullin", image: "/school/teacher-alina-kazhkenova.jpg" },
      { id: "beibarys", name: "Бейбарыс Сарсенбаев", subjects: "General English, IELTS", office: "seifullin", image: "/school/teacher-beibarys.jpg" },
      { id: "nazerke", name: "Назерке Әсен", subjects: "Китайский язык, HSK", office: "seifullin", image: "/school/teacher-nazerke.jpg" },
      { id: "alida", name: "Алида Рамазанова", subjects: "IELTS", office: "seifullin", image: "/school/teacher-alida.jpg" },
      { id: "tokzhan", name: "Токжан Есенгали", subjects: "IELTS", office: "ulyDala", image: "/school/teacher-tokzhan.jpg" },
      { id: "zhaniya", name: "Жания Турсынкул", subjects: "General English", office: "ulyDala", image: "/school/teacher-zhaniya.jpg" },
      { id: "marat", name: "Марат Калымгереев", subjects: "IELTS", office: "ulyDala", image: "/school/teacher-marat.jpg" },
      { id: "kamila-berdenova", name: "Камила Берденова", subjects: "General English", office: "ulyDala", image: "/school/teacher-kamila-berdenova.jpg" },
      { id: "sulkei", name: "Сулькей Куандыкова", subjects: "IELTS", office: "ulyDala", image: "/school/teacher-sulkei.jpg" },
      { id: "dinara", name: "Динара Махмет", subjects: "General English", office: "ulyDala", image: "/school/teacher-dinara.jpg" },
      { id: "leila", name: "Лейла Валеева", subjects: "IELTS", office: "ulyDala", image: "/school/teacher-leila.jpg" },
    ],
  );
  assert.deepEqual(
    schoolTeachers.map(({ tone }) => tone),
    ["pink", "green", "blue", "pink", "green", "blue", "pink", "green", "blue", "pink", "green", "blue", "pink", "green", "blue", "pink", "green", "blue"],
  );
  assert.deepEqual(
    schoolTeachers.filter(({ profile }) => profile.office === "ulyDala").map(({ profile }) => [profile.experience, profile.experiencePlus, profile.qualification ?? null]),
    [[6, true, null], [3, true, "IELTS 8.5"], [9, true, null], [10, true, "IELTS 8.0"], [9, true, null], [7, true, "IELTS 8.0"], [9, true, null], [3, true, "IELTS 8.0"]],
  );
  assert.deepEqual(
    schoolTeachers.filter(({ profile }) => profile.office === "seifullin").map(({ id, profile }) => [id, profile.experience]),
    [["asel", 21], ["alina-kazhkenova", 3], ["beibarys", 6], ["nazerke", 2], ["alida", 7]],
  );
  const ruYears = schoolTeachersContent.ru.years;
  assert.deepEqual([21, 3, 6, 2, 7, 1, 11, 10].map((years) => experienceLabel("ru", years, false, ruYears)),
    ["21 год", "3 года", "6 лет", "2 года", "7 лет", "1 год", "11 лет", "10 лет"]);
  assert.equal(experienceLabel("ru", 3, true, ruYears), "3+ лет");
  assert.equal(experienceLabel("en", 21, false, schoolTeachersContent.en.years), "21 years");
  assert.equal(experienceLabel("en", 1, false, schoolTeachersContent.en.years), "1 year");
  assert.equal(experienceLabel("kz", 2, false, schoolTeachersContent.kz.years), "2 жыл");
  assert.equal(schoolTeachers[0].profile.experience, 6);
  assert.equal(schoolTeachers[0].profile.experiencePlus, true);
  assert.equal(schoolTeachers[0].profile.qualification, undefined);
  assert.equal(schoolTeachers[0].profile.image.cover, true);
  assert.equal(schoolTeachers.find(({ id }) => id === "diana")?.profile.experience, 10);
  assert.equal(schoolTeachers.find(({ id }) => id === "kamila")?.profile.experience, 8);
  for (const id of ["diana", "kamila"]) {
    assert.equal(schoolTeachers.find((teacher) => teacher.id === id)?.profile.qualification, "IELTS 8.0");
  }
  for (const locale of locales) {
    assert.doesNotMatch(schoolTeachersContent[locale].description, /видео|video|бейне/iu);
    assert.match(schoolTeachersContent[locale].offices.syganak, /Greenline/u);
    assert.match(schoolTeachersContent[locale].offices.seifullin, /575/u);
    assert.match(schoolTeachersContent[locale].offices.ulyDala, /41\/6/u);
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
  assert.equal(files.length, 48);
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
