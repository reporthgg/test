import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";
import { contactsContent } from "./contacts-content";
import type { LandingSelectOption } from "./LandingSelect";

type BranchOption = LandingSelectOption & { city: string };

export type FormsContent = {
  diagnosticTitle: string;
  diagnosticDescription: string;
  campsTitle: string;
  campsDescription: string;
  consultationTitle: string;
  consultationDescription: string;
  name: string;
  namePlaceholder: string;
  city: string;
  optionalCity: string;
  selectPlaceholder: string;
  cities: readonly LandingSelectOption[];
  branch: string;
  branches: readonly BranchOption[];
  service: string;
  services: readonly LandingSelectOption[];
  admissionYear: string;
  admissionYears: readonly LandingSelectOption[];
  phone: string;
  whatsappPhone: string;
  consent: string;
  submit: string;
  consultationSubmit: string;
  sending: string;
  faster: string;
  whatsapp: string;
  close: string;
  trialTitle: string;
  trialTitleAccent: string;
  trialDescription: string;
  trialSteps: readonly string[];
  trialPriceCaption: string;
  trialSubmit: string;
  schoolTrialSubmit: string;
  // Описание пробного урока в карточке школы: строки для десктопа, на мобильной текст переносится сам.
  schoolTrialDescription: readonly string[];
  bottomTitle: string;
  bottomTitleAccent: string;
  bottomDescription: string;
  successTitle: string;
  successTrial: string;
  successDiagnostic: string;
  successConsultation: string;
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
    diagnosticTitle: "Записаться на бесплатную диагностику",
    diagnosticDescription: "Эксперт разберет ваш кейс,\nопределит уровень языка и даст советы",
    campsTitle: "Подобрать программу лагеря",
    campsDescription: "Расскажем о направлениях, датах и условиях поездки и ответим на вопросы",
    consultationTitle: "Бесплатная консультация\nс экспертом",
    consultationDescription: "За 30 минут разберём твои шансы\nи наметим план действий",
    name: "Имя",
    namePlaceholder: "Введите ваше имя",
    city: "Город",
    optionalCity: "Город (необязательно)",
    selectPlaceholder: "Выберите",
    cities: [
      { value: "Астана", label: "Астана" },
      { value: "Алматы", label: "Алматы" },
      { value: "Онлайн", label: "Онлайн" },
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
    phone: "Телефон",
    whatsappPhone: "Ваш номер в WhatsApp",
    consent: "Согласен(а) на обработку персональных данных",
    submit: "Записаться",
    consultationSubmit: "Записаться бесплатно",
    sending: "Отправляем...",
    faster: "Быстрее: написать в",
    whatsapp: "Написать в WhatsApp",
    close: "Закрыть",
    trialTitle: "Первый урок",
    trialTitleAccent: "за наш счёт",
    trialDescription: "Бесплатно определим ваш уровень, познакомим с преподавателем и пригласим на занятие. Вы сможете оценить обучение до оплаты курса",
    trialSteps: [
      "Определим уровень",
      "Познакомим с преподавателем",
      "Пригласим на занятие",
    ],
    trialPriceCaption: "Пробный урок + определение уровня",
    trialSubmit: "Получить пробный урок",
    schoolTrialSubmit: "Записаться на пробный урок",
    // Переносы строк из Figma 260:2763.
    schoolTrialDescription: [
      "Бесплатно определим ваш уровень, познакомим",
      "с преподавателем и пригласим на занятие.",
      "Вы сможете оценить обучение до оплаты курса",
    ],
    bottomTitle: "Пройдите",
    bottomTitleAccent: "диагностику",
    bottomDescription: "Познакомьтесь с преподавателем и форматом занятий",
    successTitle: "Заявка отправлена",
    successTrial: "Свяжемся с вами для записи на пробный урок.",
    successDiagnostic: "Свяжемся с вами для записи на бесплатную диагностику.",
    successConsultation: "Свяжемся с вами для записи на бесплатную консультацию.",
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
    diagnosticTitle: "Тегін диагностикаға жазылыңыз",
    diagnosticDescription: "Маман жағдайыңызды талдап, тіл деңгейіңізді анықтайды және кеңес береді",
    campsTitle: "Лагерь бағдарламасын таңдау",
    campsDescription: "Бағыттар, күндер мен сапар шарттары туралы айтып, сұрақтарыңызға жауап береміз",
    consultationTitle: "Сарапшымен\nтегін кеңес",
    consultationDescription: "30 минутта мүмкіндіктеріңді талдап,\nіс-қимыл жоспарын құрамыз",
    name: "Атыңыз",
    namePlaceholder: "Атыңызды енгізіңіз",
    city: "Қала",
    optionalCity: "Қала (міндетті емес)",
    selectPlaceholder: "Таңдаңыз",
    cities: [
      { value: "Астана", label: "Астана" },
      { value: "Алматы", label: "Алматы" },
      { value: "Онлайн", label: "Онлайн" },
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
    phone: "Телефон",
    whatsappPhone: "WhatsApp нөміріңіз",
    consent: "Жеке деректерімді өңдеуге келісемін",
    submit: "Жазылу",
    consultationSubmit: "Тегін жазылу",
    sending: "Жіберілуде...",
    faster: "Жылдамырақ байланыс:",
    whatsapp: "WhatsApp арқылы жазу",
    close: "Жабу",
    trialTitle: "Алғашқы сабақ",
    trialTitleAccent: "бізден сыйлық",
    trialDescription: "Деңгейіңізді тегін анықтап, оқытушымен таныстырамыз және сабаққа шақырамыз. Курс ақысын төлемес бұрын оқу форматын бағалай аласыз",
    trialSteps: [
      "Деңгейіңізді анықтаймыз",
      "Оқытушымен таныстырамыз",
      "Сабаққа шақырамыз",
    ],
    trialPriceCaption: "Сынақ сабағы + деңгейді анықтау",
    trialSubmit: "Сынақ сабағына жазылу",
    schoolTrialSubmit: "Сынақ сабағына жазылу",
    // Длинные казахские слова плохо делятся на строки макета, поэтому текст переносится сам.
    schoolTrialDescription: [
      "Деңгейіңізді тегін анықтап, оқытушымен таныстырамыз және сабаққа шақырамыз. Курс ақысын төлемес бұрын оқу форматын бағалай аласыз",
    ],
    bottomTitle: "Диагностикадан",
    bottomTitleAccent: "өтіңіз",
    bottomDescription: "Оқытушымен және сабақ форматымен танысыңыз",
    successTitle: "Өтінім жіберілді",
    successTrial: "Сынақ сабағына жазу үшін сізбен хабарласамыз.",
    successDiagnostic: "Тегін диагностикаға жазу үшін сізбен хабарласамыз.",
    successConsultation: "Тегін кеңеске жазу үшін сізбен хабарласамыз.",
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
    diagnosticTitle: "Book a free assessment",
    diagnosticDescription: "An expert will review your goals, assess your language level and offer advice",
    campsTitle: "Choose a camp programme",
    campsDescription: "We will talk you through destinations, dates and trip conditions and answer your questions",
    consultationTitle: "Free consultation\nwith an expert",
    consultationDescription: "In 30 minutes, we will review your chances\nand outline an action plan",
    name: "Name",
    namePlaceholder: "Enter your name",
    city: "City",
    optionalCity: "City (optional)",
    selectPlaceholder: "Select",
    cities: [
      { value: "Астана", label: "Astana" },
      { value: "Алматы", label: "Almaty" },
      { value: "Онлайн", label: "Online" },
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
    phone: "Phone",
    whatsappPhone: "Your WhatsApp number",
    consent: "I consent to the processing of my personal data",
    submit: "Book now",
    consultationSubmit: "Book for free",
    sending: "Sending...",
    faster: "Faster: message us on",
    whatsapp: "Message us on WhatsApp",
    close: "Close",
    trialTitle: "Your first lesson",
    trialTitleAccent: "is on us",
    trialDescription: "We will assess your level, introduce you to a teacher and invite you to a free lesson. Experience our classes before paying for a course",
    trialSteps: [
      "Assess your level",
      "Meet your teacher",
      "Try a lesson",
    ],
    trialPriceCaption: "Trial lesson + level assessment",
    trialSubmit: "Get a trial lesson",
    schoolTrialSubmit: "Book a trial lesson",
    schoolTrialDescription: [
      "We will assess your level, introduce you to a teacher and invite you to a free lesson.",
      "Experience our classes before paying for a course",
    ],
    bottomTitle: "Take a free",
    bottomTitleAccent: "assessment",
    bottomDescription: "Meet your teacher and experience our classes",
    successTitle: "Request sent",
    successTrial: "We will contact you to arrange your trial lesson.",
    successDiagnostic: "We will contact you to arrange your free assessment.",
    successConsultation: "We will contact you to arrange your free consultation.",
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
