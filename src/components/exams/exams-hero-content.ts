import type { Locale } from "@/i18n/config";

type ExamsHeroCopy = {
  eyebrow: string;
  title: readonly [string, string];
  description: string;
  cta: string;
  trust: string;
  britishCouncilCaption: string;
  average: string;
  averageCaption: string;
  photos: string;
};

export const examsHeroContent: Record<Locale, ExamsHeroCopy> = {
  ru: {
    eyebrow: "Подготовка к IELTS и SAT",
    title: ["Университет мечты", "ближе с сильным результатом"],
    description: "Пройди бесплатную диагностику. Разберём твои ответы и определим, что подтянуть до экзамена",
    cta: "Узнать свой уровень",
    trust: "Партнёры и результаты",
    britishCouncilCaption: "IELTS registration partner",
    average: "7.0 балла",
    averageCaption: "Средний балл наших студентов",
    photos: "Студенты GSC с результатами IELTS 8.0 и 7.5",
  },
  kz: {
    eyebrow: "IELTS және SAT-қа дайындық",
    title: ["Арман университеті", "жоғары балмен жақынырақ"],
    description: "Тегін диагностикадан өт. Жауаптарыңды талдап, емтиханға дейін нені күшейту керегін анықтаймыз",
    cta: "Деңгейіңді анықта",
    trust: "Серіктестер мен нәтижелер",
    britishCouncilCaption: "IELTS registration partner",
    average: "7.0 балл",
    averageCaption: "Студенттеріміздің орташа балы",
    photos: "IELTS 8.0 және 7.5 нәтижесі бар GSC студенттері",
  },
  en: {
    eyebrow: "IELTS and SAT preparation",
    title: ["Dream university", "is closer with a top score"],
    description: "Take a free diagnostic. We will review your answers and show what to improve before the exam",
    cta: "Find out your level",
    trust: "Partners and results",
    britishCouncilCaption: "IELTS registration partner",
    average: "Band 7.0",
    averageCaption: "Average score of our students",
    photos: "GSC students with IELTS scores of 8.0 and 7.5",
  },
};

export type BorderColor = "blue" | "pink" | "green" | "gold" | "rose";
export type BorderPatch = readonly [BorderColor, number, number, number, number];

export const portraitBorder: readonly BorderPatch[] = [
  ["blue", -24.58, -47.86, 185.554, 95.719],
  ["blue", 168.34, 581.99, 185.554, 95.719],
  ["pink", 160.98, -47.86, 192.917, 95.719],
  ["pink", -24.58, 581.99, 192.917, 95.719],
  ["green", 353.89, -47.86, 95.719, 234.684],
  ["green", -24.58, 347.31, 95.719, 234.684],
  ["gold", 353.89, 186.82, 95.719, 236.383],
  ["gold", -24.58, 208.96, 95.719, 138.351],
  ["rose", 353.89, 423.21, 95.719, 254.505],
  ["rose", -24.58, 47.86, 95.719, 161.099],
];

export const universityBorder: readonly BorderPatch[] = [
  ["blue", -14.13, -27.51, 106.661, 93.169],
  ["blue", 96.76, 342.9, 106.661, 93.169],
  ["blue", 394.6, -27.51, 106.661, 93.169],
  ["blue", 493.27, 342.9, 106.661, 93.169],
  ["pink", 92.53, -27.51, 110.891, 93.169],
  ["pink", -14.13, 342.9, 110.891, 93.169],
  ["pink", 489.32, -14.17, 110.891, 93.169],
  ["pink", 392.23, 341.26, 110.881, 93.169],
  ["green", 203.42, -27.51, 55.021, 173.049],
  ["green", -23.49, 199.64, 61.571, 188.239],
  ["green", 551.88, 32.1, 61.571, 188.249],
  ["green", 301.7, 269.52, 96.331, 188.249],
  ["gold", 169.69, 68.93, 55.021, 174.029],
  ["gold", -14.13, 120.11, 55.021, 117.679],
  ["gold", 558.36, 114.36, 55.021, 156.339],
  ["gold", 256.47, 351.11, 55.021, 117.679],
  ["rose", 203.42, 251.63, 55.021, 184.439],
  ["rose", 252.35, -105.44, 164.321, 184.439],
  ["rose", -14.13, 27.51, 55.021, 130.759],
  ["rose", 558.6, 228.31, 51.701, 154.949],
];

export const amirMobileBorder: readonly BorderPatch[] = [
  ["blue", -10.62, -20.73, 80.176, 45.436],
  ["blue", 72.74, 252.1, 80.176, 41.463],
  ["pink", 64.45, -20.73, 88.463, 41.463],
  ["pink", -10.62, 246.95, 83.358, 46.621],
  ["green", 152.91, -20.73, 41.359, 104.917],
  ["green", -10.62, 147.07, 41.359, 105.032],
  ["gold", 152.91, 80.93, 41.359, 102.395],
  ["gold", -10.62, 82.21, 41.359, 68.232],
  ["rose", 152.91, 179.75, 41.359, 113.816],
  ["rose", -10.62, 20.73, 41.359, 69.784],
];

export const studentMobileBorder: readonly BorderPatch[] = [
  ["blue", -9.99, -19.5, 75.426, 42.744],
  ["blue", 68.43, 237.17, 75.426, 39.006],
  ["pink", 60.63, -19.5, 83.222, 39.006],
  ["pink", -9.99, 232.31, 78.419, 43.859],
  ["green", 143.85, -19.5, 38.909, 98.701],
  ["green", -9.99, 138.36, 38.909, 98.809],
  ["gold", 143.85, 76.13, 38.909, 96.328],
  ["gold", -9.99, 77.34, 38.909, 64.189],
  ["rose", 143.85, 169.1, 38.909, 107.072],
  ["rose", -9.99, 19.5, 38.909, 65.649],
];
