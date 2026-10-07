import type { Locale } from "@/i18n/config";
import { getSchoolDict } from "@/i18n/pages/school";

type SchoolFaq = {
  id: string;
  question: string;
  answer: string;
  trial?: boolean;
};

type SchoolContactsContent = {
  title: readonly [string, string, string];
  trial: string;
  faq: readonly SchoolFaq[];
};

type FaqCopy = {
  title: readonly [string, string, string];
  trial: string;
  questions: readonly [string, string, string, string, string, string, string, string];
  speakingAnswer: string;
  beginnerAnswer: string;
};

// Questions and the speaking answer: Figma 260:2810 and 260:3051.
// Beginner answer: school dictionary, General English A1-C2 and the A1 level.
const copy: Record<Locale, FaqCopy> = {
  ru: {
    title: ["Ответы", "на ваши", "вопросы"],
    trial: "Пробный урок",
    questions: [
      "Я уже учил английский, но говорить всё ещё сложно. Мне подойдёт обучение?",
      "Можно начать с полного нуля?",
      "Как понять, какой курс мне нужен?",
      "Сколько стоит обучение и что входит в цену?",
      "Смогу ли я совмещать занятия с работой или учёбой?",
      "Ребёнок стесняется говорить. Как понять, подойдёт ли ему школа?",
      "Если у меня уже есть база, придётся начинать сначала?",
      "Какой сертификат я получу?",
    ],
    speakingAnswer: "Начнём с вашего текущего уровня. На занятиях вы будете применять знакомые и новые слова в разговоре с преподавателем и другими студентами. На пробном уроке сможете оценить такой формат.",
    beginnerAnswer: "General English подходит для всех уровней от A1 до C2. Уровень A1 (Beginner) рассчитан на обучение с нуля. Стартовый уровень определяем тестом.",
  },
  kz: {
    title: ["Сіздің", "сұрақтарыңызға", "жауаптар"],
    trial: "Сынақ сабағы",
    questions: [
      "Ағылшын тілін бұрын оқыдым, бірақ сөйлеу әлі қиын. Бұл оқу маған сай келе ме?",
      "Мүлде нөлден бастауға бола ма?",
      "Қай курс маған керек екенін қалай білемін?",
      "Оқу қанша тұрады және бағаға не кіреді?",
      "Сабақты жұмыспен немесе оқумен қатар алып жүре аламын ба?",
      "Балам сөйлеуге ұялады. Мектептің оған сай келетінін қалай білемін?",
      "Базалық білімім болса, бәрін басынан бастауым керек пе?",
      "Қандай сертификат аламын?",
    ],
    speakingAnswer: "Қазіргі деңгейіңізден бастаймыз. Сабақта таныс және жаңа сөздерді оқытушымен және басқа студенттермен сөйлескенде қолданасыз. Сынақ сабағында осы форматты бағалай аласыз.",
    beginnerAnswer: "General English A1-ден C2-ге дейінгі барлық деңгейге арналған. A1 (Beginner) деңгейінде оқуды нөлден бастауға болады. Бастапқы деңгейді тестпен анықтаймыз.",
  },
  en: {
    title: ["Answers", "to your", "questions"],
    trial: "Trial lesson",
    questions: [
      "I have studied English before, but speaking is still difficult. Will these lessons suit me?",
      "Can I start as a complete beginner?",
      "How do I know which course I need?",
      "How much does tuition cost, and what is included?",
      "Can I combine lessons with work or studies?",
      "My child is shy about speaking. How can I tell if the school will suit them?",
      "If I already know the basics, will I have to start again?",
      "What certificate will I receive?",
    ],
    speakingAnswer: "We will start from your current level. In class, you will use familiar and new words in conversations with your teacher and other students. You can try this format during a trial lesson.",
    beginnerAnswer: "General English covers all levels from A1 to C2. A1 (Beginner) is designed for learning from scratch. We use a test to determine your starting level.",
  },
};

export function getSchoolContactsContent(locale: Locale): SchoolContactsContent {
  const t = copy[locale];
  const school = getSchoolDict(locale);

  return {
    title: t.title,
    trial: t.trial,
    faq: [
      { id: "speaking", question: t.questions[0], answer: t.speakingAnswer, trial: true },
      { id: "beginner", question: t.questions[1], answer: t.beginnerAnswer },
      { id: "course", question: t.questions[2], answer: school.faqs[0].a },
      // The existing dictionary confirms pricing depends on the programme.
      // The owner still needs to confirm which services the price includes.
      { id: "price", question: t.questions[3], answer: school.faqs[4].a },
      { id: "schedule", question: t.questions[4], answer: `${school.formats[1].title}. ${school.formats[1].text}` },
      { id: "child", question: t.questions[5], answer: school.trialWho.trial.text, trial: true },
      { id: "level", question: t.questions[6], answer: school.hero.text },
      { id: "certificate", question: t.questions[7], answer: school.certificate.text },
    ],
  };
}
