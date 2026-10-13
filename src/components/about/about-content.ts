import type { Locale } from "@/i18n/config";

export type AboutContent = {
  heading: { lines: readonly string[]; accent: string; after?: string };
  stats: string;
  chapters: readonly [string, string, string];
  partnersList: string;
  photoAlts: {
    studying: string;
    campus: string;
    student: string;
    university: string;
    consultation: string;
    teacher: string;
    students: string;
  };
};

export const aboutContent: Record<Locale, AboutContent> = {
  ru: {
    heading: { lines: ["GSC Study:", "образование"], accent: "без границ" },
    stats: "GSC Study в цифрах",
    chapters: ["2011", "Как мы работаем", "Сегодня"],
    partnersList: "Аккредитации GSC Study",
    photoAlts: {
      studying: "Студенты GSC Study на занятии",
      campus: "Студентки на лужайке университетского кампуса",
      student: "Студентка GSC Study",
      university: "Здание зарубежного университета",
      consultation: "Консультация с куратором GSC Study",
      teacher: "Преподаватель в учебном центре GSC Study",
      students: "Студенты GSC Study",
    },
  },
  kz: {
    heading: { lines: ["GSC Study:"], accent: "шекарасыз", after: "білім" },
    stats: "GSC Study сандармен",
    chapters: ["2011", "Қалай жұмыс істейміз", "Бүгін"],
    partnersList: "GSC Study аккредитациялары",
    photoAlts: {
      studying: "GSC Study студенттері сабақта",
      campus: "Университет кампусының көгалындағы студенттер",
      student: "GSC Study студенті",
      university: "Шетел университетінің ғимараты",
      consultation: "GSC Study кураторымен кеңес",
      teacher: "GSC Study оқу орталығындағы оқытушы",
      students: "GSC Study студенттері",
    },
  },
  en: {
    heading: { lines: ["GSC Study:", "education"], accent: "without borders" },
    stats: "GSC Study in numbers",
    chapters: ["2011", "How we work", "Today"],
    partnersList: "GSC Study accreditations",
    photoAlts: {
      studying: "GSC Study students in class",
      campus: "Students on a university campus lawn",
      student: "A GSC Study student",
      university: "A university building abroad",
      consultation: "A consultation with a GSC Study advisor",
      teacher: "A teacher at a GSC Study learning centre",
      students: "GSC Study students",
    },
  },
};

export function splitTitle(text: string): [string, string] {
  const index = text.indexOf(" ");
  return index === -1 ? [text, ""] : [text.slice(0, index), text.slice(index + 1)];
}
