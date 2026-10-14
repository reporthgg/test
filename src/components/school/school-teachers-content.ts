import type { Locale } from "@/i18n/config";

type LocalizedText = Record<Locale, string>;
type TeacherOffice = "syganak" | "ulyDala" | "seifullin";
type TeacherProfile = {
  name: LocalizedText;
  subjects: LocalizedText;
  experience?: number;
  experiencePlus?: boolean;
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
      name: { ru: "Аяулым Камбарова", kz: "Аяулым Камбарова", en: "Ayaulym Kambarova" },
      subjects: generalEnglish,
      experience: 6,
      experiencePlus: true,
      office: "ulyDala",
      image: photo("ayaulym"),
    },
  },
  {
    id: "yulia",
    tone: "green",
    profile: { name: { ru: "Юлия", kz: "Юлия", en: "Yulia" }, subjects: generalEnglish, experience: 7, office: "syganak", image: photo("yulia") },
  },
  {
    id: "dana",
    tone: "blue",
    profile: { name: { ru: "Дана", kz: "Дана", en: "Dana" }, subjects: generalEnglish, experience: 7, office: "syganak", image: photo("dana") },
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
    profile: { name: { ru: "Алина", kz: "Алина", en: "Alina" }, subjects: generalEnglish, experience: 3, office: "syganak", image: photo("alina") },
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
    profile: { name: { ru: "Асель Мусина", kz: "Асель Мусина", en: "Asel Musina" }, subjects: generalEnglish, experience: 21, office: "seifullin", image: photo("asel") },
  },
  {
    id: "alina-kazhkenova",
    tone: "green",
    profile: { name: { ru: "Алина Кажкенова", kz: "Алина Кажкенова", en: "Alina Kazhkenova" }, subjects: chineseHsk, experience: 3, office: "seifullin", image: photo("alina-kazhkenova") },
  },
  {
    id: "beibarys",
    tone: "blue",
    profile: { name: { ru: "Бейбарыс Сарсенбаев", kz: "Бейбарыс Сарсенбаев", en: "Beibarys Sarsenbayev" }, subjects: generalEnglishIelts, experience: 6, office: "seifullin", image: photo("beibarys") },
  },
  {
    id: "nazerke",
    tone: "pink",
    profile: { name: { ru: "Назерке Әсен", kz: "Назерке Әсен", en: "Nazerke Assen" }, subjects: chineseHsk, experience: 2, office: "seifullin", image: photo("nazerke") },
  },
  {
    id: "alida",
    tone: "green",
    profile: { name: { ru: "Алида Рамазанова", kz: "Алида Рамазанова", en: "Alida Ramazanova" }, subjects: ielts, experience: 7, office: "seifullin", image: photo("alida") },
  },
  {
    id: "tokzhan",
    tone: "blue",
    profile: {
      name: { ru: "Токжан Есенгали", kz: "Токжан Есенгали", en: "Tokzhan Yessengali" },
      subjects: ielts,
      experience: 3,
      experiencePlus: true,
      qualification: "IELTS 8.5",
      office: "ulyDala",
      image: photo("tokzhan"),
    },
  },
  {
    id: "zhaniya",
    tone: "pink",
    profile: {
      name: { ru: "Жания Турсынкул", kz: "Жания Турсынкул", en: "Zhaniya Tursynkul" },
      subjects: generalEnglish,
      experience: 9,
      experiencePlus: true,
      office: "ulyDala",
      image: photo("zhaniya"),
    },
  },
  {
    id: "marat",
    tone: "green",
    profile: {
      name: { ru: "Марат Калымгереев", kz: "Марат Калымгереев", en: "Marat Kalymgereyev" },
      subjects: ielts,
      experience: 10,
      experiencePlus: true,
      qualification: "IELTS 8.0",
      office: "ulyDala",
      image: photo("marat"),
    },
  },
  {
    id: "kamila-berdenova",
    tone: "blue",
    profile: {
      name: { ru: "Камила Берденова", kz: "Камила Берденова", en: "Kamila Berdenova" },
      subjects: generalEnglish,
      experience: 9,
      experiencePlus: true,
      office: "ulyDala",
      image: photo("kamila-berdenova"),
    },
  },
  {
    id: "sulkei",
    tone: "pink",
    profile: {
      name: { ru: "Сулькей Куандыкова", kz: "Сулькей Куандыкова", en: "Sulkei Kuandykova" },
      subjects: ielts,
      experience: 7,
      experiencePlus: true,
      qualification: "IELTS 8.0",
      office: "ulyDala",
      image: photo("sulkei"),
    },
  },
  {
    id: "dinara",
    tone: "green",
    profile: {
      name: { ru: "Динара Махмет", kz: "Динара Махмет", en: "Dinara Makhmet" },
      subjects: generalEnglish,
      experience: 9,
      experiencePlus: true,
      office: "ulyDala",
      image: photo("dinara"),
    },
  },
  {
    id: "leila",
    tone: "blue",
    profile: {
      name: { ru: "Лейла Валеева", kz: "Лейла Валеева", en: "Leila Valeyeva" },
      subjects: ielts,
      experience: 3,
      experiencePlus: true,
      qualification: "IELTS 8.0",
      office: "ulyDala",
      image: photo("leila"),
    },
  },
  {
    id: "balzhan",
    tone: "pink",
    profile: {
      name: { ru: "Балжан", kz: "Балжан", en: "Balzhan" },
      subjects: chineseHsk,
      experience: 6,
      qualification: "HSK 5",
      office: "syganak",
      image: photo("balzhan"),
    },
  },
];

type TeachersCopy = {
  title: readonly [string, string];
  description: string;
  trial: string;
  bookWith: string;
  experience: string;
  years: Record<"one" | "few" | "other", string>;
  listLabel: string;
  officeLabel: string;
  offices: Record<TeacherOffice, string>;
};

export function experienceLabel(locale: Locale, years: number, plus: boolean, forms: TeachersCopy["years"]): string {
  const category = plus ? "other" : new Intl.PluralRules(locale === "kz" ? "kk" : locale).select(years);
  return `${years}${plus ? "+" : ""} ${category === "one" || category === "few" ? forms[category] : forms.other}`;
}

export const schoolTeachersContent: Record<Locale, TeachersCopy> = {
  ru: {
    title: ["Познакомьтесь с вашими", "преподавателями"],
    description: "Пройдите бесплатную диагностику, и мы подберём преподавателя и группу под ваш уровень",
    trial: "Узнать свой уровень",
    bookWith: "Узнать свой уровень. Преподаватель:",
    experience: "стаж",
    years: { one: "год", few: "года", other: "лет" },
    listLabel: "Преподаватели языковой школы",
    officeLabel: "Офис:",
    offices: { syganak: "Сыганак, 15 · Greenline", ulyDala: "Улы Дала, 41/6", seifullin: "Алматы, Сейфуллина, 575" },
  },
  kz: {
    title: ["Өз", "оқытушыларыңызбен танысыңыз"],
    description: "Тегін диагностикадан өтіңіз, біз деңгейіңізге сай оқытушы мен топ таңдаймыз",
    trial: "Деңгейді білу",
    bookWith: "Деңгейді білу. Оқытушы:",
    experience: "тәжірибе",
    years: { one: "жыл", few: "жыл", other: "жыл" },
    listLabel: "Тіл мектебінің оқытушылары",
    officeLabel: "Кеңсе:",
    offices: { syganak: "Сығанақ, 15 · Greenline", ulyDala: "Ұлы Дала, 41/6", seifullin: "Алматы, Сейфуллин, 575" },
  },
  en: {
    title: ["Meet your", "teachers"],
    description: "Take a free assessment and we will match you with a teacher and a group at your level",
    trial: "Find out your level",
    bookWith: "Find out your level. Teacher:",
    experience: "experience",
    years: { one: "year", few: "years", other: "years" },
    listLabel: "Language school teachers",
    officeLabel: "Office:",
    offices: { syganak: "Syganak 15 · Greenline", ulyDala: "41/6 Uly Dala St", seifullin: "Almaty, 575 Seifullin Ave" },
  },
};
