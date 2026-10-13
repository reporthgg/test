import { studentStories } from "@/components/landing/stories-content";
import type { Locale } from "@/i18n/config";

type LocalizedText = Record<Locale, string>;

export type ExamsResult = {
  id: string;
  score: string;
  image: string;
  position?: string;
  name?: LocalizedText;
  href?: string;
};

const amir = studentStories.find((story) => story.id === "amir");

export const examsResults: readonly ExamsResult[] = [
  { id: "student", score: "7.5", image: "/exams/results/ielts-student.jpg", position: "50% 77.7%" },
  { id: "certificate", score: "8.0", image: "/exams/results/certificate.jpg" },
  { id: "case", score: "7.5", image: "/exams/results/case.jpg" },
  { id: "headphones", score: "7.0", image: "/exams/results/headphones.jpg", position: "50% 100%" },
  { id: "certificate-report", score: "7.5", image: "/exams/results/certificate-report.jpg" },
  { id: "classroom", score: "7.5", image: "/exams/results/classroom.jpg", position: "50% 100%" },
  { id: "score-report", score: "7.5", image: "/exams/results/score-report.jpg" },
  { id: "amir", score: "8.0", image: "/exams/hero/amir.jpg", name: amir?.name, href: amir?.href },
  { id: "studio", score: "7.5", image: "/exams/results/studio.jpg", position: "50% 28.1%" },
];

type ExamsResultsCopy = {
  title: string;
  points: (score: string) => string;
  want: string;
  join: string;
  previous: string;
  next: string;
  gallery: string;
  progress: string;
  watch: string;
};

export const examsResultsContent: Record<Locale, ExamsResultsCopy> = {
  ru: {
    title: "Аллея славы",
    points: (score) => `${score} балла`,
    want: "Я тоже так хочу",
    join: "Я тоже буду тут",
    previous: "Предыдущий результат",
    next: "Следующий результат",
    gallery: "Результаты студентов",
    progress: "Позиция в карусели результатов",
    watch: "Смотреть историю",
  },
  kz: {
    title: "Даңқ аллеясы",
    points: (score) => `${score} балл`,
    want: "Мен де осылай қалаймын",
    join: "Мен де осында боламын",
    previous: "Алдыңғы нәтиже",
    next: "Келесі нәтиже",
    gallery: "Студенттердің нәтижелері",
    progress: "Нәтижелер каруселіндегі орын",
    watch: "Оқиғаны көру",
  },
  en: {
    title: "Hall of fame",
    points: (score) => `Band ${score}`,
    want: "I want this too",
    join: "I will be here too",
    previous: "Previous result",
    next: "Next result",
    gallery: "Student results",
    progress: "Position in the results carousel",
    watch: "Watch the story",
  },
};
