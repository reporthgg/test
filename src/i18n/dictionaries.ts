import type { Locale } from "./config";


// Словарь для «хрома» (шапка/футер/кнопки) и главной страницы.
// ru — источник; kz/en — перевод (машинно-качественный, вычитать).
const ru = {
  nav: {
    school: "Языковая школа",
    exams: "Экзамены",
    abroad: "За рубеж",
    camps: "Лагеря",
    centers: "Центры",
  },
  actions: {
    consult: "Консультация",
    tryLevelTest: "Пройти тест уровня",
    pickProgram: "Подобрать программу",
    seeCourses: "Смотреть курсы",
    schedule: "Узнать расписание",
    signUp: "Записаться",
    consultOnAdmission: "Консультация по поступлению",
    writeWhatsApp: "написать в WhatsApp",
    bubble: "Есть вопросы?",
  },
  hero: {
    slides: [
      {
        tag: "GSC Study",
        title1: "Образование",
        title2: "без границ",
        text: "Языковые курсы, подготовка к международным экзаменам и поступление в зарубежные университеты. Помогаем от первого теста уровня до зачисления.",
      },
      {
        tag: "Набор 2026",
        title1: "Старт групп",
        title2: "каждый месяц",
        text: "Группы формируем по результатам теста уровня, от A1 до C2. До восьми человек, чтобы говорил каждый.",
      },
      {
        tag: "Приёмная кампания",
        title1: "Поступление в вузы",
        title2: "25+ стран",
        text: "Подбираем университет под аттестат и бюджет, готовим документы и ведём до зачисления. Основные направления: Великобритания, Германия, Канада, ОАЭ, США.",
      },
    ],
    features: [
      "Группы до восьми человек, индивидуально или онлайн",
      "Тест уровня и пробный урок бесплатно",
      "Сопровождение до зачисления в университет",
    ],
    stats: [
      ["15 лет", "на рынке"],
      ["18 000+", "студентов отправлено за рубеж"],
      ["7.0", "средний балл IELTS"],
      ["30+", "стран поступления"],
    ],
  },
  leadForm: {
    title: "Записаться на пробный урок",
    subtitle: "Оставьте заявку, и менеджер свяжется с вами в ближайшее время.",
    name: "Имя",
    namePh: "Айгерим",
    city: "Город",
    cityChoose: "Выберите",
    cities: ["Алматы", "Астана", "Онлайн"],
    phone: "Телефон",
    consent: "Согласен(а) на обработку персональных данных.",
    submit: "Записаться",
    sending: "Отправляем…",
    faster: "Быстрее:",
    successTitle: "Заявка отправлена!",
    successText: "Менеджер свяжется с вами в ближайшее время.",
    error: "Что-то пошло не так. Попробуйте ещё раз или напишите в WhatsApp.",
  },
  directions: {
    eyebrow: "Направления",
    title: "Четыре направления GSC Study",
    text: "Помогаем выучить язык, подготовиться к экзаменам и подать документы в университет.",
    cards: [
      { title: "Языковая школа", text: "Английский от A1 до C2 и китайский язык. Общий, академический, деловой и детский форматы.", cta: "Смотреть курсы" },
      { title: "Экзамены", text: "Подготовка к IELTS и Digital SAT с пробными тестами и прогнозной оценкой до реального экзамена.", cta: "Подготовка к экзаменам" },
      { title: "За рубеж", text: "Подбор университета, подготовка документов и сопровождение до зачисления в вузы 25+ стран.", cta: "Программы за рубежом" },
      { title: "Лагеря", text: "Языковые смены для школьников 12-17 лет с сопровождающим от GSC Study. Лето 2026.", cta: "Смотреть лагеря" },
    ],
  },
  testsBlock: {
    eyebrow: "Тестирование",
    title: "Тесты на определение уровня",
    text: "Пройдите онлайн бесплатно и сразу узнайте свой уровень. Мы пришлём разбор и подберём программу.",
  },
  steps: {
    eyebrow: "Как начать",
    title: "Шаги к поступлению",
    items: [
      ["Консультация", "Определяем цели и уровень."],
      ["Подготовка", "Учим язык и сдаем экзамены."],
      ["Зачисление", "Подаем документы в вуз."],
    ],
  },
  reviews: {
    eyebrow: "Отзывы",
    title: "Что говорят студенты",
    items: [
      {
        text: "Сдал IELTS на 7.5 благодаря отличной подготовке! Преподаватели очень внимательны к деталям.",
        author: "Алихан, Астана",
        course: "Курс IELTS Academic",
        accent: false,
      },
      {
        text: "Поступила в Канаду, весь процесс прошел гладко. Помогли с выбором вуза и оформлением визы.",
        author: "Мадина, Алматы",
        course: "Поступление за рубеж",
        accent: true,
      },
      {
        text: "Отличные преподаватели и атмосфера. Подтянул английский с B1 до C1 за полгода интенсивных занятий.",
        author: "Данияр, Алматы",
        course: "Общий английский",
        accent: false,
      },
      {
        text: "Ребёнок в восторге от летнего лагеря! Практика языка каждый день плюс отличная культурная программа.",
        author: "Динара, Астана",
        course: "Летние лагеря",
        accent: true,
      },
    ],
  },
  offices: {
    eyebrow: "Контакты",
    title: "Наши центры",
    text: "Четыре учебных центра: три в Астане и один в Алматы. Или занимайтесь онлайн из любого города.",
    writeWhatsApp: "Написать в WhatsApp",
  },
  faq: {
    title: "Частые вопросы",
    items: [
      ["С какого возраста можно начать обучение?", "Мы принимаем детей с 6 лет на специальные детские программы."],
      ["Сколько длится курс подготовки к IELTS?", "Стандартный курс длится 2-3 месяца в зависимости от вашего текущего уровня."],
      ["Вы помогаете с визой?", "Да, мы оказываем полную визовую поддержку для наших студентов."],
    ],
  },
  trust: { title: "Аккредитации и партнёры" },
  sticky: { consult: "Консультация" },
  footer: {
    brandDesc: "С 2011 года помогаем учить языки, готовиться к экзаменам и поступать в зарубежные университеты.",
    programs: "Программы",
    company: "Компания",
    contacts: "Контакты",
    callCenter: "Колл-центр",
    email: "Email",
    hours: "Часы работы",
    rights: "© 2026 GSC Study. Все права защищены.",
    privacy: "Политика конфиденциальности",
    offer: "Публичная оферта",
    links: {
      langSchool: "Языковая школа",
      ielts: "Подготовка к IELTS",
      sat: "Digital SAT",
      abroad: "Поступление за рубеж",
      camps: "Летние лагеря",
      about: "О нас",
      centers: "Наши центры",
      reviews: "Отзывы",
    },
  },
};

type Dict = typeof ru;

const kz: Dict = {
  nav: {
    school: "Тіл мектебі",
    exams: "Емтихандар",
    abroad: "Шетелге",
    camps: "Лагерьлер",
    centers: "Орталықтар",
  },
  actions: {
    consult: "Кеңес алу",
    tryLevelTest: "Деңгей тестінен өту",
    pickProgram: "Бағдарлама таңдау",
    seeCourses: "Курстарды көру",
    schedule: "Кестені білу",
    signUp: "Жазылу",
    consultOnAdmission: "Түсу бойынша кеңес",
    writeWhatsApp: "WhatsApp-қа жазу",
    bubble: "Сұрақтарыңыз бар ма?",
  },
  hero: {
    slides: [
      {
        tag: "GSC Study",
        title1: "Шекарасыз",
        title2: "білім",
        text: "Тіл курстары, халықаралық емтихандарға дайындық және шетел университеттеріне түсу. Алғашқы деңгей тестінен қабылданғанға дейін көмектесеміз.",
      },
      {
        tag: "2026 жинағы",
        title1: "Топтар ашылады",
        title2: "ай сайын",
        text: "A1-ден C2-ге дейінгі топтарды деңгей тестінің нәтижесі бойынша құрамыз. Әркім сөйлесуі үшін сегіз адамға дейін.",
      },
      {
        tag: "Қабылдау науқаны",
        title1: "Жоғары оқу орындарына",
        title2: "25+ елде",
        text: "Университетті аттестат пен бюджетке қарай таңдаймыз, құжаттарды дайындап, қабылданғанға дейін алып жүреміз. Негізгі бағыттар: Ұлыбритания, Германия, Канада, БАӘ, АҚШ.",
      },
    ],
    features: [
      "Топтар сегіз адамға дейін, жеке немесе онлайн",
      "Деңгей тесті мен сынама сабақ тегін",
      "Университетке қабылданғанға дейін қолдау",
    ],
    stats: [
      ["15 жыл", "нарықта"],
      ["18 000+", "студент шетелге жіберілді"],
      ["7.0", "орташа IELTS балы"],
      ["30+", "түсу елдері"],
    ],
  },
  leadForm: {
    title: "Сынама сабаққа жазылу",
    subtitle: "Өтінім қалдырыңыз, менеджер жақын арада хабарласады.",
    name: "Аты",
    namePh: "Айгерім",
    city: "Қала",
    cityChoose: "Таңдаңыз",
    cities: ["Алматы", "Астана", "Онлайн"],
    phone: "Телефон",
    consent: "Дербес деректерді өңдеуге келісемін.",
    submit: "Жазылу",
    sending: "Жіберілуде…",
    faster: "Жылдамырақ:",
    successTitle: "Өтінім жіберілді!",
    successText: "Менеджер жақын арада хабарласады.",
    error: "Бірдеңе дұрыс болмады. Қайталап көріңіз немесе WhatsApp-қа жазыңыз.",
  },
  directions: {
    eyebrow: "Бағыттар",
    title: "GSC Study-дің төрт бағыты",
    text: "Тіл үйренуге, емтихандарға дайындалуға және университетке құжат тапсыруға көмектесеміз.",
    cards: [
      { title: "Тіл мектебі", text: "A1-ден C2-ге дейінгі ағылшын және қытай тілі. Жалпы, академиялық, іскерлік және балаларға арналған форматтар.", cta: "Курстарды көру" },
      { title: "Емтихандар", text: "IELTS және Digital SAT-қа дайындық, сынама тесттер мен нақты емтиханға дейінгі болжамды бағамен.", cta: "Емтиханға дайындық" },
      { title: "Шетелге", text: "Университет таңдау, құжаттарды дайындау және 25+ елдің ЖОО-ларына қабылданғанға дейін қолдау.", cta: "Шетелдегі бағдарламалар" },
      { title: "Лагерьлер", text: "12-17 жастағы оқушыларға GSC Study серігімен тілдік ауысымдар. 2026 жаз.", cta: "Лагерьлерді көру" },
    ],
  },
  testsBlock: {
    eyebrow: "Тестілеу",
    title: "Деңгейді анықтау тесттері",
    text: "Онлайн тегін өтіп, деңгейіңізді бірден біліңіз. Біз талдау жіберіп, бағдарлама таңдап береміз.",
  },
  steps: {
    eyebrow: "Қалай бастау керек",
    title: "Түсуге апарар қадамдар",
    items: [
      ["Кеңес", "Мақсат пен деңгейді анықтаймыз."],
      ["Дайындық", "Тіл үйретіп, емтихан тапсырамыз."],
      ["Қабылдану", "ЖОО-ға құжат тапсырамыз."],
    ],
  },
  reviews: {
    eyebrow: "Пікірлер",
    title: "Студенттер не дейді",
    items: [
      {
        text: "Тамаша дайындықтың арқасында IELTS-тен 7.5 алдым! Оқытушылар әр бөлшекке мұқият қарайды.",
        author: "Алихан, Астана",
        course: "IELTS Academic курсы",
        accent: false,
      },
      {
        text: "Канадаға оқуға түстім, бүкіл процесс тегіс өтті. Университет таңдауға және виза рәсімдеуге көмектесті.",
        author: "Мәдина, Алматы",
        course: "Шетелде оқу",
        accent: true,
      },
      {
        text: "Керемет оқытушылар мен орта. Жарты жылдық қарқынды сабақта ағылшынымды B1-ден C1-ге дейін көтердім.",
        author: "Данияр, Алматы",
        course: "Жалпы ағылшын тілі",
        accent: false,
      },
      {
        text: "Балам жазғы лагерьден қатты риза! Күн сайын тіл практикасы және тамаша мәдени бағдарлама.",
        author: "Динара, Астана",
        course: "Жазғы лагерьлер",
        accent: true,
      },
    ],
  },
  offices: {
    eyebrow: "Байланыс",
    title: "Біздің орталықтар",
    text: "Төрт оқу орталығы: үшеуі Астанада, біреуі Алматыда. Немесе кез келген қаладан онлайн оқыңыз.",
    writeWhatsApp: "WhatsApp-қа жазу",
  },
  faq: {
    title: "Жиі қойылатын сұрақтар",
    items: [
      ["Оқуды неше жастан бастауға болады?", "Балаларды 6 жастан арнайы балалар бағдарламаларына қабылдаймыз."],
      ["IELTS дайындық курсы қанша уақытқа созылады?", "Стандартты курс ағымдағы деңгейіңізге байланысты 2-3 айға созылады."],
      ["Виза алуға көмектесесіздер ме?", "Иә, студенттерімізге толық визалық қолдау көрсетеміз."],
    ],
  },
  trust: { title: "Аккредитациялар мен серіктестер" },
  sticky: { consult: "Кеңес алу" },
  footer: {
    brandDesc: "2011 жылдан бері тіл үйренуге, емтихандарға дайындалуға және шетел университеттеріне түсуге көмектесеміз.",
    programs: "Бағдарламалар",
    company: "Компания",
    contacts: "Байланыс",
    callCenter: "Байланыс орталығы",
    email: "Email",
    hours: "Жұмыс уақыты",
    rights: "© 2026 GSC Study. Барлық құқық қорғалған.",
    privacy: "Құпиялылық саясаты",
    offer: "Жария оферта",
    links: {
      langSchool: "Тіл мектебі",
      ielts: "IELTS дайындық",
      sat: "Digital SAT",
      abroad: "Шетелге түсу",
      camps: "Жазғы лагерьлер",
      about: "Біз туралы",
      centers: "Біздің орталықтар",
      reviews: "Пікірлер",
    },
  },
};

const en: Dict = {
  nav: {
    school: "Language School",
    exams: "Exams",
    abroad: "Study Abroad",
    camps: "Camps",
    centers: "Centres",
  },
  actions: {
    consult: "Consultation",
    tryLevelTest: "Take the level test",
    pickProgram: "Find a programme",
    seeCourses: "See courses",
    schedule: "See schedule",
    signUp: "Sign up",
    consultOnAdmission: "Admission consultation",
    writeWhatsApp: "message on WhatsApp",
    bubble: "Any questions?",
  },
  hero: {
    slides: [
      {
        tag: "GSC Study",
        title1: "Education",
        title2: "without borders",
        text: "Language courses, preparation for international exams and admission to universities abroad. We support you from your first level test to enrolment.",
      },
      {
        tag: "Intake 2026",
        title1: "New groups start",
        title2: "every month",
        text: "We form groups by level-test results, from A1 to C2. Up to eight people so everyone speaks.",
      },
      {
        tag: "Admissions",
        title1: "Admission to universities in",
        title2: "25+ countries",
        text: "We pick a university to match your grades and budget, prepare documents and guide you to enrolment. Main destinations: UK, Germany, Canada, UAE, USA.",
      },
    ],
    features: [
      "Groups of up to eight, one-to-one or online",
      "Free level test and trial lesson",
      "Support all the way to university enrolment",
    ],
    stats: [
      ["15 years", "on the market"],
      ["18,000+", "students sent abroad"],
      ["7.0", "average IELTS score"],
      ["30+", "admission countries"],
    ],
  },
  leadForm: {
    title: "Book a trial lesson",
    subtitle: "Leave a request and our manager will contact you shortly.",
    name: "Name",
    namePh: "Aigerim",
    city: "City",
    cityChoose: "Choose",
    cities: ["Almaty", "Astana", "Online"],
    phone: "Phone",
    consent: "I agree to the processing of personal data.",
    submit: "Sign up",
    sending: "Sending…",
    faster: "Faster:",
    successTitle: "Request sent!",
    successText: "Our manager will contact you shortly.",
    error: "Something went wrong. Please try again or message us on WhatsApp.",
  },
  directions: {
    eyebrow: "Directions",
    title: "Four directions of GSC Study",
    text: "We help you learn a language, prepare for exams and apply to university.",
    cards: [
      { title: "Language School", text: "English from A1 to C2 and Chinese. General, academic, business and kids formats.", cta: "See courses" },
      { title: "Exams", text: "IELTS and Digital SAT preparation with mock tests and a predicted score before the real exam.", cta: "Exam preparation" },
      { title: "Study Abroad", text: "University selection, document preparation and support up to enrolment in 25+ countries.", cta: "Programmes abroad" },
      { title: "Camps", text: "Language sessions for schoolchildren 12-17 with a GSC Study chaperone. Summer 2026.", cta: "See camps" },
    ],
  },
  testsBlock: {
    eyebrow: "Testing",
    title: "Level placement tests",
    text: "Take one online for free and see your level right away. We'll send feedback and suggest a program.",
  },
  steps: {
    eyebrow: "How to start",
    title: "Steps to admission",
    items: [
      ["Consultation", "We define goals and level."],
      ["Preparation", "We teach the language and pass exams."],
      ["Enrolment", "We submit documents to the university."],
    ],
  },
  reviews: {
    eyebrow: "Reviews",
    title: "What students say",
    items: [
      {
        text: "Scored 7.5 on IELTS thanks to excellent prep! The teachers pay close attention to every detail.",
        author: "Alikhan, Astana",
        course: "IELTS Academic course",
        accent: false,
      },
      {
        text: "Got into a university in Canada and the whole process went smoothly. They helped me choose the school and handle the visa.",
        author: "Madina, Almaty",
        course: "Study abroad",
        accent: true,
      },
      {
        text: "Great teachers and atmosphere. I moved my English from B1 to C1 in six months of intensive classes.",
        author: "Daniyar, Almaty",
        course: "General English",
        accent: false,
      },
      {
        text: "My child loved the summer camp! Language practice every day plus a wonderful cultural program.",
        author: "Dinara, Astana",
        course: "Summer camps",
        accent: true,
      },
    ],
  },
  offices: {
    eyebrow: "Contacts",
    title: "Our centres",
    text: "Four learning centres: three in Astana and one in Almaty. Or study online from any city.",
    writeWhatsApp: "Message on WhatsApp",
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      ["From what age can studies begin?", "We accept children from the age of 6 into special kids programmes."],
      ["How long is the IELTS preparation course?", "A standard course lasts 2-3 months depending on your current level."],
      ["Do you help with visas?", "Yes, we provide full visa support for our students."],
    ],
  },
  trust: { title: "Accreditations & partners" },
  sticky: { consult: "Consultation" },
  footer: {
    brandDesc: "Since 2011, we have helped students learn languages, prepare for exams and apply to universities abroad.",
    programs: "Programmes",
    company: "Company",
    contacts: "Contacts",
    callCenter: "Call centre",
    email: "Email",
    hours: "Working hours",
    rights: "© 2026 GSC Study. All rights reserved.",
    privacy: "Privacy policy",
    offer: "Public offer",
    links: {
      langSchool: "Language School",
      ielts: "IELTS preparation",
      sat: "Digital SAT",
      abroad: "Study abroad",
      camps: "Summer camps",
      about: "About us",
      centers: "Our centres",
      reviews: "Reviews",
    },
  },
};

const dictionaries = { ru, kz, en };

export type Dictionary = Dict;

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale] ?? ru;
}
