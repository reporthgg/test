import type { Locale } from "@/i18n/config";

type LocalizedText = Record<Locale, string>;
type TeacherOffice = "syganak" | "seifullin";
type TeacherProfile = {
  name: LocalizedText;
  subjects: LocalizedText;
  experience?: number;
  qualification?: string;
  office?: TeacherOffice;
  // cover: обычное фото с фоном заполняет всю рамку; без него портрет без фона стоит на градиенте карточки.
  image: { src: string; width: number; height: number; cover?: boolean };
};

type TeacherCard = {
  id: string;
  tone: "pink" | "green" | "blue";
  profile: TeacherProfile;
};

const generalEnglish: LocalizedText = { ru: "General English", kz: "General English", en: "General English" };
const generalEnglishIelts: LocalizedText = { ru: "General English, IELTS", kz: "General English, IELTS", en: "General English, IELTS" };
const ielts: LocalizedText = { ru: "IELTS", kz: "IELTS", en: "IELTS" };
const chineseHsk: LocalizedText = { ru: "Китайский язык, HSK", kz: "Қытай тілі, HSK", en: "Chinese, HSK" };

function photo(id: string): TeacherProfile["image"] {
  return { src: `/school/teacher-${id}.jpg`, width: 580, height: 640, cover: true };
}

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
    id: "yulia",
    tone: "green",
    profile: { name: { ru: "Юлия", kz: "Юлия", en: "Yulia" }, subjects: generalEnglish, office: "syganak", image: photo("yulia") },
  },
  {
    id: "dana",
    tone: "blue",
    profile: { name: { ru: "Дана", kz: "Дана", en: "Dana" }, subjects: generalEnglish, office: "syganak", image: photo("dana") },
  },
  {
    id: "diana",
    tone: "pink",
    profile: {
      name: { ru: "Диана", kz: "Диана", en: "Diana" },
      subjects: generalEnglishIelts,
      experience: 10,
      qualification: "IELTS 8.0",
      office: "syganak",
      image: photo("diana"),
    },
  },
  {
    id: "alina",
    tone: "green",
    profile: { name: { ru: "Алина", kz: "Алина", en: "Alina" }, subjects: generalEnglish, office: "syganak", image: photo("alina") },
  },
  {
    id: "kamila",
    tone: "blue",
    profile: {
      name: { ru: "Камила", kz: "Камила", en: "Kamila" },
      subjects: generalEnglishIelts,
      experience: 8,
      qualification: "IELTS 8.0",
      office: "syganak",
      image: photo("kamila"),
    },
  },
  {
    id: "asel",
    tone: "pink",
    profile: { name: { ru: "Асель Мусина", kz: "Асель Мусина", en: "Asel Musina" }, subjects: generalEnglish, office: "seifullin", image: photo("asel") },
  },
  {
    id: "alina-kazhkenova",
    tone: "green",
    profile: { name: { ru: "Алина Кажкенова", kz: "Алина Кажкенова", en: "Alina Kazhkenova" }, subjects: chineseHsk, office: "seifullin", image: photo("alina-kazhkenova") },
  },
  {
    id: "beibarys",
    tone: "blue",
    profile: { name: { ru: "Бейбарыс Сарсенбаев", kz: "Бейбарыс Сарсенбаев", en: "Beibarys Sarsenbayev" }, subjects: generalEnglishIelts, office: "seifullin", image: photo("beibarys") },
  },
  {
    id: "nazerke",
    tone: "pink",
    profile: { name: { ru: "Назерке Әсен", kz: "Назерке Әсен", en: "Nazerke Assen" }, subjects: chineseHsk, office: "seifullin", image: photo("nazerke") },
  },
  {
    id: "alida",
    tone: "green",
    profile: { name: { ru: "Алида Рамазанова", kz: "Алида Рамазанова", en: "Alida Ramazanova" }, subjects: ielts, office: "seifullin", image: photo("alida") },
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
  officeLabel: string;
  offices: Record<TeacherOffice, string>;
};

export const schoolTeachersContent: Record<Locale, TeachersCopy> = {
  ru: {
    title: ["Познакомьтесь с вашими", "преподавателями"],
    description: "Познакомьтесь с преподавателем на пробном уроке",
    trial: "Пробный урок",
    bookWith: "Пробный урок с преподавателем",
    experience: "стаж",
    years: "лет",
    listLabel: "Преподаватели языковой школы",
    officeLabel: "Офис:",
    offices: { syganak: "Сыганак, 15 · Greenline", seifullin: "Алматы, Сейфуллина, 575" },
  },
  kz: {
    title: ["Өз", "оқытушыларыңызбен танысыңыз"],
    description: "Сынама сабақта оқытушымен танысыңыз",
    trial: "Сынама сабақ",
    bookWith: "Сынама сабақтың оқытушысы:",
    experience: "тәжірибе",
    years: "жыл",
    listLabel: "Тіл мектебінің оқытушылары",
    officeLabel: "Кеңсе:",
    offices: { syganak: "Сығанақ, 15 · Greenline", seifullin: "Алматы, Сейфуллин, 575" },
  },
  en: {
    title: ["Meet your", "teachers"],
    description: "Meet your teacher at a trial lesson",
    trial: "Trial lesson",
    bookWith: "Book a trial lesson with",
    experience: "experience",
    years: "years",
    listLabel: "Language school teachers",
    officeLabel: "Office:",
    offices: { syganak: "Syganak 15 · Greenline", seifullin: "Almaty, 575 Seifullin Ave" },
  },
};
