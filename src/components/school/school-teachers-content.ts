import type { Locale } from "@/i18n/config";

type LocalizedText = Record<Locale, string>;
type TeacherProfile = {
  name: LocalizedText;
  subjects: LocalizedText;
  experience: number;
  qualification: string;
  image: { src: string; width: number; height: number } | null;
};

type TeacherCard = {
  id: string;
  tone: "pink" | "green" | "blue";
  profile: TeacherProfile | null;
};

export const schoolTeachers: readonly TeacherCard[] = [
  {
    id: "ayaulym",
    tone: "pink",
    profile: {
      name: { ru: "Аяулым", kz: "Аяулым", en: "Ayaulym" },
      subjects: { ru: "General English, Academic English", kz: "General English, Academic English", en: "General English, Academic English" },
      experience: 9,
      qualification: "CELTA",
      image: { src: "/school/teacher-ayaulym.png", width: 1192, height: 1319 },
    },
  },
  {
    id: "teacher-2",
    tone: "green",
    profile: null,
  },
  {
    id: "teacher-3",
    tone: "blue",
    profile: null,
  },
  {
    id: "teacher-4",
    tone: "pink",
    profile: null,
  },
];

type TeachersCopy = {
  title: readonly [string, string];
  description: string;
  trial: string;
  bookWith: string;
  experience: string;
  years: string;
  listLabel: string;
  placeholderName: string;
  placeholderPhoto: string;
  placeholderSubjects: string;
};

export const schoolTeachersContent: Record<Locale, TeachersCopy> = {
  ru: {
    title: ["Познакомьтесь с вашими", "преподавателями"],
    description: "Познакомьтесь с преподавателем на пробном уроке",
    trial: "Пробный урок",
    bookWith: "Пробный урок с преподавателем",
    experience: "стаж",
    years: "лет",
    listLabel: "Преподаватели языковой школы",
    placeholderName: "Имя преподавателя",
    placeholderPhoto: "Фото преподавателя",
    placeholderSubjects: "Информация о преподавателе появится здесь",
  },
  kz: {
    title: ["Өз", "оқытушыларыңызбен танысыңыз"],
    description: "Сынама сабақта оқытушымен танысыңыз",
    trial: "Сынама сабақ",
    bookWith: "Сынама сабақтың оқытушысы:",
    experience: "тәжірибе",
    years: "жыл",
    listLabel: "Тіл мектебінің оқытушылары",
    placeholderName: "Оқытушының аты",
    placeholderPhoto: "Оқытушының фотосы",
    placeholderSubjects: "Оқытушы туралы ақпарат осы жерде көрсетіледі",
  },
  en: {
    title: ["Meet your", "teachers"],
    description: "Meet your teacher at a trial lesson",
    trial: "Trial lesson",
    bookWith: "Book a trial lesson with",
    experience: "experience",
    years: "years",
    listLabel: "Language school teachers",
    placeholderName: "Teacher name",
    placeholderPhoto: "Teacher photo",
    placeholderSubjects: "Information about the teacher will appear here",
  },
};
