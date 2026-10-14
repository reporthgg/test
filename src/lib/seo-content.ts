import type { Locale } from "@/i18n/config";
import type { PageSlug } from "@/lib/page-content";

export type SeoCopy = { title: string; description: string };

export type SeoPage = PageSlug | "tests";

export const seoPaths: Record<SeoPage, string> = {
  home: "/",
  school: "/school",
  exams: "/exams",
  abroad: "/abroad",
  camps: "/camps",
  tests: "/tests",
  about: "/about",
};

export const seoCopy: Record<SeoPage, Record<Locale, SeoCopy>> = {
  home: {
    ru: {
      title: "GSC Study: английский, IELTS, SAT и учёба за рубежом",
      description: "С 2011 года: языковые курсы, подготовка к IELTS и Digital SAT, поступление в зарубежные вузы. Центры GSC Study в Астане и Алматы, бесплатная диагностика.",
    },
    kz: {
      title: "GSC Study: ағылшын, IELTS, SAT және шетелде оқу",
      description: "2011 жылдан бері: тіл курстары, IELTS және Digital SAT емтихандарына дайындық, шетелдік университеттерге түсу. Астана мен Алматыдағы орталықтар, тегін диагностика.",
    },
    en: {
      title: "GSC Study: English, IELTS, SAT and study abroad",
      description: "Since 2011: language courses, IELTS and Digital SAT preparation, and admission to universities abroad. GSC Study centres in Astana and Almaty, free assessment.",
    },
  },
  school: {
    ru: {
      title: "Курсы английского A1-C2 в Астане и Алматы | GSC Study",
      description: "Общий, академический, деловой и детский английский от A1 до C2. Группы до 8 человек, занятия в центре или онлайн. Бесплатная диагностика уровня.",
    },
    kz: {
      title: "Ағылшын тілі курстары A1-C2 Астана мен Алматыда | GSC Study",
      description: "Жалпы, академиялық, іскерлік және балаларға арналған ағылшын тілі A1-ден C2-ге дейін. Топта 8 адамға дейін, орталықта немесе онлайн. Тегін диагностика.",
    },
    en: {
      title: "English courses A1-C2 in Astana and Almaty | GSC Study",
      description: "General, academic, business and kids' English from A1 to C2. Groups of up to 8 students, at a centre or online. Free level assessment.",
    },
  },
  exams: {
    ru: {
      title: "Подготовка к IELTS и Digital SAT | GSC Study",
      description: "Подготовка к IELTS и Digital SAT с бесплатной диагностикой: разбор ответов, план до нужного балла и пробные тесты. Средний балл IELTS наших студентов 7.0.",
    },
    kz: {
      title: "IELTS және Digital SAT емтихандарына дайындық | GSC Study",
      description: "Тегін диагностикамен IELTS және Digital SAT-қа дайындық: жауаптарды талдау, қажетті балға дейінгі жоспар және сынама тесттер. Студенттеріміздің орташа IELTS балы 7.0.",
    },
    en: {
      title: "IELTS and Digital SAT preparation | GSC Study",
      description: "IELTS and Digital SAT preparation with a free diagnostic: answer review, a plan to your target score and mock tests. Our students' average IELTS score is 7.0.",
    },
  },
  abroad: {
    ru: {
      title: "Поступление в зарубежные вузы 25+ стран | GSC Study",
      description: "Подбор университета под оценки, интересы и бюджет: Великобритания, Германия, Канада, ОАЭ, США. Документы, заявки и связь с вузом. Первая консультация бесплатно.",
    },
    kz: {
      title: "Шетелдік университеттерге түсу: 25+ ел | GSC Study",
      description: "Университетті бағаңа, қызығушылығыңа және бюджетіңе сай таңдаймыз: Ұлыбритания, Германия, Канада, БАӘ, АҚШ. Құжаттар, өтінімдер, ЖОО-мен байланыс. Алғашқы кеңес тегін.",
    },
    en: {
      title: "University admission abroad, 25+ countries | GSC Study",
      description: "Universities matched to your grades, interests and budget: UK, Germany, Canada, UAE, USA. We handle documents and applications. Free first consultation.",
    },
  },
  camps: {
    ru: {
      title: "Кампус-туры и лагеря за рубежом, 12-17 лет | GSC Study",
      description: "Кампус-тур по Китаю и языковые лагеря для школьников 12-17 лет: университеты, английский, экскурсии, проживание и куратор GSC Study от вылета до возвращения.",
    },
    kz: {
      title: "Шетелдегі кампус-турлар мен лагерьлер, 12-17 жас | GSC Study",
      description: "12-17 жастағы оқушыларға Қытайдағы кампус-тур және тіл лагерьлері: университеттер, ағылшын тілі, экскурсиялар, тұру және ұшудан оралғанға дейін GSC Study жетекшісі.",
    },
    en: {
      title: "Campus tours and camps abroad, ages 12-17 | GSC Study",
      description: "A campus tour of China and language camps for students aged 12-17: universities, English, excursions, accommodation and a GSC Study group leader from departure to return.",
    },
  },
  tests: {
    ru: {
      title: "Онлайн-тесты уровня английского, IELTS и SAT | GSC Study",
      description: "Бесплатные онлайн-тесты: английский для взрослых и детей, IELTS и SAT. Узнайте свой уровень, письменные задания проверяет преподаватель.",
    },
    kz: {
      title: "Ағылшын, IELTS және SAT онлайн деңгей тесттері | GSC Study",
      description: "Тегін онлайн-тесттер: ересектер мен балаларға арналған ағылшын тілі, IELTS және SAT. Деңгейіңізді біліңіз, жазбаша тапсырмаларды оқытушы тексереді.",
    },
    en: {
      title: "Online English, IELTS and SAT level tests | GSC Study",
      description: "Free online tests: English for adults and kids, IELTS and SAT. Find out your level, and a teacher reviews your written tasks.",
    },
  },
  about: {
    ru: {
      title: "О компании GSC Study: образование без границ с 2011 года",
      description: "GSC Study с 2011 года помогает учить языки, готовиться к экзаменам и поступать в зарубежные вузы. 15 000+ студентов, 25+ стран, центры в Астане и Алматы.",
    },
    kz: {
      title: "GSC Study туралы: 2011 жылдан бері шекарасыз білім",
      description: "GSC Study 2011 жылдан бері тіл үйренуге, емтиханға дайындалуға және шетелдік ЖОО-ға түсуге көмектеседі. 15 000+ студент, 25+ ел, Астана мен Алматыдағы орталықтар.",
    },
    en: {
      title: "About GSC Study: education without borders since 2011",
      description: "Since 2011, GSC Study has helped students learn languages, prepare for exams and enter universities abroad. 15,000+ students, 25+ countries, centres in Astana and Almaty.",
    },
  },
};

export const breadcrumbLabels: Record<SeoPage, Record<Locale, string>> = {
  home: { ru: "Главная", kz: "Басты бет", en: "Home" },
  school: { ru: "Языковая школа", kz: "Тіл мектебі", en: "Language school" },
  exams: { ru: "Экзамены", kz: "Емтихандар", en: "Exams" },
  abroad: { ru: "За рубеж", kz: "Шетелде оқу", en: "Study abroad" },
  camps: { ru: "Лагеря", kz: "Лагерьлер", en: "Camps" },
  tests: { ru: "Тесты", kz: "Тесттер", en: "Tests" },
  about: { ru: "О нас", kz: "Біз туралы", en: "About us" },
};

export const testSeoCopy: Record<Locale, {
  title: (name: string) => string;
  description: (name: string, summary: string, duration: string) => string;
}> = {
  ru: {
    title: (name) => `${name}: бесплатный онлайн-тест | GSC Study`,
    description: (name, summary, duration) => `Бесплатный онлайн-тест ${name} от GSC Study: ${summary}, ${duration}. Пройдите тест на сайте и узнайте свой результат.`,
  },
  kz: {
    title: (name) => `${name}: тегін онлайн-тест | GSC Study`,
    description: (name, summary, duration) => `GSC Study ұсынатын ${name} тегін онлайн-тесті: ${summary}, ${duration}. Тестті сайтта тапсырып, нәтижеңізді біліңіз.`,
  },
  en: {
    title: (name) => `${name}: free online test | GSC Study`,
    description: (name, summary, duration) => `Free ${name} online test by GSC Study: ${summary}, ${duration}. Take the test on the website and see your result.`,
  },
};

export const thankYouSeoCopy: Record<Locale, SeoCopy> = {
  ru: { title: "Спасибо! | GSC Study", description: "Заявка отправлена. Менеджер GSC Study свяжется с вами." },
  kz: { title: "Рахмет! | GSC Study", description: "Өтінім жіберілді. GSC Study менеджері сізбен байланысады." },
  en: { title: "Thank you! | GSC Study", description: "Your request has been sent. A GSC Study manager will contact you." },
};

export const notFoundCopy: Record<Locale, {
  title: string;
  heading: string;
  text: string;
  home: string;
  tests: string;
}> = {
  ru: {
    title: "Страница не найдена | GSC Study",
    heading: "Страница не найдена",
    text: "Возможно, ссылка устарела или в адресе есть опечатка. Перейдите на главную или выберите программу в меню.",
    home: "На главную",
    tests: "Пройти тест уровня",
  },
  kz: {
    title: "Бет табылмады | GSC Study",
    heading: "Бет табылмады",
    text: "Сілтеме ескірген немесе мекенжайда қате болуы мүмкін. Басты бетке өтіңіз немесе мәзірден бағдарламаны таңдаңыз.",
    home: "Басты бетке",
    tests: "Деңгейді анықтау",
  },
  en: {
    title: "Page not found | GSC Study",
    heading: "Page not found",
    text: "The link may be out of date or the address may contain a typo. Go to the home page or choose a programme from the menu.",
    home: "Go to home page",
    tests: "Check your level",
  },
};
