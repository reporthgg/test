import type { Locale } from "@/i18n/config";

type SchoolOfferCopy = {
  title: readonly [string, string];
  tagline: string;
  price: { amount: string; period: string };
  includedTitle: string;
  included: readonly string[];
  resultTitle: string;
  result: string;
  cta: string;
};

export const schoolOfferCourse = "General English";

const amount = "60\u00a0000\u00a0₸";

export const schoolOfferContent: Record<Locale, SchoolOfferCopy> = {
  ru: {
    title: ["General", "English"],
    tagline: "Английский, который вы сможете использовать в жизни, учёбе и работе!",
    price: { amount, period: "12\u00a0часов\u00a0в\u00a0месяц" },
    includedTitle: "Что входит в курс:",
    included: [
      "Учебные материалы Oxford и Cambridge, все материалы включены в стоимость.",
      "Развитие разговорной речи, грамматики, аудирования и письма.",
      "Дополнительные занятия по субботам: Speaking Club с носителем, Reading Club и Grammar Club.",
      "Опытные преподаватели со стажем от\u00a05 до\u00a010\u00a0лет.",
      "Ежемесячная обратная связь о вашем прогрессе и рекомендации по улучшению уровня.",
    ],
    resultTitle: "Ваш результат:",
    result: "Больше уверенности в разговоре, крепкая грамматическая база и возможность постепенно перейти на следующий уровень английского.",
    cta: "Записаться на General English",
  },
  kz: {
    title: ["General", "English"],
    tagline: "Өмірде, оқуда және жұмыста қолдана алатын ағылшын тілі!",
    price: { amount, period: "айына\u00a012\u00a0сағат" },
    includedTitle: "Курсқа не кіреді:",
    included: [
      "Oxford және Cambridge оқу материалдары, барлық материал курс бағасына кіреді.",
      "Ауызекі сөйлеуді, грамматиканы, тыңдап түсінуді және жазуды дамыту.",
      "Сенбі күндері өтетін қосымша сабақтар: тіл иесімен Speaking Club, Reading Club және Grammar Club.",
      "Жұмыс өтілі 5\u00a0жылдан 10\u00a0жылға дейінгі тәжірибелі оқытушылар.",
      "Ай сайын прогресіңіз туралы кері байланыс және деңгейіңізді көтеру бойынша ұсыныстар.",
    ],
    resultTitle: "Сіздің нәтижеңіз:",
    result: "Сөйлескенде сенімділік артады, берік грамматикалық негіз қалыптасады және ағылшын тілінің келесі деңгейіне біртіндеп өту мүмкіндігі ашылады.",
    cta: "General English курсына жазылу",
  },
  en: {
    title: ["General", "English"],
    tagline: "English you can use in everyday life, in your studies and at work!",
    price: { amount, period: "12\u00a0hours\u00a0a\u00a0month" },
    includedTitle: "What the course includes:",
    included: [
      "Oxford and Cambridge course materials, all included in the price.",
      "Developing your speaking, grammar, listening and writing.",
      "Extra Saturday sessions: Speaking Club with a native speaker, Reading Club and Grammar Club.",
      "Experienced teachers with 5\u00a0to\u00a010\u00a0years of teaching experience.",
      "Monthly feedback on your progress and recommendations on how to improve your level.",
    ],
    resultTitle: "Your result:",
    result: "More confidence in conversation, a solid grammar foundation and the chance to move up to the next level of English step by step.",
    cta: "Sign up for General English",
  },
};
