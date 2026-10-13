import type { Locale } from "@/i18n/config";

type ExamsTestsCopy = {
  title: { first: string; second: string; accent: string; after: string };
  intro: string;
  english: string;
  englishDescription: string;
  examDescription: string;
};

export const examsTestsContent: Record<Locale, ExamsTestsCopy> = {
  ru: {
    title: { first: "Узнайте свой", second: "уровень ", accent: "бесплатно", after: "" },
    intro: "Пройди тест. Преподаватель разберёт ответы и подскажет, с чего начать подготовку",
    english: "Английский",
    englishDescription: "Определите свой текущий уровень",
    examDescription: "Проверьте готовность к экзамену",
  },
  kz: {
    title: { first: "Өз деңгейіңізді", second: "", accent: "тегін", after: " анықтаңыз" },
    intro: "Тесттен өт. Оқытушы жауаптарыңды талдап, дайындықты неден бастау керегін айтады",
    english: "Ағылшын тілі",
    englishDescription: "Қазіргі тіл деңгейіңізді анықтаңыз",
    examDescription: "Емтиханға дайындығыңызды тексеріңіз",
  },
  en: {
    title: { first: "Find out your", second: "level ", accent: "for free", after: "" },
    intro: "Take a test. A teacher will review your answers and suggest where to start your preparation",
    english: "English",
    englishDescription: "Find out your current level",
    examDescription: "Check your readiness for the exam",
  },
};

export const examTestKinds = ["placement", "ielts", "sat"] as const;
