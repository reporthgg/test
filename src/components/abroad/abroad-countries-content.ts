import type { Locale } from "@/i18n/config";

type LocalizedText = Record<Locale, string>;
type BadgeColor = "blue" | "pink" | "green";

export type AbroadCountry = {
  id: string;
  name: LocalizedText;
  image: { src: string; width: number; height: number; alt: LocalizedText };
  flag: { src: string; right: number; top: number };
  badges: readonly { text: LocalizedText; color: BadgeColor }[];
};

const text = (ru: string, kz: string, en: string): LocalizedText => ({ ru, kz, en });
const foundation = { text: text("Foundation", "Foundation", "Foundation"), color: "blue" as const };
const bachelor = { text: text("Бакалавриат", "Бакалавриат", "Bachelor's"), color: "pink" as const };

export const abroadCountries: readonly AbroadCountry[] = [
  {
    id: "uk",
    name: text("Великобритания", "Ұлыбритания", "United Kingdom"),
    image: {
      src: "/abroad/countries/uk.jpg",
      width: 810,
      height: 540,
      alt: text("Вестминстерский дворец и Биг-Бен в Лондоне", "Лондондағы Вестминстер сарайы мен Биг-Бен", "The Palace of Westminster and Big Ben in London"),
    },
    flag: { src: "/abroad/countries/flag-gb.png", right: -34.47, top: -31.72 },
    badges: [foundation, bachelor, { text: text("IELTS от 5.0", "IELTS 5.0+", "IELTS from 5.0"), color: "green" }],
  },
  {
    id: "germany",
    name: text("Германия", "Германия", "Germany"),
    image: {
      src: "/abroad/countries/germany.jpg",
      width: 718,
      height: 732,
      alt: text("Старая улица с фахверковыми домами", "Фахверк үйлері бар ескі көше", "An old street with half-timbered houses"),
    },
    flag: { src: "/abroad/countries/flag-de.png", right: -29.47, top: -31.72 },
    badges: [
      { text: text("Studienkolleg", "Studienkolleg", "Studienkolleg"), color: "blue" },
      bachelor,
      { text: text("Немецкий от B2", "Неміс тілі B2+", "German from B2"), color: "green" },
    ],
  },
  {
    id: "canada",
    name: text("Канада", "Канада", "Canada"),
    image: {
      src: "/abroad/countries/canada.jpg",
      width: 809,
      height: 540,
      alt: text("Вечерний Торонто с телебашней Си-Эн Тауэр", "Кешкі Торонто және Си-Эн Тауэр мұнарасы", "Toronto skyline with the CN Tower at dusk"),
    },
    flag: { src: "/abroad/countries/flag-ca.png", right: -24.47, top: -31.72 },
    badges: [bachelor, { text: text("IELTS от 6.5", "IELTS 6.5+", "IELTS from 6.5"), color: "green" }],
  },
  {
    id: "uae",
    name: text("ОАЭ", "БАӘ", "UAE"),
    image: {
      src: "/abroad/countries/uae.jpg",
      width: 718,
      height: 1077,
      alt: text("Отель Бурдж-эль-Араб в Дубае", "Дубайдағы Бурдж әл-Араб қонақүйі", "The Burj Al Arab hotel in Dubai"),
    },
    flag: { src: "/abroad/countries/flag-ae.png", right: -34.47, top: -28 },
    badges: [
      foundation,
      bachelor,
      { text: text("IELTS от 5.5 на Foundation", "Foundation үшін IELTS 5.5+", "IELTS from 5.5 for Foundation"), color: "green" },
    ],
  },
  {
    id: "usa",
    name: text("США", "АҚШ", "USA"),
    image: {
      src: "/abroad/countries/usa.jpg",
      width: 718,
      height: 1077,
      alt: text("Статуя Свободы в Нью-Йорке", "Нью-Йорктегі Бостандық мүсіні", "The Statue of Liberty in New York"),
    },
    flag: { src: "/abroad/countries/flag-us.png", right: -29.47, top: -28 },
    badges: [bachelor, { text: text("IELTS от 6.0", "IELTS 6.0+", "IELTS from 6.0"), color: "green" }],
  },
];

export const abroadDiscussFlags = {
  desktop: [
    { id: "kr", src: "/abroad/countries/button-flag-kr.png", left: 49.62, top: 133.76, size: 114.59 },
    { id: "it", src: "/abroad/countries/button-flag-it.png", left: 110.87, top: 160.88, size: 110.44 },
    { id: "cz", src: "/abroad/countries/button-flag-cz.png", left: 169.26, top: 128.12, size: 95.57 },
  ],
  mobile: [
    { id: "it", src: "/abroad/countries/button-flag-it-mobile.png", left: 96.72, top: 80.62, size: 57.36 },
    { id: "kr", src: "/abroad/countries/button-flag-kr-mobile.png", left: 120.49, top: 109.26, size: 46.02 },
    { id: "cz", src: "/abroad/countries/button-flag-cz-mobile.png", left: 143.58, top: 79.54, size: 42.13 },
  ],
} as const;

type AbroadCountriesContent = {
  title: readonly [string, string];
  discuss: string;
};

export const abroadCountriesContent: Record<Locale, AbroadCountriesContent> = {
  ru: { title: ["Помогаем поступать", "в вузы 25+ стран"], discuss: "Обсудить направление" },
  kz: { title: ["25+ елдің ЖОО-ларына", "түсуге көмектесеміз"], discuss: "Бағытты талқылау" },
  en: { title: ["We help you get into", "universities in 25+ countries"], discuss: "Discuss a destination" },
};
