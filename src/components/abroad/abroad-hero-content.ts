import type { Locale } from "@/i18n/config";

type AbroadHeroContent = {
  eyebrow: string;
  heading: { first: string; before: string; accent: string; after: string };
  description: string;
  consultation: string;
  photoAlts: { lawn: string; city: string; students: string; books: string };
  trust: string;
  since: readonly [string, string];
  students: string;
  admissions: string;
};

export type AbroadHeroPhoto = {
  id: "lawn" | "city" | "students";
  desktop: { src: string; width: number; height: number };
  mobile: { src: string; width: number; height: number };
};

export const abroadHeroPhotos: readonly AbroadHeroPhoto[] = [
  {
    id: "lawn",
    desktop: { src: "/abroad/hero/lawn.png", width: 577, height: 614 },
    mobile: { src: "/abroad/hero/lawn-mobile.png", width: 342, height: 366 },
  },
  {
    id: "city",
    desktop: { src: "/abroad/hero/city.png", width: 577, height: 614 },
    mobile: { src: "/abroad/hero/city-mobile.png", width: 342, height: 362 },
  },
  {
    id: "students",
    desktop: { src: "/abroad/hero/students.png", width: 577, height: 614 },
    mobile: { src: "/abroad/hero/students-mobile.png", width: 342, height: 366 },
  },
];

export const abroadHeroContent: Record<Locale, AbroadHeroContent> = {
  ru: {
    eyebrow: "Поступление за рубеж",
    heading: { first: "Подберём университет", before: "под твои ", accent: "оценки, интересы и бюджет", after: "" },
    description: "Организуем поступление: документы, заявки и связь с вузом",
    consultation: "Бесплатная консультация",
    photoAlts: {
      lawn: "Студентки на лужайке в кампусе",
      city: "Городская улица с небоскрёбами",
      students: "Студенты на занятии",
      books: "Книжные полки в библиотеке",
    },
    trust: "Опыт GSC Study и партнёры",
    since: ["С 2011", "года"],
    students: "студентов вместе с GSC",
    admissions: "поступлений в 240+ вузов",
  },
  kz: {
    eyebrow: "Шетелге оқуға түсу",
    heading: { first: "Университетті", before: "", accent: "бағаңа, қызығушылығыңа және бюджетіңе", after: " сай таңдаймыз" },
    description: "Түсуді ұйымдастырамыз: құжаттар, өтінімдер және ЖОО-мен байланыс",
    consultation: "Тегін кеңес",
    photoAlts: {
      lawn: "Кампус алаңындағы студент қыздар",
      city: "Зәулім үйлері бар қала көшесі",
      students: "Сабақтағы студенттер",
      books: "Кітапханадағы кітап сөрелері",
    },
    trust: "GSC Study тәжірибесі және серіктестер",
    since: ["2011", "жылдан"],
    students: "студент GSC-мен бірге",
    admissions: "240+ ЖОО-ға қабылдану",
  },
  en: {
    eyebrow: "Study abroad",
    heading: { first: "We'll match a university", before: "to your ", accent: "grades, interests and budget", after: "" },
    description: "We handle documents, applications and contact with the university",
    consultation: "Free consultation",
    photoAlts: {
      lawn: "Students on a campus lawn",
      city: "A city street with skyscrapers",
      students: "Students in class",
      books: "Bookshelves in a library",
    },
    trust: "GSC Study experience and partners",
    since: ["Since", "2011"],
    students: "students with GSC",
    admissions: "admissions to 240+ universities",
  },
};
