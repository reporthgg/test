import type { Locale } from "@/i18n/config";

type LocalizedText = Record<Locale, string>;

export type CampsResult = {
  id: string;
  city: LocalizedText;
  image: string;
  /** Instagram post, reel or highlight about the trip; cards without it show no play button. */
  href?: string;
};

const text = (ru: string, kz: string, en: string): LocalizedText => ({ ru, kz, en });

// Card order and photos follow Figma 327:1324 (desktop) and 401:880 (mobile).
export const campsResults: readonly CampsResult[] = [
  {
    id: "shanghai",
    city: text("Шанхай", "Шанхай", "Shanghai"),
    image: "/camps/results/shanghai.jpg",
    href: "https://www.instagram.com/gscstudy.camps/p/DZuHeRjCB5H/",
  },
  {
    id: "los-angeles",
    city: text("Лос-Анджелес", "Лос-Анджелес", "Los Angeles"),
    image: "/camps/results/los-angeles.jpg",
    href: "https://www.instagram.com/stories/highlights/18099666755344942/",
  },
  {
    id: "dujiangyan",
    city: text("Дуцзянъянь", "Дуцзянъянь", "Dujiangyan"),
    image: "/camps/results/dujiangyan.jpg",
  },
  {
    id: "seoul",
    city: text("Сеул", "Сеул", "Seoul"),
    image: "/camps/results/seoul.jpg",
    href: "https://www.instagram.com/gscstudy/reel/DdmA8FAo9VU/",
  },
  {
    id: "china",
    city: text("Китай", "Қытай", "China"),
    image: "/camps/results/china.jpg",
    href: "https://www.instagram.com/gscstudy/reel/Ddq29pQo29s/",
  },
];

export const campsInstagram = "https://www.instagram.com/gscstudy.camps/";

type CampsResultsContent = {
  title: readonly [string, string];
  trip: string;
  description: readonly [string, string];
  more: string;
  previous: string;
  next: string;
  gallery: string;
  progress: string;
  watch: string;
};

export const campsResultsContent: Record<Locale, CampsResultsContent> = {
  ru: {
    title: ["Вот какими бывают", "каникулы с GSC"],
    trip: "Хочу в такую поездку",
    description: ["Больше результатов и историй", "студентов в нашем Instagram"],
    more: "Еще результаты",
    previous: "Предыдущая поездка",
    next: "Следующая поездка",
    gallery: "Поездки с GSC",
    progress: "Позиция в карусели поездок",
    watch: "Смотреть видео о поездке",
  },
  kz: {
    title: ["GSC-мен каникул", "міне, осындай"],
    trip: "Мен де барғым келеді",
    description: ["Студенттердің басқа нәтижелері", "мен оқиғалары біздің Instagram-да"],
    more: "Басқа нәтижелер",
    previous: "Алдыңғы сапар",
    next: "Келесі сапар",
    gallery: "GSC сапарлары",
    progress: "Сапарлар каруселіндегі орын",
    watch: "Сапар туралы бейнені көру",
  },
  en: {
    title: ["Holidays with GSC", "look like this"],
    trip: "I want a trip like this",
    description: ["More student results and stories", "on our Instagram"],
    more: "More results",
    previous: "Previous trip",
    next: "Next trip",
    gallery: "Trips with GSC",
    progress: "Position in the trips carousel",
    watch: "Watch the trip video",
  },
};
