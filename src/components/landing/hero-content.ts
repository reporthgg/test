import type { Locale } from "@/i18n/config";

type HeroSlide = {
  title: string;
  accent: string;
  description: string;
  primary: string;
  secondary?: string;
  photoAlt: string;
};

type HeroContent = {
  slides: [HeroSlide, HeroSlide, HeroSlide];
  diagnosticTitle: string;
  diagnosticText: string;
  diagnosticButton: string;
  since: string;
  year: string;
  previous: string;
  next: string;
  slide: string;
  carousel: string;
  pause: string;
  play: string;
  skip: string;
  nav: [string, string, string, string, string];
  consultation: string;
  menu: string;
  close: string;
  language: string;
  programs: string;
  company: string;
  contacts: string;
  about: string;
  centers: string;
  reviews: string;
  ielts: string;
  abroad: string;
  camps: string;
  callCenter: string;
  hours: string;
  weekdays: string;
  saturday: string;
};

export const heroContent: Record<Locale, HeroContent> = {
  ru: {
    slides: [
      {
        title: "Образование",
        accent: "без границ",
        description: "Языковые курсы, подготовка к международным экзаменам и поступление в зарубежные университеты",
        primary: "Подобрать программу",
        photoAlt: "Студенты GSC Study",
      },
      {
        title: "Английский для",
        accent: "ваших целей",
        description: "Подберите занятия по своему уровню: для общения, учёбы и международных экзаменов",
        primary: "Пройти тест уровня",
        secondary: "Узнать расписание",
        photoAlt: "Ученики языковой школы GSC Study",
      },
      {
        title: "Поступление за рубеж",
        accent: "с поддержкой экспертов",
        description: "От выбора страны и университета до подготовки и подачи документов",
        primary: "Записаться",
        secondary: "Консультация по поступлению",
        photoAlt: "Студенты программы поступления за рубеж",
      },
    ],
    diagnosticTitle: "Записаться на бесплатную диагностику",
    diagnosticText: "Эксперт разберёт ваш кейс, определит уровень языка и даст советы",
    diagnosticButton: "Попробовать бесплатно",
    since: "С 2011",
    year: "года",
    previous: "Предыдущий слайд",
    next: "Следующий слайд",
    slide: "Слайд",
    carousel: "Возможности GSC Study",
    pause: "Приостановить слайдер",
    play: "Продолжить слайдер",
    skip: "Перейти к содержимому",
    nav: ["Языковая школа", "Экзамены", "За рубеж", "Лагеря", "Центры"],
    consultation: "Консультация",
    menu: "Открыть меню",
    close: "Закрыть меню",
    language: "Язык сайта",
    programs: "Программы",
    company: "Компания",
    contacts: "Контакты",
    about: "О нас",
    centers: "Наши центры",
    reviews: "Отзывы",
    ielts: "Подготовка к IELTS",
    abroad: "Поступление за рубеж",
    camps: "Летние лагеря",
    callCenter: "Колл-центр:",
    hours: "Часы работы:",
    weekdays: "Пн-Пт 9:00-18:00",
    saturday: "Сб 10:00-15:00",
  },
  kz: {
    slides: [
      {
        title: "Шекарасыз",
        accent: "білім",
        description: "Тіл курстары, халықаралық емтихандарға дайындық және шетелдік университеттерге түсу",
        primary: "Бағдарлама таңдау",
        photoAlt: "GSC Study студенттері",
      },
      {
        title: "Мақсатыңызға сай",
        accent: "ағылшын тілі",
        description: "Қарым-қатынас, оқу және халықаралық емтихандар үшін деңгейіңізге сай сабақтарды таңдаңыз",
        primary: "Деңгейді анықтау",
        secondary: "Кестені білу",
        photoAlt: "GSC Study тіл мектебінің оқушылары",
      },
      {
        title: "Шетелге оқуға",
        accent: "сарапшылармен бірге",
        description: "Ел мен университетті таңдаудан құжаттарды дайындап, тапсыруға дейін",
        primary: "Жазылу",
        secondary: "Оқуға түсу бойынша кеңес",
        photoAlt: "Шетелге оқуға түсу бағдарламасының студенттері",
      },
    ],
    diagnosticTitle: "Тегін диагностикаға жазылыңыз",
    diagnosticText: "Сарапшы жағдайыңызды талдап, тіл деңгейіңізді анықтайды және кеңес береді",
    diagnosticButton: "Тегін байқап көру",
    since: "2011",
    year: "жылдан бері",
    previous: "Алдыңғы слайд",
    next: "Келесі слайд",
    slide: "Слайд",
    carousel: "GSC Study мүмкіндіктері",
    pause: "Слайдерді тоқтату",
    play: "Слайдерді жалғастыру",
    skip: "Мазмұнға өту",
    nav: ["Тіл мектебі", "Емтихандар", "Шетелде оқу", "Лагерьлер", "Орталықтар"],
    consultation: "Кеңес алу",
    menu: "Мәзірді ашу",
    close: "Мәзірді жабу",
    language: "Сайт тілі",
    programs: "Бағдарламалар",
    company: "Компания",
    contacts: "Байланыс",
    about: "Біз туралы",
    centers: "Орталықтарымыз",
    reviews: "Пікірлер",
    ielts: "IELTS-ке дайындық",
    abroad: "Шетелге оқуға түсу",
    camps: "Жазғы лагерьлер",
    callCenter: "Байланыс орталығы:",
    hours: "Жұмыс уақыты:",
    weekdays: "Дс-Жм 9:00-18:00",
    saturday: "Сб 10:00-15:00",
  },
  en: {
    slides: [
      {
        title: "Education",
        accent: "without borders",
        description: "Language courses, international exam preparation and admission to universities abroad",
        primary: "Find a programme",
        photoAlt: "GSC Study students",
      },
      {
        title: "English for",
        accent: "your goals",
        description: "Find classes for your level: for communication, studying and international exams",
        primary: "Check your level",
        secondary: "View the schedule",
        photoAlt: "Students at the GSC Study language school",
      },
      {
        title: "Study abroad",
        accent: "with expert support",
        description: "From choosing your country and university to preparing and submitting your application",
        primary: "Sign up",
        secondary: "Admissions consultation",
        photoAlt: "GSC Study university admissions students",
      },
    ],
    diagnosticTitle: "Book a free assessment",
    diagnosticText: "An expert will review your goals, assess your language level and offer advice",
    diagnosticButton: "Try it for free",
    since: "Since",
    year: "2011",
    previous: "Previous slide",
    next: "Next slide",
    slide: "Slide",
    carousel: "Explore GSC Study",
    pause: "Pause slideshow",
    play: "Resume slideshow",
    skip: "Skip to content",
    nav: ["Language school", "Exams", "Study abroad", "Camps", "Centres"],
    consultation: "Consultation",
    menu: "Open menu",
    close: "Close menu",
    language: "Website language",
    programs: "Programmes",
    company: "Company",
    contacts: "Contact us",
    about: "About us",
    centers: "Our centres",
    reviews: "Reviews",
    ielts: "IELTS preparation",
    abroad: "University admissions",
    camps: "Summer camps",
    callCenter: "Call centre:",
    hours: "Opening hours:",
    weekdays: "Mon-Fri 9:00-18:00",
    saturday: "Sat 10:00-15:00",
  },
};
