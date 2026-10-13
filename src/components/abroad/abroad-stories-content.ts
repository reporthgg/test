import type { Locale } from "@/i18n/config";
import { studentStories } from "@/components/landing/stories-content";

type LocalizedText = Record<Locale, string>;

export type AbroadStoryCrop = { width: string; height: string; left: string; top: string };

export type AbroadStory = {
  id: string;
  university: string;
  result: LocalizedText;
  label: LocalizedText;
  image: { src: string; width: number; height: number };
  crop?: AbroadStoryCrop;
  href?: string;
};

const text = (ru: string, kz: string, en: string): LocalizedText => ({ ru, kz, en });
const homeStoryHref = (id: string): string | undefined => studentStories.find((story) => story.id === id)?.href;
const fullGrant = text("100% грант", "100% грант", "Full scholarship");

export const abroadStories: readonly AbroadStory[] = [
  {
    id: "imangali",
    university: "NYU Shanghai",
    result: fullGrant,
    label: text("Узнать историю Имангали", "Иманғалидың оқиғасымен танысу", "Read Imangali’s story"),
    image: { src: "/abroad/stories/imangali.jpg", width: 496, height: 879 },
    crop: { width: "104.08%", height: "125.42%", left: "-2.61%", top: "-12.71%" },
    href: homeStoryHref("imangali"),
  },
  {
    id: "baimyrza",
    university: "NYU Shanghai",
    result: fullGrant,
    label: text("Узнать историю Баймырзы", "Баймырзаның оқиғасымен танысу", "Read Baimyrza’s story"),
    image: { src: "/abroad/stories/baimyrza.jpg", width: 500, height: 895 },
    crop: { width: "100%", height: "121.72%", left: "0%", top: "-0.03%" },
    href: homeStoryHref("baimyrza"),
  },
  {
    id: "amirlan",
    university: "NYU Shanghai",
    result: text("80% грант", "80% грант", "80% scholarship"),
    label: text("Узнать историю Амирлана", "Әмірланның оқиғасымен танысу", "Read Amirlan’s story"),
    image: { src: "/abroad/stories/amirlan.jpg", width: 513, height: 913 },
    crop: { width: "100%", height: "121.02%", left: "0%", top: "-0.06%" },
  },
  {
    id: "rakhat",
    university: "University of Birmingham",
    result: text("Поступил", "Түсті", "Admitted"),
    label: text("Узнать историю Рахата", "Рахаттың оқиғасымен танысу", "Read Rakhat’s story"),
    image: { src: "/abroad/stories/rakhat.jpg", width: 574, height: 1024 },
  },
];

type AbroadStoriesContent = {
  title: readonly [string, string];
  previous: string;
  next: string;
  gallery: string;
  progress: string;
  chances: string;
  review: string;
};

export const abroadStoriesContent: Record<Locale, AbroadStoriesContent> = {
  ru: {
    title: ["Следующая история", "может быть твоей"],
    previous: "Предыдущая история",
    next: "Следующая история",
    gallery: "Истории студентов",
    progress: "Прокрутка историй",
    chances: "Хочешь узнать свои шансы?",
    review: "Разобрать мой случай",
  },
  kz: {
    title: ["Келесі оқиға", "сенікі болуы мүмкін"],
    previous: "Алдыңғы оқиға",
    next: "Келесі оқиға",
    gallery: "Студенттердің оқиғалары",
    progress: "Оқиғаларды айналдыру",
    chances: "Мүмкіндігіңді білгің келе ме?",
    review: "Менің жағдайымды талдау",
  },
  en: {
    title: ["The next story", "could be yours"],
    previous: "Previous story",
    next: "Next story",
    gallery: "Student stories",
    progress: "Stories scroll position",
    chances: "Want to know your chances?",
    review: "Review my case",
  },
};
