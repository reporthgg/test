import type { Locale } from "@/i18n/config";

type LocalizedText = Record<Locale, string>;
type SchoolTeacher = {
  id: string;
  name: LocalizedText;
  subjects: LocalizedText;
  experience: number;
  qualification: string;
  image: string | null;
  tone: "pink" | "green" | "blue";
};

export const schoolTeachers: readonly SchoolTeacher[] = [
  {
    id: "ayaulym",
    name: { ru: "Аяулым", kz: "Аяулым", en: "Ayaulym" },
    subjects: { ru: "General English, Academic English", kz: "General English, Academic English", en: "General English, Academic English" },
    experience: 9,
    qualification: "CELTA",
    image: "/school/teacher-ayaulym.png",
    tone: "pink",
  },
  {
    id: "dariya",
    name: { ru: "Дария", kz: "Дария", en: "Dariya" },
    subjects: { ru: "Подготовка к IELTS", kz: "IELTS емтиханына дайындық", en: "IELTS preparation" },
    experience: 6,
    qualification: "IELTS 8.5",
    image: "/school/teacher-dariya.png",
    tone: "green",
  },
  {
    id: "madina",
    name: { ru: "Мадина Р.", kz: "Мадина Р.", en: "Madina R." },
    subjects: { ru: "English for Kids, English for Teens", kz: "English for Kids, English for Teens", en: "English for Kids, English for Teens" },
    experience: 7,
    qualification: "TKT",
    image: null,
    tone: "blue",
  },
  {
    id: "li-wei",
    name: { ru: "Ли Вэй", kz: "Ли Вэй", en: "Li Wei" },
    subjects: { ru: "Китайский язык", kz: "Қытай тілі", en: "Chinese" },
    experience: 5,
    qualification: "HSK 6",
    image: null,
    tone: "pink",
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
};

export const schoolTeachersContent: Record<Locale, TeachersCopy> = {
  ru: {
    title: ["Познакомьтесь с вашими", "преподавателями"],
    description: "Выберите преподавателя для пробного урока",
    trial: "Пробный урок",
    bookWith: "Пробный урок с преподавателем",
    experience: "стаж",
    years: "лет",
    listLabel: "Преподаватели языковой школы",
  },
  kz: {
    title: ["Өз", "оқытушыларыңызбен танысыңыз"],
    description: "Сынама сабаққа оқытушыны таңдаңыз",
    trial: "Сынама сабақ",
    bookWith: "Сынама сабақтың оқытушысы:",
    experience: "тәжірибе",
    years: "жыл",
    listLabel: "Тіл мектебінің оқытушылары",
  },
  en: {
    title: ["Meet your", "teachers"],
    description: "Choose a teacher for your trial lesson",
    trial: "Trial lesson",
    bookWith: "Book a trial lesson with",
    experience: "experience",
    years: "years",
    listLabel: "Language school teachers",
  },
};
