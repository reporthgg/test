import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";
import { contactsContent } from "./contacts-content";
import type { LandingSelectOption } from "./LandingSelect";

type BranchOption = LandingSelectOption & { city: string };

// Страницы со своим текстом оффера «Диагностика + персональный план» (ТЗ, раздел 2.2).
export type OfferPage = "default" | "home" | "school" | "exams" | "abroad";
// Заголовок из двух частей: в нижнем блоке вторая часть выделена цветом, в попапе они идут подряд.
type OfferCopy = { title: readonly [string, string]; description: string; submit: string };

export type FormsContent = {
  offers: Record<OfferPage, OfferCopy>;
  offerBadge: string;
  offerSteps: readonly string[];
  campsTitle: string;
  campsDescription: string;
  campsSubmit: string;
  consultationTitle: string;
  consultationDescription: string;
  name: string;
  namePlaceholder: string;
  city: string;
  selectPlaceholder: string;
  cities: readonly LandingSelectOption[];
  interest: string;
  interests: readonly LandingSelectOption[];
  branch: string;
  branches: readonly BranchOption[];
  service: string;
  services: readonly LandingSelectOption[];
  admissionYear: string;
  admissionYears: readonly LandingSelectOption[];
  phone: string;
  whatsappPhone: string;
  consultationSubmit: string;
  sending: string;
  faster: string;
  whatsapp: string;
  close: string;
  successTitle: string;
  successText: string;
  savedTitle: string;
  savedDescription: string;
  error: string;
  invalidForm: string;
  errors: Record<"name" | "phone" | "city" | "option" | "consent", string>;
};

// Значения филиалов уходят в CRM на русском, подписи берутся из блока контактов.
function branchOptions(locale: Locale, online: string): readonly BranchOption[] {
  const { cities, addresses } = contactsContent[locale];
  return [
    ...site.offices.map((office) => ({
      value: `${office.city}, ${office.address}`,
      label: `${cities[office.city]}, ${addresses[office.address]}`,
      city: office.city,
    })),
    { value: "Онлайн", label: online, city: "Онлайн" },
  ];
}

export const formsContent: Record<Locale, FormsContent> = {
  ru: {
    offers: {
      default: {
        title: ["Диагностика\u00a0+", "персональный план"],
        description: "Тест уровня и разбор с экспертом: ваш уровень по CEFR, сколько месяцев до нужного балла IELTS и с какой программы начать.",
        submit: "Пройти диагностику бесплатно",
      },
      home: {
        title: ["Диагностика\u00a0+", "персональный план"],
        description: "Определим уровень, разберём результат и пришлём план обучения в WhatsApp",
        submit: "Пройти диагностику бесплатно",
      },
      school: {
        title: ["Диагностика\u00a0+", "персональный план"],
        description: "Тест уровня и разбор с экспертом: с какой группы начать и сколько месяцев до следующего уровня",
        submit: "Пройти диагностику бесплатно",
      },
      exams: {
        title: ["Диагностика\u00a0+", "план до нужного балла"],
        description: "Пробный тест в формате IELTS или SAT, разбор по секциям и план: сколько месяцев до вашего целевого балла",
        submit: "Пройти диагностику бесплатно",
      },
      abroad: {
        title: ["Персональный план", "поступления"],
        description: "Разберём оценки, язык и бюджет и пришлём план: страны, экзамены, сроки подачи",
        submit: "Получить план бесплатно",
      },
    },
    offerBadge: "Бесплатно",
    offerSteps: [
      "Тест уровня онлайн или в центре",
      "Разбор с экспертом: письмо и разговорная часть",
      "Персональный план в WhatsApp",
    ],
    campsTitle: "Заявка на лагерь",
    campsDescription: "Расскажем о программе, датах и стоимости поездки и ответим на вопросы",
    campsSubmit: "Отправить заявку",
    consultationTitle: "Бесплатная консультация\nс экспертом",
    consultationDescription: "За 30 минут разберём твои шансы\nи наметим план действий",
    name: "Имя",
    namePlaceholder: "Введите ваше имя",
    city: "Город",
    selectPlaceholder: "Выберите",
    cities: [
      { value: "Астана", label: "Астана" },
      { value: "Алматы", label: "Алматы" },
      { value: "Онлайн", label: "Онлайн" },
      { value: "Другой", label: "Другой" },
    ],
    interest: "Что интересует (необязательно)",
    interests: [
      { value: "General English", label: "General English" },
      { value: "IELTS", label: "IELTS" },
      { value: "Digital SAT", label: "Digital SAT" },
      { value: "Английский для ребёнка", label: "Английский для ребёнка" },
      { value: "Китайский язык", label: "Китайский язык" },
      { value: "Поступление за рубеж", label: "Поступление за рубеж" },
      { value: "Пока не знаю", label: "Пока не знаю" },
    ],
    branch: "Филиал",
    branches: branchOptions("ru", "Онлайн"),
    service: "Услуга",
    services: [
      { value: "Языковые курсы", label: "Языковые курсы" },
      { value: "Подготовка к IELTS", label: "Подготовка к IELTS" },
      { value: "Digital SAT", label: "Digital SAT" },
      { value: "Поступление за рубеж", label: "Поступление за рубеж" },
      { value: "Летние лагеря", label: "Летние лагеря" },
    ],
    admissionYear: "Год поступления",
    admissionYears: [
      { value: "2027", label: "2027" },
      { value: "2028", label: "2028" },
      { value: "2029", label: "2029" },
      { value: "2030 и позже", label: "2030 и позже" },
      { value: "Пока не знаю", label: "Пока не знаю" },
    ],
    phone: "Телефон (WhatsApp)",
    whatsappPhone: "Ваш номер в WhatsApp",
    consultationSubmit: "Записаться бесплатно",
    sending: "Отправляем...",
    faster: "Быстрее: написать в",
    whatsapp: "Написать в WhatsApp",
    close: "Закрыть",
    successTitle: "Спасибо!",
    successText: "Мы свяжемся с вами в WhatsApp в рабочее время.",
    savedTitle: "Заявка сохранена",
    savedDescription: "Заявка сохранена. Отправку менеджеру пока не удалось подтвердить. Повторять заявку не нужно. Если хотите связаться сейчас, напишите в WhatsApp.",
    error: "Не удалось отправить заявку. Ваши данные сохранены в форме. Попробуйте ещё раз или напишите в WhatsApp.",
    invalidForm: "Проверьте отмеченные поля.",
    errors: {
      name: "Введите имя, не более 200 символов.",
      phone: "Проверьте номер: от 5 до 20 цифр, можно указать код страны.",
      city: "Выберите город или онлайн-обучение.",
      option: "Выберите вариант из списка.",
      consent: "Подтвердите согласие на обработку персональных данных.",
    },
  },
  kz: {
    offers: {
      default: {
        title: ["Диагностика\u00a0+", "жеке жоспар"],
        description: "Деңгей тесті және сарапшымен талдау: CEFR бойынша деңгейіңіз, IELTS-тің қажетті балына дейін қанша ай керек және қай бағдарламадан бастау керек.",
        submit: "Тегін диагностикадан өту",
      },
      home: {
        title: ["Диагностика\u00a0+", "жеке жоспар"],
        description: "Деңгейіңізді анықтап, нәтижені талдаймыз және WhatsApp-қа оқу жоспарын жібереміз",
        submit: "Тегін диагностикадан өту",
      },
      school: {
        title: ["Диагностика\u00a0+", "жеке жоспар"],
        description: "Деңгей тесті және сарапшымен талдау: қай топтан бастау керек және келесі деңгейге дейін қанша ай қажет",
        submit: "Тегін диагностикадан өту",
      },
      exams: {
        title: ["Диагностика\u00a0+", "қажетті балға дейінгі жоспар"],
        description: "IELTS немесе SAT форматындағы сынама тест, секциялар бойынша талдау және жоспар: мақсатты балыңызға дейін қанша ай қажет",
        submit: "Тегін диагностикадан өту",
      },
      abroad: {
        title: ["Оқуға түсудің", "жеке жоспары"],
        description: "Бағаларыңызды, тіл деңгейіңізді және бюджетіңізді талдап, жоспар жібереміз: елдер, емтихандар, құжат тапсыру мерзімдері",
        submit: "Жоспарды тегін алу",
      },
    },
    offerBadge: "Тегін",
    offerSteps: [
      "Деңгей тесті онлайн немесе орталықта",
      "Сарапшымен талдау: жазбаша және ауызша бөлім",
      "WhatsApp-та жеке жоспар",
    ],
    campsTitle: "Лагерьге өтінім",
    campsDescription: "Сапар бағдарламасы, күндері мен құны туралы айтып, сұрақтарыңызға жауап береміз",
    campsSubmit: "Өтінім жіберу",
    consultationTitle: "Сарапшымен\nтегін кеңес",
    consultationDescription: "30 минутта мүмкіндіктеріңді талдап,\nіс-қимыл жоспарын құрамыз",
    name: "Атыңыз",
    namePlaceholder: "Атыңызды енгізіңіз",
    city: "Қала",
    selectPlaceholder: "Таңдаңыз",
    cities: [
      { value: "Астана", label: "Астана" },
      { value: "Алматы", label: "Алматы" },
      { value: "Онлайн", label: "Онлайн" },
      { value: "Другой", label: "Басқа" },
    ],
    interest: "Не қызықтырады (міндетті емес)",
    interests: [
      { value: "General English", label: "General English" },
      { value: "IELTS", label: "IELTS" },
      { value: "Digital SAT", label: "Digital SAT" },
      { value: "Английский для ребёнка", label: "Балаға арналған ағылшын тілі" },
      { value: "Китайский язык", label: "Қытай тілі" },
      { value: "Поступление за рубеж", label: "Шетелге оқуға түсу" },
      { value: "Пока не знаю", label: "Әзірге білмеймін" },
    ],
    branch: "Филиал",
    branches: branchOptions("kz", "Онлайн"),
    service: "Қызмет",
    services: [
      { value: "Языковые курсы", label: "Тіл курстары" },
      { value: "Подготовка к IELTS", label: "IELTS-қа дайындық" },
      { value: "Digital SAT", label: "Digital SAT" },
      { value: "Поступление за рубеж", label: "Шетелге оқуға түсу" },
      { value: "Летние лагеря", label: "Жазғы лагерьлер" },
    ],
    admissionYear: "Түсу жылы",
    admissionYears: [
      { value: "2027", label: "2027" },
      { value: "2028", label: "2028" },
      { value: "2029", label: "2029" },
      { value: "2030 и позже", label: "2030 және одан кейін" },
      { value: "Пока не знаю", label: "Әзірге білмеймін" },
    ],
    phone: "Телефон (WhatsApp)",
    whatsappPhone: "WhatsApp нөміріңіз",
    consultationSubmit: "Тегін жазылу",
    sending: "Жіберілуде...",
    faster: "Жылдамырақ байланыс:",
    whatsapp: "WhatsApp арқылы жазу",
    close: "Жабу",
    successTitle: "Рахмет!",
    successText: "Жұмыс уақытында WhatsApp арқылы хабарласамыз.",
    savedTitle: "Өтінім сақталды",
    savedDescription: "Өтінім сақталды. Менеджерге жеткізілгені әлі расталған жоқ. Қайта жіберудің қажеті жоқ. Қазір байланысу үшін WhatsApp арқылы жазыңыз.",
    error: "Өтінім жіберілмеді. Енгізген деректеріңіз формада сақталды. Қайталап көріңіз немесе WhatsApp арқылы жазыңыз.",
    invalidForm: "Белгіленген өрістерді тексеріңіз.",
    errors: {
      name: "Атыңызды енгізіңіз, 200 таңбадан аспауы керек.",
      phone: "Нөмірді тексеріңіз: 5-20 цифр, ел кодын көрсетуге болады.",
      city: "Қаланы немесе онлайн оқуды таңдаңыз.",
      option: "Тізімнен нұсқаны таңдаңыз.",
      consent: "Жеке деректерді өңдеуге келісіміңізді растаңыз.",
    },
  },
  en: {
    offers: {
      default: {
        title: ["Assessment\u00a0+", "personal plan"],
        description: "A level test and an expert review: your CEFR level, how many months to your target IELTS score and which programme to start with.",
        submit: "Take the free assessment",
      },
      home: {
        title: ["Assessment\u00a0+", "personal plan"],
        description: "We will assess your level, review the result and send you a study plan on WhatsApp",
        submit: "Take the free assessment",
      },
      school: {
        title: ["Assessment\u00a0+", "personal plan"],
        description: "A level test and an expert review: which group to start in and how many months to the next level",
        submit: "Take the free assessment",
      },
      exams: {
        title: ["Assessment\u00a0+", "plan to your target score"],
        description: "A mock test in IELTS or SAT format, a section-by-section review and a plan: how many months to your target score",
        submit: "Take the free assessment",
      },
      abroad: {
        title: ["Personal", "admissions plan"],
        description: "We will review your grades, language level and budget and send you a plan: countries, exams and application deadlines",
        submit: "Get your free plan",
      },
    },
    offerBadge: "Free",
    offerSteps: [
      "Level test online or at a centre",
      "Expert review of your writing and speaking",
      "Personal plan on WhatsApp",
    ],
    campsTitle: "Camp application",
    campsDescription: "We will tell you about the programme, dates and cost of the trip and answer your questions",
    campsSubmit: "Send application",
    consultationTitle: "Free consultation\nwith an expert",
    consultationDescription: "In 30 minutes, we will review your chances\nand outline an action plan",
    name: "Name",
    namePlaceholder: "Enter your name",
    city: "City",
    selectPlaceholder: "Select",
    cities: [
      { value: "Астана", label: "Astana" },
      { value: "Алматы", label: "Almaty" },
      { value: "Онлайн", label: "Online" },
      { value: "Другой", label: "Other" },
    ],
    interest: "What are you interested in? (optional)",
    interests: [
      { value: "General English", label: "General English" },
      { value: "IELTS", label: "IELTS" },
      { value: "Digital SAT", label: "Digital SAT" },
      { value: "Английский для ребёнка", label: "English for kids" },
      { value: "Китайский язык", label: "Chinese" },
      { value: "Поступление за рубеж", label: "Study abroad" },
      { value: "Пока не знаю", label: "Not sure yet" },
    ],
    branch: "Branch",
    branches: branchOptions("en", "Online"),
    service: "Service",
    services: [
      { value: "Языковые курсы", label: "Language courses" },
      { value: "Подготовка к IELTS", label: "IELTS preparation" },
      { value: "Digital SAT", label: "Digital SAT" },
      { value: "Поступление за рубеж", label: "Study abroad" },
      { value: "Летние лагеря", label: "Summer camps" },
    ],
    admissionYear: "Year of admission",
    admissionYears: [
      { value: "2027", label: "2027" },
      { value: "2028", label: "2028" },
      { value: "2029", label: "2029" },
      { value: "2030 и позже", label: "2030 or later" },
      { value: "Пока не знаю", label: "Not sure yet" },
    ],
    phone: "Phone (WhatsApp)",
    whatsappPhone: "Your WhatsApp number",
    consultationSubmit: "Book for free",
    sending: "Sending...",
    faster: "Faster: message us on",
    whatsapp: "Message us on WhatsApp",
    close: "Close",
    successTitle: "Thank you!",
    successText: "We will message you on WhatsApp during working hours.",
    savedTitle: "Request saved",
    savedDescription: "Your request has been saved, but delivery to our manager has not been confirmed yet. You do not need to submit it again. Message us on WhatsApp if you want to get in touch now.",
    error: "We could not send your request. Your details are still in the form. Try again or message us on WhatsApp.",
    invalidForm: "Please check the highlighted fields.",
    errors: {
      name: "Enter your name, up to 200 characters.",
      phone: "Check your number: 5-20 digits, with an optional country code.",
      city: "Choose a city or online lessons.",
      option: "Choose an option from the list.",
      consent: "Please consent to the processing of your personal data.",
    },
  },
};
