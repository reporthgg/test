import type { Locale } from "@/i18n/config";

type LocalizedText = Record<Locale, string>;
type StoryBadge = { text: LocalizedText; color: "blue" | "pink" | "green"; arrow?: boolean };

export type StudentStory = {
  id: string;
  name: LocalizedText;
  image: string;
  href: string;
  badges: readonly StoryBadge[];
  readLabel?: LocalizedText;
  caption?: LocalizedText;
};

const text = (ru: string, kz: string, en: string): LocalizedText => ({ ru, kz, en });
const ielts8: StoryBadge = { text: text("IELTS 8.0", "IELTS 8.0", "IELTS 8.0"), color: "pink" };
const nyu: StoryBadge = { text: text("NYU Shanghai", "NYU Shanghai", "NYU Shanghai"), color: "blue" };
const grant: StoryBadge = { text: text("100% грант", "100% грант", "Full scholarship"), color: "pink" };

export const studentStories: readonly StudentStory[] = [
  {
    id: "aminka",
    name: text("Аминка-витаминка", "Аминка-витаминка", "Aminka Vitaminka"),
    image: "/landing/stories/aminka.jpg",
    href: "https://www.instagram.com/aminokka/reel/C2M_OKVIEad/?hl=en",
    badges: [nyu, ielts8, { text: text("IELTS 7.5 за два месяца", "Екі айда IELTS 7.5", "IELTS 7.5 in two months"), color: "green" }],
    caption: text("6,4 млн подписчиков на YouTube", "YouTube-та 6,4 млн жазылушы", "6.4M subscribers on YouTube"),
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
      { text: text("IELTS 7.5", "IELTS 7.5", "IELTS 7.5"), color: "pink" },
      { text: text("за 2 месяца", "2 айда", "in 2 months"), color: "blue" },
    ],
    readLabel: text("Читать историю Диара", "Диардың оқиғасын оқу", "Read Diar’s story"),
  },
  {
    id: "vlad",
    name: text("Влад", "Влад", "Vlad"),
    image: "/landing/stories/vlad.png",
    href: "https://www.instagram.com/gscastana/reel/DRO28x2DOIA/?hl=en",
    badges: [
      { text: text("С A1", "A1-ден", "From A1"), color: "pink", arrow: true },
      { text: text("к 8 классу", "8-сыныпқа дейін", "by Grade 8"), color: "green" },
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
      { text: text("Woosong University", "Woosong University", "Woosong University"), color: "blue" },
      { text: text("Южная Корея", "Оңтүстік Корея", "South Korea"), color: "pink" },
    ],
    readLabel: text("Читать историю Калимы", "Кәлиманың оқиғасын оқу", "Read Kalima’s story"),
  },
  {
    id: "zhanel",
    name: text("Жанель", "Жанель", "Zhanel"),
    image: "/landing/stories/zhanel.png",
    href: "https://www.instagram.com/zhanel_niyazbek/reel/DbvSWqkyzs_/?hl=en",
    badges: [
      { text: text("Учёба в UWC", "UWC-де оқу", "Studying at UWC"), color: "blue" },
      { text: text("Сингапур", "Сингапур", "Singapore"), color: "pink" },
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
];

export const admissionLetters = [
  { id: "queen-mary", university: "Queen Mary University of London / Kaplan International College London", mobileOrder: 3 },
  { id: "birmingham", university: "University of Birmingham Dubai", mobileOrder: 2 },
  { id: "glion", university: "Glion Institute of Higher Education", mobileOrder: 1 },
  { id: "wollongong", university: "University of Wollongong in Dubai", mobileOrder: 4 },
  { id: "rit", university: "Rochester Institute of Technology Dubai", mobileOrder: 5 },
] as const;

export const universityLogos = [
  { id: "uae", name: text("Объединённые Арабские Эмираты", "Біріккен Араб Әмірліктері", "United Arab Emirates") },
  { id: "rit", name: text("Rochester Institute of Technology", "Rochester Institute of Technology", "Rochester Institute of Technology") },
  { id: "wollongong", name: text("University of Wollongong in Dubai", "University of Wollongong in Dubai", "University of Wollongong in Dubai") },
  { id: "birmingham", name: text("University of Birmingham Dubai", "University of Birmingham Dubai", "University of Birmingham Dubai") },
  { id: "murdoch", name: text("Murdoch University", "Murdoch University", "Murdoch University") },
  { id: "swiss", name: text("Швейцария", "Швейцария", "Switzerland") },
] as const;

export const storiesContent = {
  ru: {
    dream: "Из мечты",
    into: "в",
    university: "университет",
    nextStory: "Следующая история ваша",
    trial: "Записаться на пробный урок",
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
    universityImage: "Зарубежные университеты",
  },
  kz: {
    dream: "Арманнан",
    into: "",
    university: "университетке",
    nextStory: "Келесі жетістік сіздікі",
    trial: "Сынақ сабағына жазылу",
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
    universityImage: "Шетелдік университеттер",
  },
  en: {
    dream: "From a dream",
    into: "to",
    university: "university",
    nextStory: "Your story could be next",
    trial: "Book a trial lesson",
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
    universityImage: "International universities",
  },
} satisfies Record<Locale, Record<string, string>>;
