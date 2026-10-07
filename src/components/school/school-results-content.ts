import { studentStories } from "@/components/landing/stories-content";
import type { Locale } from "@/i18n/config";

type LocalizedText = Record<Locale, string>;
type SchoolResult = {
  id: string;
  name: LocalizedText;
  image: string;
  href: string;
  result: string;
  detail: LocalizedText;
  program: LocalizedText;
  action: "video" | "post";
  readLabel?: LocalizedText;
  color: "blue" | "pink" | "green";
};

const text = (ru: string, kz: string, en: string): LocalizedText => ({ ru, kz, en });
const ielts = text("Подготовка к IELTS", "IELTS-қа дайындық", "IELTS preparation");
const exams = text("экзаменационная подготовка", "емтиханға дайындық", "exam preparation");
const twoMonths = text("за 2 месяца", "2 айда", "in 2 months");
const abroad = text("Поступление за рубеж", "Шетелге оқуға түсу", "Study abroad");

// Result text and portrait crops follow Figma 287:184; links match the same student.
const resultCards = [
  {
    id: "vlad",
    result: "A1 → C1",
    detail: text("к 8 классу", "8-сыныпқа дейін", "by Grade 8"),
    program: text("English for Teens", "English for Teens", "English for Teens"),
    action: "video",
    color: "blue",
  },
  {
    id: "kalima",
    result: "Woosong University",
    detail: text("Южная Корея", "Оңтүстік Корея", "South Korea"),
    program: abroad,
    action: "post",
    color: "pink",
  },
  { id: "amir", result: "IELTS 8.0", detail: exams, program: ielts, action: "video", color: "green" },
  { id: "diar", result: "IELTS 7.5", detail: twoMonths, program: ielts, action: "post", color: "pink" },
  {
    id: "saida",
    result: "IELTS 8.0",
    detail: exams,
    program: ielts,
    action: "post",
    color: "blue",
    readLabel: text("Читать историю Саиды", "Саиданың оқиғасын оқу", "Read Saida’s story"),
  },
  { id: "aminka", result: "IELTS 7.5", detail: twoMonths, program: ielts, action: "video", color: "green" },
  {
    id: "nursultan",
    result: "IELTS 8.0",
    detail: exams,
    program: ielts,
    action: "post",
    color: "pink",
    readLabel: text("Читать историю Нурсултана", "Нұрсұлтанның оқиғасын оқу", "Read Nursultan’s story"),
  },
  {
    id: "zhanel",
    result: "UWC Singapore",
    detail: text("грант на программу IB", "IB бағдарламасына грант", "IB programme scholarship"),
    program: abroad,
    action: "video",
    color: "blue",
  },
] satisfies readonly Omit<SchoolResult, "name" | "image" | "href">[];

export const schoolResults: readonly SchoolResult[] = resultCards.map((card) => {
  const story = studentStories.find((item) => item.id === card.id);
  if (!story) throw new Error(`Missing student story: ${card.id}`);

  return {
    ...card,
    name: card.id === "aminka" ? text("Аминка", "Аминка", "Aminka") : story.name,
    image: `/school/results/${card.id}.png`,
    href: story.href,
    readLabel: card.readLabel ?? story.readLabel,
  };
});

type SchoolResultsContent = {
  your: string;
  results: string;
  speak: string;
  description: string;
  more: string;
  previous: string;
  next: string;
  gallery: string;
  progress: string;
  watch: string;
};

export const schoolResultsContent: Record<Locale, SchoolResultsContent> = {
  ru: {
    your: "Ваши",
    results: "результаты",
    speak: "говорят за нас",
    description: "Больше результатов и историй студентов в нашем Instagram",
    more: "Еще результаты",
    previous: "Предыдущий результат",
    next: "Следующий результат",
    gallery: "Результаты студентов",
    progress: "Позиция в карусели результатов",
    watch: "Смотреть историю",
  },
  kz: {
    your: "Сіздің",
    results: "нәтижелеріңіз",
    speak: "біз туралы айтады",
    description: "Студенттердің басқа нәтижелері мен оқиғалары біздің Instagram-да",
    more: "Басқа нәтижелер",
    previous: "Алдыңғы нәтиже",
    next: "Келесі нәтиже",
    gallery: "Студенттердің нәтижелері",
    progress: "Нәтижелер каруселіндегі орын",
    watch: "Оқиғаны көру",
  },
  en: {
    your: "Your",
    results: "results",
    speak: "speak for us",
    description: "More student results and stories on our Instagram",
    more: "More results",
    previous: "Previous result",
    next: "Next result",
    gallery: "Student results",
    progress: "Position in the results carousel",
    watch: "Watch the story",
  },
};
