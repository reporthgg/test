import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";

type ContactContent = {
  near: string;
  you: string;
  officesDescription: string;
  chooseCity: string;
  route: string;
  mapPreview: string;
  cities: Record<(typeof site.offices)[number]["city"], string>;
  addresses: Record<(typeof site.offices)[number]["address"], string>;
  faqTitle: string;
  faqAccent: string;
  faq: readonly { question: string; answer: string }[];
  since: string;
  brandDescription: string;
  programs: string;
  company: string;
  contacts: string;
  callCenter: string;
  hours: string;
  weekdays: string;
  saturday: string;
  rights: string;
  privacy: string;
  offer: string;
  links: { school: string; ielts: string; sat: string; abroad: string; camps: string; about: string; centers: string; reviews: string };
};

export const contactsContent: Record<Locale, ContactContent> = {
  ru: {
    near: "рядом",
    you: "с вами",
    officesDescription: "Выберите центр, чтобы заниматься и знакомиться с командой лично",
    chooseCity: "Выберите город",
    route: "Построить маршрут",
    mapPreview: "Карта 2GIS",
    cities: { Астана: "Астана", Алматы: "Алматы" },
    addresses: {
      "ул. Сыганак, 15": "ул. Сыганак, 15",
      "ул. Улы Дала, 41/6": "ул. Улы Дала, 41/6",
      "пр. Сейфуллина, 575": "пр. Сейфуллина, 575",
    },
    faqTitle: "Частые",
    faqAccent: "вопросы",
    faq: [
      { question: "Можно начать с нулевым английским?", answer: "Да. Сначала определим ваш уровень и подберём программу, с которой будет комфортно начать." },
      { question: "Что будет на бесплатном пробном уроке?", answer: "Вы познакомитесь с преподавателем, попробуете формат занятий и сможете задать вопросы об обучении." },
      { question: "Сколько времени занимает подготовка к IELTS или SAT?", answer: "Срок зависит от начального уровня, нужного результата и времени на занятия. После диагностики можно составить подходящий план подготовки." },
      { question: "Сколько стоит обучение и поступление за рубеж?", answer: "Стоимость зависит от программы, страны, университета и объёма сопровождения. На разборе обсудим ваш бюджет и подходящие варианты." },
      { question: "Можно ли поступить на грант?", answer: "Такие возможности есть. Условия зависят от университета и программы, а решение принимает учебное заведение. Эксперт поможет разобраться в требованиях." },
      { question: "Можно заниматься онлайн?", answer: "Да. При подборе программы обсудим онлайн-формат, расписание и подходящий вариант занятий." },
      { question: "Как выбрать зарубежный лагерь для ребёнка?", answer: "Учитываем возраст, уровень языка и интересы. До выбора программы обсуждаем проживание, сопровождение и организацию поездки." },
    ],
    since: "С 2011 года",
    brandDescription: "помогаем учить языки, готовиться к экзаменам и поступать в зарубежные университеты.",
    programs: "Программы",
    company: "Компания",
    contacts: "Контакты",
    callCenter: "Колл-центр:",
    hours: "Часы работы:",
    weekdays: "Пн-Пт",
    saturday: "Сб",
    rights: "Все права защищены.",
    privacy: "Политика конфиденциальности",
    offer: "Публичная оферта",
    links: { school: "Языковая школа", ielts: "Подготовка к IELTS", sat: "Digital SAT", abroad: "Поступление за рубеж", camps: "Летние лагеря", about: "О нас", centers: "Наши центры", reviews: "Отзывы" },
  },
  kz: {
    near: "сіздің",
    you: "жаныңызда",
    officesDescription: "Оқуға және командамен жеке танысуға ыңғайлы орталықты таңдаңыз",
    chooseCity: "Қаланы таңдаңыз",
    route: "Бағыт құру",
    mapPreview: "2GIS картасы",
    cities: { Астана: "Астана", Алматы: "Алматы" },
    addresses: {
      "ул. Сыганак, 15": "Сығанақ көш., 15",
      "ул. Улы Дала, 41/6": "Ұлы Дала көш., 41/6",
      "пр. Сейфуллина, 575": "Сейфуллин даңғ., 575",
    },
    faqTitle: "Жиі",
    faqAccent: "қойылатын сұрақтар",
    faq: [
      { question: "Ағылшын тілін нөлден бастауға бола ма?", answer: "Иә. Алдымен деңгейіңізді анықтап, оқуды ыңғайлы бастауға көмектесетін бағдарламаны таңдаймыз." },
      { question: "Тегін сынақ сабағында не болады?", answer: "Оқытушымен танысып, сабақ форматын байқап көресіз және оқу туралы сұрақтарыңызды қоя аласыз." },
      { question: "IELTS немесе SAT-қа дайындық қанша уақыт алады?", answer: "Мерзім бастапқы деңгейіңізге, қажетті нәтижеге және сабаққа бөлетін уақытыңызға байланысты. Диагностикадан кейін қолайлы дайындық жоспарын құрамыз." },
      { question: "Оқу мен шетелге түсу қанша тұрады?", answer: "Бағасы бағдарламаға, елге, университетке және сүйемелдеу көлеміне байланысты. Кеңес кезінде бюджетіңізді және қолайлы нұсқаларды талқылаймыз." },
      { question: "Грантқа түсуге бола ма?", answer: "Мұндай мүмкіндіктер бар. Шарттар университет пен бағдарламаға байланысты, ал шешімді оқу орны қабылдайды. Сарапшы талаптарды түсінуге көмектеседі." },
      { question: "Онлайн оқуға бола ма?", answer: "Иә. Бағдарламаны таңдағанда онлайн форматты, кестені және ыңғайлы сабақ түрін талқылаймыз." },
      { question: "Балаға шетелдік лагерьді қалай таңдауға болады?", answer: "Жасын, тіл деңгейін және қызығушылықтарын ескереміз. Бағдарламаны таңдаудан бұрын тұру жағдайын, сүйемелдеуді және сапарды ұйымдастыруды талқылаймыз." },
    ],
    since: "2011 жылдан бері",
    brandDescription: "тіл үйренуге, емтиханға дайындалуға және шетелдік университеттерге түсуге көмектесеміз.",
    programs: "Бағдарламалар",
    company: "Компания",
    contacts: "Байланыс",
    callCenter: "Байланыс орталығы:",
    hours: "Жұмыс уақыты:",
    weekdays: "Дс-Жм",
    saturday: "Сб",
    rights: "Барлық құқықтар қорғалған.",
    privacy: "Құпиялық саясаты",
    offer: "Жария оферта",
    links: { school: "Тіл мектебі", ielts: "IELTS-қа дайындық", sat: "Digital SAT", abroad: "Шетелге оқуға түсу", camps: "Жазғы лагерьлер", about: "Біз туралы", centers: "Орталықтарымыз", reviews: "Пікірлер" },
  },
  en: {
    near: "close",
    you: "to you",
    officesDescription: "Choose a centre to study and meet the team in person",
    chooseCity: "Choose your city",
    route: "Get directions",
    mapPreview: "2GIS map",
    cities: { Астана: "Astana", Алматы: "Almaty" },
    addresses: {
      "ул. Сыганак, 15": "15 Syganak St",
      "ул. Улы Дала, 41/6": "41/6 Uly Dala St",
      "пр. Сейфуллина, 575": "575 Seifullin Ave",
    },
    faqTitle: "Common",
    faqAccent: "questions",
    faq: [
      { question: "Can I start with no English?", answer: "Yes. We will first assess your level and recommend a programme that gives you a comfortable start." },
      { question: "What happens at the free trial lesson?", answer: "You will meet your teacher, try the lesson format and have a chance to ask questions about studying with us." },
      { question: "How long does IELTS or SAT preparation take?", answer: "It depends on your starting level, target score and time available for study. After the assessment, we can put together a suitable preparation plan." },
      { question: "How much do courses and study abroad support cost?", answer: "The cost depends on the programme, country, university and level of support. During your consultation, we will discuss your budget and suitable options." },
      { question: "Can I get a scholarship?", answer: "Scholarship opportunities are available. Requirements depend on the university and programme, and the institution makes the final decision. Our expert will help you understand the requirements." },
      { question: "Can I study online?", answer: "Yes. When choosing your programme, we will discuss online options, the timetable and a suitable lesson format." },
      { question: "How do I choose an overseas camp for my child?", answer: "We consider their age, language level and interests. Before choosing a programme, we discuss accommodation, supervision and travel arrangements." },
    ],
    since: "Since 2011,",
    brandDescription: "we have helped students learn languages, prepare for exams and get into universities abroad.",
    programs: "Programmes",
    company: "Company",
    contacts: "Contacts",
    callCenter: "Call centre:",
    hours: "Opening hours:",
    weekdays: "Mon-Fri",
    saturday: "Sat",
    rights: "All rights reserved.",
    privacy: "Privacy policy",
    offer: "Public offer",
    links: { school: "Language school", ielts: "IELTS preparation", sat: "Digital SAT", abroad: "Study abroad", camps: "Summer camps", about: "About us", centers: "Our centres", reviews: "Reviews" },
  },
};
