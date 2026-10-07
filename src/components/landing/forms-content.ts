import type { Locale } from "@/i18n/config";

export type FormsContent = {
  diagnosticTitle: string;
  diagnosticDescription: string;
  name: string;
  namePlaceholder: string;
  city: string;
  optionalCity: string;
  cityPlaceholder: string;
  cities: readonly { value: string; label: string }[];
  phone: string;
  whatsappPhone: string;
  consent: string;
  submit: string;
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
  bottomTitle: string;
  bottomTitleAccent: string;
  bottomDescription: string;
  successTitle: string;
  successTrial: string;
  successDiagnostic: string;
  savedTitle: string;
  savedDescription: string;
  error: string;
  invalidForm: string;
  errors: Record<"name" | "phone" | "city" | "consent", string>;
};

export const formsContent: Record<Locale, FormsContent> = {
  ru: {
    diagnosticTitle: "Записаться на бесплатную диагностику",
    diagnosticDescription: "Эксперт разберет ваш кейс, определит уровень языка и даст советы",
    name: "Имя",
    namePlaceholder: "Введите ваше имя",
    city: "Город",
    optionalCity: "Город (необязательно)",
    cityPlaceholder: "Выберите",
    cities: [
      { value: "Астана", label: "Астана" },
      { value: "Алматы", label: "Алматы" },
      { value: "Онлайн", label: "Онлайн" },
    ],
    phone: "Телефон",
    whatsappPhone: "Ваш номер в WhatsApp",
    consent: "Согласен(а) на обработку персональных данных",
    submit: "Записаться",
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
    bottomTitle: "Пройдите",
    bottomTitleAccent: "диагностику",
    bottomDescription: "Познакомьтесь с преподавателем и форматом занятий",
    successTitle: "Заявка отправлена",
    successTrial: "Свяжемся с вами для записи на пробный урок.",
    successDiagnostic: "Свяжемся с вами для записи на бесплатную диагностику.",
    savedTitle: "Заявка сохранена",
    savedDescription: "Заявка сохранена. Отправку менеджеру пока не удалось подтвердить. Повторять заявку не нужно. Если хотите связаться сейчас, напишите в WhatsApp.",
    error: "Не удалось отправить заявку. Ваши данные сохранены в форме. Попробуйте ещё раз или напишите в WhatsApp.",
    invalidForm: "Проверьте отмеченные поля.",
    errors: {
      name: "Введите имя, не более 200 символов.",
      phone: "Проверьте номер: от 5 до 20 цифр, можно указать код страны.",
      city: "Выберите город или онлайн-обучение.",
      consent: "Подтвердите согласие на обработку персональных данных.",
    },
  },
  kz: {
    diagnosticTitle: "Тегін диагностикаға жазылыңыз",
    diagnosticDescription: "Маман жағдайыңызды талдап, тіл деңгейіңізді анықтайды және кеңес береді",
    name: "Атыңыз",
    namePlaceholder: "Атыңызды енгізіңіз",
    city: "Қала",
    optionalCity: "Қала (міндетті емес)",
    cityPlaceholder: "Таңдаңыз",
    cities: [
      { value: "Астана", label: "Астана" },
      { value: "Алматы", label: "Алматы" },
      { value: "Онлайн", label: "Онлайн" },
    ],
    phone: "Телефон",
    whatsappPhone: "WhatsApp нөміріңіз",
    consent: "Жеке деректерімді өңдеуге келісемін",
    submit: "Жазылу",
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
    bottomTitle: "Диагностикадан",
    bottomTitleAccent: "өтіңіз",
    bottomDescription: "Оқытушымен және сабақ форматымен танысыңыз",
    successTitle: "Өтінім жіберілді",
    successTrial: "Сынақ сабағына жазу үшін сізбен хабарласамыз.",
    successDiagnostic: "Тегін диагностикаға жазу үшін сізбен хабарласамыз.",
    savedTitle: "Өтінім сақталды",
    savedDescription: "Өтінім сақталды. Менеджерге жеткізілгені әлі расталған жоқ. Қайта жіберудің қажеті жоқ. Қазір байланысу үшін WhatsApp арқылы жазыңыз.",
    error: "Өтінім жіберілмеді. Енгізген деректеріңіз формада сақталды. Қайталап көріңіз немесе WhatsApp арқылы жазыңыз.",
    invalidForm: "Белгіленген өрістерді тексеріңіз.",
    errors: {
      name: "Атыңызды енгізіңіз, 200 таңбадан аспауы керек.",
      phone: "Нөмірді тексеріңіз: 5-20 цифр, ел кодын көрсетуге болады.",
      city: "Қаланы немесе онлайн оқуды таңдаңыз.",
      consent: "Жеке деректерді өңдеуге келісіміңізді растаңыз.",
    },
  },
  en: {
    diagnosticTitle: "Book a free assessment",
    diagnosticDescription: "An expert will review your goals, assess your language level and offer advice",
    name: "Name",
    namePlaceholder: "Enter your name",
    city: "City",
    optionalCity: "City (optional)",
    cityPlaceholder: "Select",
    cities: [
      { value: "Астана", label: "Astana" },
      { value: "Алматы", label: "Almaty" },
      { value: "Онлайн", label: "Online" },
    ],
    phone: "Phone",
    whatsappPhone: "Your WhatsApp number",
    consent: "I consent to the processing of my personal data",
    submit: "Book now",
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
    bottomTitle: "Take a free",
    bottomTitleAccent: "assessment",
    bottomDescription: "Meet your teacher and experience our classes",
    successTitle: "Request sent",
    successTrial: "We will contact you to arrange your trial lesson.",
    successDiagnostic: "We will contact you to arrange your free assessment.",
    savedTitle: "Request saved",
    savedDescription: "Your request has been saved, but delivery to our manager has not been confirmed yet. You do not need to submit it again. Message us on WhatsApp if you want to get in touch now.",
    error: "We could not send your request. Your details are still in the form. Try again or message us on WhatsApp.",
    invalidForm: "Please check the highlighted fields.",
    errors: {
      name: "Enter your name, up to 200 characters.",
      phone: "Check your number: 5-20 digits, with an optional country code.",
      city: "Choose a city or online lessons.",
      consent: "Please consent to the processing of your personal data.",
    },
  },
};
