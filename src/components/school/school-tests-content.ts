import type { Locale } from "@/i18n/config";

type TestsCopy = {
  title: readonly [string, string];
  intro: string;
  english: string;
  englishDescription: string;
  chooseTest: string;
  free: string;
  exam: string;
  examDescription: string;
  writtenReview: string;
};

export const schoolTestsContent: Record<Locale, TestsCopy> = {
  ru: {
    title: ["Узнайте свой уровень", "бесплатно"],
    intro: "Проверьте знания и узнайте, какая программа подойдёт вам сейчас",
    english: "Английский",
    englishDescription: "Определите свой текущий уровень",
    chooseTest: "Выберите тест для своего возраста",
    free: "Онлайн. Бесплатно",
    exam: "Диагностика экзамена",
    examDescription: "Проверьте готовность к экзамену",
    writtenReview: "Письменные ответы проверяет преподаватель.",
  },
  kz: {
    title: ["Өз деңгейіңізді", "тегін анықтаңыз"],
    intro: "Біліміңізді тексеріп, қазір сізге қандай бағдарлама сәйкес келетінін біліңіз",
    english: "Ағылшын тілі",
    englishDescription: "Қазіргі тіл деңгейіңізді анықтаңыз",
    chooseTest: "Жасыңызға сәйкес тестті таңдаңыз",
    free: "Онлайн. Тегін",
    exam: "Емтиханға дайындықты бағалау",
    examDescription: "Емтиханға дайындығыңызды тексеріңіз",
    writtenReview: "Жазбаша жауаптарды оқытушы тексереді.",
  },
  en: {
    title: ["Find out your level", "for free"],
    intro: "Check your knowledge and find the right programme for your current level",
    english: "English",
    englishDescription: "Find out your current level",
    chooseTest: "Choose a test for your age",
    free: "Online. Free",
    exam: "Exam assessment",
    examDescription: "Check your readiness for the exam",
    writtenReview: "A teacher reviews written answers.",
  },
};
