import type { Locale } from "@/i18n/config";

export const schoolProgramArtwork = [
  { id: "general", courseIndex: 0, badgeRow: 0, extension: "png", tone: "light" },
  { id: "academic", courseIndex: 1, badgeRow: 0, extension: "svg", tone: "blue" },
  { id: "business", courseIndex: 2, badgeRow: 0, extension: "png", tone: "navy" },
  { id: "speaking", courseIndex: 5, badgeRow: 1, extension: "svg", tone: "sage" },
  { id: "teens", courseIndex: 4, badgeRow: 0, extension: "png", tone: "pink" },
  { id: "kids", courseIndex: 3, badgeRow: 0, extension: "svg", tone: "rose" },
  { id: "chinese", courseIndex: 6, badgeRow: 0, extension: "svg", tone: "green" },
  { id: "intensive", courseIndex: 7, badgeRow: 1, extension: "svg", tone: "sky" },
] as const;

type ProgramsCopy = {
  title: readonly [string, string];
  trial: string;
  price: string;
  filterLabel: string;
  countLabel: string;
  descriptions: readonly string[];
};

export const schoolProgramsContent: Record<Locale, ProgramsCopy> = {
  ru: {
    title: ["Выберите свою", "программу"],
    trial: "Пробный урок",
    price: "Стоимость уточняется на консультации",
    filterLabel: "Категории программ",
    countLabel: "Программ:",
    descriptions: [
      "Английский для повседневного общения и уверенной речи",
      "Письмо, презентации и работа с текстами для учёбы за рубежом",
      "Английский для переговоров, переписки и собеседований",
      "Разговорная практика на интересные вам темы",
      "Английский для школы, общения и дальнейшей подготовки к экзаменам",
      "Изучение английского через игры, задания и общение",
      "Произношение, иероглифы и разговорная практика",
      "Более частые занятия, когда на подготовку мало времени",
    ],
  },
  kz: {
    title: ["Өзіңізге лайық", "бағдарламаны таңдаңыз"],
    trial: "Сынама сабақ",
    price: "Бағасы кеңес кезінде нақтыланады",
    filterLabel: "Бағдарлама санаттары",
    countLabel: "Бағдарламалар:",
    descriptions: [
      "Күнделікті қарым-қатынас пен сенімді сөйлеуге арналған ағылшын",
      "Шетелде оқуға арналған жазу, презентациялар және мәтіндермен жұмыс",
      "Келіссөздерге, хат алмасуға және сұхбаттарға арналған ағылшын",
      "Өзіңізге қызықты тақырыптарда сөйлесу тәжірибесі",
      "Мектепке, қарым-қатынасқа және емтихандарға дайындалуға арналған ағылшын",
      "Ағылшын тілін ойындар, тапсырмалар және қарым-қатынас арқылы үйрену",
      "Дыбыстау, иероглифтер және сөйлесу тәжірибесі",
      "Дайындыққа уақыт аз болғанда жиірек өтетін сабақтар",
    ],
  },
  en: {
    title: ["Choose your", "programme"],
    trial: "Trial lesson",
    price: "Pricing is confirmed during the consultation",
    filterLabel: "Programme categories",
    countLabel: "Programmes:",
    descriptions: [
      "English for everyday communication and confident speaking",
      "Writing, presentations and working with texts for studying abroad",
      "English for negotiations, correspondence and interviews",
      "Speaking practice on topics that interest you",
      "English for school, communication and future exam preparation",
      "Learn English through games, activities and communication",
      "Pronunciation, characters and speaking practice",
      "More frequent lessons when preparation time is limited",
    ],
  },
};
