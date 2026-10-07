import type { Locale } from "@/i18n/config";

export const campsSlideIds = ["campus", "winter", "summer"] as const;
export type CampsSlideId = (typeof campsSlideIds)[number];
export type CampsSlideIndex = 0 | 1 | 2;

export function getCampsSlideIndex(index: number): CampsSlideIndex {
  return ((index % campsSlideIds.length + campsSlideIds.length) % campsSlideIds.length) as CampsSlideIndex;
}

type HeroSlideCopy = {
  title: string;
  continuation?: string;
  lastLine: string;
  description: string;
  desktopDescriptionTail?: string;
  photoAlt: string;
};

type HeroCopy = {
  age: string;
  duration: string;
  primary: string;
  secondary: string;
  carousel: string;
  carouselRole: string;
  slideRole: string;
  slide: string;
  previous: string;
  next: string;
  pause: string;
  play: string;
  slides: readonly [HeroSlideCopy, HeroSlideCopy, HeroSlideCopy];
};

export const campsHeroContent: Record<Locale, HeroCopy> = {
  ru: {
    age: "12-17 лет",
    duration: "2-3 недели",
    primary: "Подобрать программу",
    secondary: "Как прошли прошлые поездки",
    carousel: "Поездки и лагеря GSC Study",
    carouselRole: "карусель",
    slideRole: "слайд",
    slide: "Слайд",
    previous: "Предыдущая поездка",
    next: "Следующая поездка",
    pause: "Приостановить смену слайдов",
    play: "Возобновить смену слайдов",
    slides: [
      {
        title: "Кампус-тур",
        lastLine: "по Китаю",
        description: "5 ведущих университетов Шанхая\nи Ханчжоу + Disneyland",
        photoAlt: "Замок Disneyland с фейерверками и небоскрёбы Шанхая.",
      },
      {
        title: "Встреть 2027",
        lastLine: "за рубежом",
        description: "Праздничные города, новые друзья и английский каждый день. Проведи зимние каникулы в путешествии с GSC Study",
        photoAlt: "Рождественская ёлка в Нью-Йорке и заснеженный Лондон с Биг-Беном.",
      },
      {
        title: "Лето 2027.",
        continuation: "Твоя история",
        lastLine: "за границей",
        description: "Исследуй новые города, знакомься с ребятами из разных стран и практикуй английский",
        desktopDescriptionTail: " на занятиях, экскурсиях и в общении",
        photoAlt: "Участница летней поездки GSC Study и панорама Нью-Йорка.",
      },
    ],
  },
  kz: {
    age: "12-17 жас",
    duration: "2-3 апта",
    primary: "Бағдарлама таңдау",
    secondary: "Өткен сапарлар қалай өтті",
    carousel: "GSC Study сапарлары мен лагерьлері",
    carouselRole: "карусель",
    slideRole: "слайд",
    slide: "Слайд",
    previous: "Алдыңғы сапар",
    next: "Келесі сапар",
    pause: "Слайд ауысуын тоқтату",
    play: "Слайд ауысуын жалғастыру",
    slides: [
      {
        title: "Кампус-туры",
        lastLine: "Қытайда",
        description: "Шанхай мен Ханчжоудағы\n5 жетекші университет + Disneyland",
        photoAlt: "Отшашумен көмкерілген Disneyland қамалы және Шанхайдың зәулім ғимараттары.",
      },
      {
        title: "2027 жылды",
        lastLine: "шетелде қарсы ал",
        description: "Мерекелік қалалар, жаңа достар және күн сайын ағылшын тілі. Қысқы демалысты GSC Study-мен саяхатта өткіз",
        photoAlt: "Нью-Йорктегі мерекелік шырша және қар басқан Лондондағы Биг-Бен.",
      },
      {
        title: "2027 жазы.",
        continuation: "Өз тарихың",
        lastLine: "шетелде",
        description: "Жаңа қалаларды таны, түрлі елдерден келген достар тап және ағылшын тілін жаттықтыр",
        desktopDescriptionTail: ": сабақта, экскурсияда және күнделікті қарым-қатынаста",
        photoAlt: "GSC Study жазғы сапарының қатысушысы және Нью-Йорк көрінісі.",
      },
    ],
  },
  en: {
    age: "Ages 12-17",
    duration: "2-3 weeks",
    primary: "Find a programme",
    secondary: "Explore our past trips",
    carousel: "GSC Study trips and camps",
    carouselRole: "carousel",
    slideRole: "slide",
    slide: "Slide",
    previous: "Previous trip",
    next: "Next trip",
    pause: "Pause slideshow",
    play: "Resume slideshow",
    slides: [
      {
        title: "Campus tour",
        lastLine: "in China",
        description: "5 leading universities in Shanghai\nand Hangzhou + Disneyland",
        photoAlt: "Fireworks over the Disneyland castle and Shanghai skyscrapers.",
      },
      {
        title: "Welcome 2027",
        lastLine: "abroad",
        description: "Festive cities, new friends and English every day. Spend your winter holidays travelling with GSC Study",
        photoAlt: "The Christmas tree in New York and a snowy London with Big Ben.",
      },
      {
        title: "Summer 2027.",
        continuation: "Your story",
        lastLine: "abroad",
        description: "Explore new cities, meet students from around the world and practise English",
        desktopDescriptionTail: " in classes, on excursions and in everyday conversations",
        photoAlt: "A GSC Study summer trip participant and the New York skyline.",
      },
    ],
  },
};
