import type { Locale } from "@/i18n/config";

type LocalizedText = Record<Locale, string>;
/** Plaque widths from Figma: desktop and, when it differs, mobile. Longer translations still grow. */
type StoryBadge = { text: LocalizedText; color: "blue" | "pink" | "green"; width: number; mobileWidth?: number; arrow?: boolean };
type StoryCaption = Record<Locale, { before: string; strong: string; after: string }>;

export type StudentStory = {
  id: string;
  name: LocalizedText;
  image: string;
  href: string;
  badges: readonly StoryBadge[];
  readLabel?: LocalizedText;
  caption?: StoryCaption;
};

const text = (ru: string, kz: string, en: string): LocalizedText => ({ ru, kz, en });
const ielts8: StoryBadge = { text: text("IELTS 8.0", "IELTS 8.0", "IELTS 8.0"), color: "pink", width: 100 };
const nyu: StoryBadge = { text: text("NYU Shanghai", "NYU Shanghai", "NYU Shanghai"), color: "blue", width: 130 };
const grant: StoryBadge = { text: text("100% грант", "100% грант", "Full scholarship"), color: "pink", width: 110, mobileWidth: 100 };

export const studentStories: readonly StudentStory[] = [
  {
    id: "aminka",
    name: text("Аминка-витаминка", "Аминка-витаминка", "Aminka Vitaminka"),
    image: "/landing/stories/aminka.jpg",
    href: "https://www.instagram.com/aminokka/reel/C2M_OKVIEad/?hl=en",
    badges: [nyu, ielts8, { text: text("IELTS 7.5 за два месяца", "Екі айда IELTS 7.5", "IELTS 7.5 in two months"), color: "green", width: 195, mobileWidth: 190 }],
    caption: {
      ru: { before: "", strong: "6,4 млн", after: " подписчиков на YouTube" },
      kz: { before: "YouTube-та ", strong: "6,4 млн", after: " жазылушы" },
      en: { before: "", strong: "6.4M", after: " subscribers on YouTube" },
    },
  },
  {
    id: "imangali",
    name: text("Имангали", "Иманғали", "Imangali"),
    image: "/landing/stories/imangali.png",
    href: "https://www.instagram.com/gscastana/p/DX1JcgajGq6/?hl=en",
    badges: [nyu, grant],
    readLabel: text("Читать историю Имангали", "Иманғалидың оқиғасын оқу", "Read Imangali’s story"),
  },
  {
    id: "diar",
    name: text("Диар", "Диар", "Diar"),
    image: "/landing/stories/diar.png",
    href: "https://www.instagram.com/gscastana/p/DbX87f2DKYt/?hl=en",
    badges: [
      { text: text("IELTS 7.5", "IELTS 7.5", "IELTS 7.5"), color: "pink", width: 100 },
      { text: text("за 2 месяца", "2 айда", "in 2 months"), color: "blue", width: 130 },
    ],
    readLabel: text("Читать историю Диара", "Диардың оқиғасын оқу", "Read Diar’s story"),
  },
  {
    id: "vlad",
    name: text("Влад", "Влад", "Vlad"),
    image: "/landing/stories/vlad.png",
    href: "https://www.instagram.com/gscastana/reel/DRO28x2DOIA/?hl=en",
    badges: [
      { text: text("С A1", "A1-ден", "From A1"), color: "pink", width: 130, mobileWidth: 140, arrow: true },
      { text: text("к 8 классу", "8-сыныпқа дейін", "by Grade 8"), color: "green", width: 110, mobileWidth: 130 },
    ],
  },
  {
    id: "amir",
    name: text("Амир", "Әмір", "Amir"),
    image: "/landing/stories/amir.png",
    href: "https://www.instagram.com/gsc.greenline/reel/DRRYNBxDep6/?hl=en",
    badges: [ielts8],
  },
  {
    id: "kalima",
    name: text("Калима", "Кәлима", "Kalima"),
    image: "/landing/stories/kalima.png",
    href: "https://www.instagram.com/gscstudy.camps/p/DZ-DbLEiLnc/?hl=en",
    badges: [
      { text: text("Woosong University", "Woosong University", "Woosong University"), color: "blue", width: 175 },
      { text: text("Южная Корея", "Оңтүстік Корея", "South Korea"), color: "pink", width: 130 },
    ],
    readLabel: text("Читать историю Калимы", "Кәлиманың оқиғасын оқу", "Read Kalima’s story"),
  },
  {
    id: "zhanel",
    name: text("Жанель", "Жанель", "Zhanel"),
    image: "/landing/stories/zhanel.png",
    href: "https://www.instagram.com/zhanel_niyazbek/reel/DbvSWqkyzs_/?hl=en",
    badges: [
      { text: text("Учёба в UWC", "UWC-де оқу", "Studying at UWC"), color: "blue", width: 120, mobileWidth: 130 },
      { text: text("Сингапур", "Сингапур", "Singapore"), color: "pink", width: 100 },
    ],
  },
  {
    id: "baimyrza",
    name: text("Баймырза", "Баймырза", "Baimyrza"),
    image: "/landing/stories/baimyrza.png",
    href: "https://www.instagram.com/p/DSR7a4OCNGM/",
    badges: [nyu, grant],
  },
  {
    id: "nursultan",
    name: text("Нурсултан", "Нұрсұлтан", "Nursultan"),
    image: "/landing/stories/nursultan.png",
    href: "https://www.instagram.com/p/DEC-uQMNPh3/",
    badges: [ielts8],
  },
  {
    id: "saida",
    name: text("Саида", "Саида", "Saida"),
    image: "/landing/stories/saida.png",
    href: "https://www.instagram.com/p/DX0TyQVTEGH/?hl=en",
    badges: [ielts8],
  },
  {
    id: "dilyara",
    name: text("Диляра", "Диляра", "Dilyara"),
    image: "/landing/stories/dilyara.jpg",
    href: "https://www.instagram.com/reel/DdTwMW-Or8W/",
    badges: [
      { text: text("IELTS 7.0", "IELTS 7.0", "IELTS 7.0"), color: "pink", width: 100 },
      { text: text("с B2 за 1,5 месяца", "B2-ден 1,5 айда", "From B2 in 1.5 months"), color: "green", width: 170 },
    ],
  },
  {
    id: "dilnaz",
    name: text("Дильназ", "Дильназ", "Dilnaz"),
    image: "/landing/stories/dilnaz.jpg",
    href: "https://www.instagram.com/reel/DeUJGVNMxFB/",
    badges: [{ text: text("B2+ в 14 лет", "14 жаста B2+", "B2+ at 14"), color: "blue", width: 130 }],
  },
  {
    id: "adiya",
    name: text("Адия", "Адия", "Adiya"),
    image: "/landing/stories/adiya.jpg",
    href: "https://www.instagram.com/p/DZAkrH-DqAj/?img_index=3",
    badges: [{ text: text("Китайский язык", "Қытай тілі", "Chinese"), color: "pink", width: 150 }],
    readLabel: text("Читать историю Адии", "Адияның оқиғасын оқу", "Read Adiya’s story"),
  },
  {
    id: "insar",
    name: text("Инсар", "Инсар", "Insar"),
    image: "/landing/stories/insar.jpg",
    href: "https://www.instagram.com/p/DXweXRTkxSE/?img_index=3",
    badges: [{ text: text("Китайский язык", "Қытай тілі", "Chinese"), color: "green", width: 150 }],
    readLabel: text("Читать историю Инсара", "Инсардың оқиғасын оқу", "Read Insar’s story"),
  },
];

export const admissionLetters = [
  { id: "queen-mary", university: "Queen Mary University of London / Kaplan International College London", mobileOrder: 3 },
  { id: "birmingham", university: "University of Birmingham Dubai", mobileOrder: 2 },
  { id: "glion", university: "Glion Institute of Higher Education", mobileOrder: 1 },
  { id: "wollongong", university: "University of Wollongong in Dubai", mobileOrder: 4 },
  { id: "rit", university: "Rochester Institute of Technology Dubai", mobileOrder: 5 },
] as const;

/** Figma geometry in px: [cell width, logo x, logo y, logo width, logo height]. Cells are 88px high on desktop and 50px on mobile. */
type LogoLayout = readonly [number, number, number, number, number];
export type UniversityLogo = { file: string; name: string; desktop: LogoLayout; mobile: LogoLayout };

export const universityLogos: readonly UniversityLogo[] = [
  { file: "ubc.svg", name: "The University of British Columbia", desktop: [245, 8, 19, 229, 51], mobile: [140, 4.6, 10.9, 131.8, 29.2] },
  { file: "taylors.svg", name: "Taylor's University", desktop: [200, 23.3, 15.7, 151.5, 56], mobile: [110, 11.4, 9, 87.3, 32] },
  { file: "curtin.png", name: "Curtin University", desktop: [100, 19, 14, 60, 60], mobile: [55, 9.9, 8, 34.4, 34.4] },
  { file: "amsterdam.svg", name: "University of Amsterdam", desktop: [245, 23.3, 18, 198.4, 52], mobile: [140, 13.4, 10.3, 113.9, 29.8] },
  { file: "boston.svg", name: "Boston University", desktop: [190, 27, 14, 134, 60], mobile: [105, 13.5, 8, 77, 34.4] },
  { file: "ucl.svg", name: "University College London", desktop: [190, 22.5, 24, 142.9, 40], mobile: [105, 10.9, 13.8, 82, 23] },
  { file: "kings-college-london.svg", name: "King's College London", desktop: [125, 23, 14, 79, 60], mobile: [65, 10.2, 8, 45.4, 34.4] },
  { file: "upenn.svg", name: "University of Pennsylvania", desktop: [103, 17, 14, 69, 60], mobile: [65, 12.8, 8, 39.7, 34.3] },
  { file: "bristol.svg", name: "University of Bristol", desktop: [245, 29, 17, 187, 54], mobile: [140, 16.6, 9.8, 107.1, 31.1] },
  { file: "deakin.png", name: "Deakin University", desktop: [125, 28.5, 9, 69, 70], mobile: [71, 16.2, 5.1, 39.2, 39.8] },
  { file: "leicester.svg", name: "University of Leicester", desktop: [245, 10, 14, 225, 60], mobile: [140, 5.7, 8, 129.1, 34.4] },
  { file: "harbin.svg", name: "Harbin Institute of Technology", desktop: [245, 0, 0, 245, 88], mobile: [139.3, 0, 0, 139.3, 50] },
  { file: "stony-brook.svg", name: "Stony Brook University", desktop: [245, 8, 20, 229, 48], mobile: [140, 4.6, 11.5, 131.4, 27.6] },
  { file: "auburn.svg", name: "Auburn University", desktop: [245, 0, 0, 245, 88], mobile: [139.3, 0, 0, 139.3, 50] },
  { file: "nazarbayev.svg", name: "Nazarbayev University", desktop: [245, 24.8, 21.5, 195.7, 45.9], mobile: [140, 14.2, 12.2, 111.8, 26.1] },
  { file: "kimep.svg", name: "KIMEP University", desktop: [217, 30, 14, 158, 60], mobile: [110, 10.2, 8, 90.8, 34.4] },
  { file: "purdue.svg", name: "Purdue University", desktop: [245, 17, 25, 210, 38], mobile: [140, 9.8, 14.4, 120.2, 21.9] },
  { file: "sfu.svg", name: "Simon Fraser University", desktop: [150, 0, 0, 150, 88], mobile: [86, 0, 0, 86, 50] },
  { file: "rutgers.svg", name: "Rutgers University", desktop: [245, 0, 0, 245, 88], mobile: [139.3, 0, 0, 139.3, 50] },
  { file: "shanghai-jiao-tong.svg", name: "Shanghai Jiao Tong University", desktop: [245, 0, 0, 245, 88], mobile: [139.3, 0, 0, 139.3, 50] },
  { file: "buffalo.svg", name: "University at Buffalo", desktop: [127, 0, 0, 127, 88], mobile: [72, 0, 0, 72, 50] },
  { file: "seoul-national.svg", name: "Seoul National University", desktop: [111, 0, 0, 111, 88], mobile: [63, 0, 0, 63, 50] },
  { file: "manchester.svg", name: "The University of Manchester", desktop: [207, 0, 0, 207, 88], mobile: [117, 0, 0, 117, 50] },
  { file: "swansea.svg", name: "Swansea University", desktop: [141, 0, 0, 141, 88], mobile: [80.2, 0, 0, 80.2, 50] },
  { file: "south-carolina.svg", name: "University of South Carolina", desktop: [245, 6.3, 21, 231.3, 46], mobile: [140, 3.6, 12.1, 132.8, 26.4] },
  { file: "la-trobe.svg", name: "La Trobe University", desktop: [245, 33, 14, 178, 60], mobile: [112, 4.9, 8, 102.1, 34.5] },
  { file: "brunel.svg", name: "Brunel University London", desktop: [105, 0, 0, 105, 88], mobile: [60, 0, 0, 60, 50] },
  { file: "griffith.svg", name: "Griffith University", desktop: [245, 14, 22, 218, 45.1], mobile: [140, 8, 12.6, 124.6, 26] },
  { file: "toronto.png", name: "University of Toronto", desktop: [93, 9, 6, 76, 76], mobile: [52, 4.2, 3.4, 43.6, 43.6] },
  { file: "wollongong-dubai.png", name: "University of Wollongong in Dubai", desktop: [180, 11.5, -32.5, 157, 157], mobile: [100, 4.6, -18.7, 90.1, 90.1] },
  { file: "rit-dubai.png", name: "Rochester Institute of Technology Dubai", desktop: [160, 17.3, 12.5, 125.4, 63], mobile: [90, 8.9, 7.2, 72, 36.1] },
  { file: "birmingham-dubai.png", name: "University of Birmingham Dubai", desktop: [180, 4, -42, 172.1, 172.1], mobile: [100, 0.3, -24.1, 98.8, 98.8] },
  { file: "murdoch.png", name: "Murdoch University", desktop: [180, 13.5, 28.3, 153, 31.4], mobile: [100, 5.7, 16.2, 87.8, 18] },
  { file: "glion.png", name: "Glion Institute of Higher Education", desktop: [180, 9.7, 21.1, 160.6, 47.8], mobile: [100, 3.6, 12.1, 92.2, 27.4] },
  { file: "les-roches.png", name: "Les Roches", desktop: [150, 19, 2, 112.1, 84.1], mobile: [86, 10.9, 1.1, 64.3, 48.2] },
  { file: "queen-mary.png", name: "Queen Mary University of London", desktop: [150, 4.1, 25.1, 141.8, 37.8], mobile: [86, 2.4, 14.4, 81.4, 21.7] },
  { file: "glasgow.png", name: "University of Glasgow", desktop: [150, 7.9, 24, 134.2, 39.9], mobile: [86, 4.5, 13.8, 77, 22.9] },
  { file: "fiu.png", name: "Florida International University", desktop: [150, 4, 31.3, 142.1, 25.4], mobile: [86, 2.3, 18, 81.6, 14.6] },
  { file: "manitoba.png", name: "University of Manitoba", desktop: [140, 13.9, 17.1, 111.3, 53.9], mobile: [80, 8, 9.8, 63.9, 30.9] },
  { file: "arizona-state.png", name: "Arizona State University", desktop: [120, 12, -4, 95.9, 95.9], mobile: [70, 7.9, -2.3, 55.1, 55.1] },
  { file: "apu.png", name: "Asia Pacific University of Technology and Innovation", desktop: [107, 7.4, 0, 93.3, 88], mobile: [60, 3.2, 0, 53.5, 50.5] },
  { file: "webster-geneva.png", name: "Webster University Geneva", desktop: [120, 17.3, 12.1, 85.4, 63.7], mobile: [70, 10.9, 7, 49, 36.6] },
  { file: "bologna.png", name: "University of Bologna", desktop: [100, 11.5, 5.5, 77, 77], mobile: [60, 7.6, 3.2, 44.2, 44.2] },
];

export const storiesContent = {
  ru: {
    dream: "Из мечты",
    into: "в",
    university: "университет",
    nextStory: "Следующая\nистория ваша\n😉",
    trial: "Пройти диагностику бесплатно",
    more: "Посмотреть еще",
    moreCases: "Посмотреть кейсы",
    fewerCases: "Свернуть кейсы",
    watch: "Смотреть в Instagram",
    admissions: "Поступления",
    abroad: "в зарубежные",
    universities: "университеты",
    previous: "Предыдущее письмо",
    next: "Следующее письмо",
    letter: "Письмо о поступлении",
    enlarge: "Открыть письмо",
    close: "Закрыть",
    gallery: "Письма о поступлении",
    universityList: "Куда поступили наши студенты",
  },
  kz: {
    dream: "Арманнан",
    into: "",
    university: "университетке",
    nextStory: "Келесі\nжетістік сіздікі\n😉",
    trial: "Тегін диагностикадан өту",
    more: "Тағы көру",
    moreCases: "Оқиғаларды көру",
    fewerCases: "Оқиғаларды жасыру",
    watch: "Instagram-да көру",
    admissions: "Шетелдік",
    abroad: "университеттерге",
    universities: "қабылдану",
    previous: "Алдыңғы хат",
    next: "Келесі хат",
    letter: "Қабылдау туралы хат",
    enlarge: "Хатты ашу",
    close: "Жабу",
    gallery: "Университетке қабылдау хаттары",
    universityList: "Студенттеріміз түскен университеттер",
  },
  en: {
    dream: "From a dream",
    into: "to",
    university: "university",
    nextStory: "Your story\ncould be next\n😉",
    trial: "Take the free assessment",
    more: "See more",
    moreCases: "See more stories",
    fewerCases: "Show fewer stories",
    watch: "Watch on Instagram",
    admissions: "Admissions",
    abroad: "to universities",
    universities: "around the world",
    previous: "Previous letter",
    next: "Next letter",
    letter: "Admission letter",
    enlarge: "Open letter",
    close: "Close",
    gallery: "University admission letters",
    universityList: "Where our students have been admitted",
  },
} satisfies Record<Locale, Record<string, string>>;
