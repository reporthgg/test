import type { Locale } from "@/i18n/config";

type ExamsOfferCopy = {
  title: readonly [string, string];
  subtitle: string;
  stat: { label: string; value: string; unit: string };
  points: readonly string[];
  cta: string;
};

export const examsOfferCourse = "IELTS";

const title = ["IELTS", "Preparation"] as const;
const stat = { value: "7.0", unit: "IELTS" } as const;

export const examsOfferContent: Record<Locale, ExamsOfferCopy> = {
  ru: {
    title,
    subtitle: "Подготовка к IELTS с фокусом на высокий балл",
    stat: { ...stat, label: "Средний результат студентов:" },
    points: [
      "Бесплатный Mock Test каждую субботу для отслеживания прогресса.",
      "Домашние задания, разбор ошибок и рекомендации.",
      "Преподаватели с собственным баллом IELTS 8.0 и выше.",
    ],
    cta: "Записаться на подготовку к IELTS",
  },
  kz: {
    title,
    subtitle: "Жоғары балға бағытталған IELTS-қа дайындық",
    stat: { ...stat, label: "Студенттердің орташа нәтижесі:" },
    points: [
      "Прогресті бақылау үшін сенбі сайын тегін Mock Test.",
      "Үй тапсырмалары, қателерді талдау және ұсыныстар.",
      "IELTS-тен өздері 8.0 және одан жоғары балл алған оқытушылар.",
    ],
    cta: "IELTS-қа дайындыққа жазылу",
  },
  en: {
    title,
    subtitle: "IELTS preparation focused on a high score",
    stat: { ...stat, label: "Our students' average score:" },
    points: [
      "A free Mock Test every Saturday to track your progress.",
      "Homework, mistake reviews and recommendations.",
      "Teachers who have scored 8.0 or higher in IELTS themselves.",
    ],
    cta: "Sign up for IELTS preparation",
  },
};
