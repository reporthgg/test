import type { Locale } from "@/i18n/config";

type TeachingCopy = {
  title: readonly [string, string, string];
  description: string;
  points: readonly { title: string; description: string }[];
  group: string;
  location: string;
  photoAlts: readonly [string, string, string];
};

export const schoolTeachingContent: Record<Locale, TeachingCopy> = {
  ru: {
    title: ["Английский, который вы", "используете,", "а не только учите"],
    description: "Разбирайте новые темы, применяйте их в разговоре и получайте обратную связь преподавателя.",
    points: [
      { title: "Разговорная практика", description: "Используете новые слова и конструкции в диалогах и заданиях." },
      { title: "Обратная связь", description: "Преподаватель объясняет ошибки и помогает разобраться со сложными темами." },
      { title: "Подходящий уровень", description: "Учитесь в группе, подобранной по результатам тестирования." },
      { title: "Закрепление знаний", description: "Возвращаетесь к изученному в домашних заданиях и проверочных работах." },
    ],
    group: "Индивидуально и до 8 человек",
    location: "В центре и онлайн",
    photoAlts: ["Студентки GSC Study", "Преподаватель на занятии", "Ученица на занятии"],
  },
  kz: {
    title: ["Ағылшын тілін тек үйреніп қана қоймай,", "өмірде", "қолданыңыз"],
    description: "Жаңа тақырыптарды талдап, оларды сөйлесуде қолданыңыз және оқытушыдан кері байланыс алыңыз.",
    points: [
      { title: "Сөйлесу тәжірибесі", description: "Жаңа сөздер мен құрылымдарды диалогтарда және тапсырмаларда қолданасыз." },
      { title: "Кері байланыс", description: "Оқытушы қателерді түсіндіріп, күрделі тақырыптарды меңгеруге көмектеседі." },
      { title: "Сәйкес деңгей", description: "Тест нәтижелері бойынша таңдалған топта оқисыз." },
      { title: "Білімді бекіту", description: "Үй тапсырмалары мен тексеру жұмыстарында өткен материалға қайта ораласыз." },
    ],
    group: "Жеке және 8 адамға дейінгі топта",
    location: "Орталықта және онлайн",
    photoAlts: ["GSC Study студенттері", "Сабақтағы оқытушы", "Сабақтағы оқушы"],
  },
  en: {
    title: ["English you", "use,", "not just study"],
    description: "Explore new topics, put them into practice in conversation and get feedback from your teacher.",
    points: [
      { title: "Speaking practice", description: "Use new words and structures in conversations and activities." },
      { title: "Feedback", description: "Your teacher explains mistakes and helps you understand challenging topics." },
      { title: "The right level", description: "Study in a group matched to your placement test results." },
      { title: "Consolidating knowledge", description: "Revisit what you have learned through homework and progress checks." },
    ],
    group: "Individual lessons and groups of up to 8",
    location: "At the centre and online",
    photoAlts: ["GSC Study students", "A teacher during a lesson", "A student during a lesson"],
  },
};
