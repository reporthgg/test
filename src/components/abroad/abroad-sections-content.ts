import type { Locale } from "@/i18n/config";

export type SituationTone = "light" | "green" | "yellow";
export type SituationIcon = "book" | "notebook" | "rocket" | "close";

export type SituationCard = {
  id: string;
  tone: SituationTone;
  icon: SituationIcon;
  title: string;
  text: string;
  cta: string;
};

type SituationsContent = {
  title: string;
  intro: string;
  cards: readonly SituationCard[];
};

type ServiceItem = { id: string; icon: string; title: string; text: string };

type ServicesContent = {
  title: readonly [string, string];
  cta: string;
  listLabel: string;
  items: readonly ServiceItem[];
};

type TimelineStep = { id: string; title: string; text: string };

type TimelineContent = {
  title: readonly [string, string];
  cta: string;
  previous: string;
  next: string;
  gallery: string;
  progress: string;
  steps: readonly TimelineStep[];
};

export type AbroadFaqItem = { id: string; question: string; answer: string | number; action?: boolean };

type FaqContent = {
  title: readonly [string, string, string];
  action: string;
  actionShort: string;
  sticker: readonly [string, string];
  items: readonly AbroadFaqItem[];
};

function byLocale<T>(build: (locale: Locale) => T): Record<Locale, T> {
  return { ru: build("ru"), kz: build("kz"), en: build("en") };
}

const situationLayout = [
  { id: "grade-11", tone: "light", icon: "book" },
  { id: "grade-9-10", tone: "green", icon: "notebook" },
  { id: "funding", tone: "yellow", icon: "rocket" },
  { id: "rejection", tone: "light", icon: "close" },
] as const;

const serviceIcons = [
  { id: "universities", icon: "universities" },
  { id: "documents", icon: "documents" },
  { id: "letter", icon: "letter" },
  { id: "deadlines", icon: "deadlines" },
  { id: "university-contact", icon: "university-contact" },
  { id: "relocation", icon: "relocation" },
] as const;

const stepIds = ["list", "profile", "documents", "applications", "offers", "departure"] as const;

const situationsCopy: Record<Locale, { title: string; intro: string; cards: readonly (readonly [string, string, string])[] }> = {
  ru: {
    title: "Найди себя здесь",
    intro: "Покажем пошаговый путь к поступлению именно для твоей ситуации",
    cards: [
      ["Учусь в 11 классе", "Определим, куда ты успеваешь подать документы и что нужно подготовить сейчас", "Получить план действий"],
      ["Учусь в 9-10 классе", "Спланируем язык, экзамены и достижения, которые усилят твою заявку", "Подготовка к экзаменам"],
      ["Ищу грант\nили стипендию", "Найдём подходящие конкурсы и разберём, что нужно для финансирования", "Обсудить бюджет"],
      ["Получил отказ", "Проверим прошлую заявку и составим план следующей подачи", "Разобрать варианты"],
    ],
  },
  kz: {
    title: "Өзіңді осы жерден тап",
    intro: "Дәл сенің жағдайыңа арналған түсу жолын қадам-қадаммен көрсетеміз",
    cards: [
      ["11-сыныпта оқимын", "Құжатты қайда тапсырып үлгеретініңді және қазір не дайындау керегін анықтаймыз", "Іс-қимыл жоспарын алу"],
      ["9-10-сыныпта оқимын", "Өтінімді күшейтетін тілді, емтихандар мен жетістіктерді жоспарлаймыз", "Емтиханға дайындық"],
      ["Грант немесе\nстипендия іздеймін", "Қолайлы конкурстарды тауып, қаржыландыруға не қажет екенін талдаймыз", "Бюджетті талқылау"],
      ["Бас тарту алдым", "Өткен өтінімді тексеріп, келесі өтінімнің жоспарын құрамыз", "Нұсқаларды талдау"],
    ],
  },
  en: {
    title: "Find yourself here",
    intro: "We'll show you a step-by-step path to admission for your situation",
    cards: [
      ["I'm in grade 11", "We'll work out where you can still apply and what you need to prepare now", "Get an action plan"],
      ["I'm in grades 9-10", "We'll plan the language, exams and achievements that will strengthen your application", "Prepare for exams"],
      ["Looking for a grant\nor scholarship", "We'll find suitable competitions and explain what it takes to get funding", "Discuss the budget"],
      ["I got a rejection", "We'll review your previous application and plan the next one", "Explore the options"],
    ],
  },
};

export const abroadSituationsContent = byLocale<SituationsContent>((locale) => {
  const copy = situationsCopy[locale];
  return {
    title: copy.title,
    intro: copy.intro,
    cards: situationLayout.map((card, index) => {
      const [title, text, cta] = copy.cards[index];
      return { ...card, title, text, cta };
    }),
  };
});

const servicesCopy: Record<Locale, Omit<ServicesContent, "items"> & { items: readonly (readonly [string, string])[] }> = {
  ru: {
    title: ["Берём на себя организацию поступления.", "От выбора вуза до вылета"],
    cta: "Обсудить моё поступление",
    listLabel: "Что входит в сопровождение",
    items: [
      ["Твой список университетов", "Подберём программы и оценим шансы на поступление и финансирование"],
      ["Документы без путаницы", "Составим список, проверим комплект и требования к переводам"],
      ["Мотивационное письмо", "Поможем раскрыть твои достижения и объяснить выбор программы"],
      ["Заявки в срок", "Поможем заполнить формы и проконтролируем дедлайны подачи"],
      ["Связь с университетом", "Сопроводим переписку, дополнительные запросы и подтверждение места"],
      ["Подготовка к переезду", "Поможем с визовыми документами, жильём и планом выезда"],
    ],
  },
  kz: {
    title: ["Оқуға түсуді ұйымдастыруды өзімізге аламыз.", "ЖОО таңдаудан ұшуға дейін"],
    cta: "Оқуға түсуімді талқылау",
    listLabel: "Қолдауға не кіреді",
    items: [
      ["Университеттер тізімің", "Бағдарламаларды таңдап, түсу мен қаржыландыру мүмкіндігін бағалаймыз"],
      ["Құжаттар шатасусыз", "Тізім құрып, құжаттар жинағы мен аударма талаптарын тексереміз"],
      ["Мотивациялық хат", "Жетістіктеріңді ашып, бағдарлама таңдауыңды түсіндіруге көмектесеміз"],
      ["Өтінімдер уақытында", "Формаларды толтыруға көмектесіп, өтінім беру дедлайндарын бақылаймыз"],
      ["Университетпен байланыс", "Хат алмасуды, қосымша сұрауларды және орынды растауды сүйемелдейміз"],
      ["Көшуге дайындық", "Виза құжаттары, тұрғын үй және жолға шығу жоспарымен көмектесеміз"],
    ],
  },
  en: {
    title: ["We organise your admission.", "From choosing a university to take-off"],
    cta: "Discuss my admission",
    listLabel: "What our support includes",
    items: [
      ["Your university list", "We'll match programmes and assess your chances of admission and funding"],
      ["Documents without confusion", "We'll make a list and check the full set and translation requirements"],
      ["Motivation letter", "We'll help showcase your achievements and explain your choice of programme"],
      ["Applications on time", "We'll help fill in the forms and keep track of application deadlines"],
      ["Contact with the university", "We'll handle correspondence, additional requests and confirming your place"],
      ["Preparing to move", "We'll help with visa documents, housing and your departure plan"],
    ],
  },
};

export const abroadServicesContent = byLocale<ServicesContent>((locale) => {
  const copy = servicesCopy[locale];
  return {
    ...copy,
    items: serviceIcons.map((item, index) => ({ ...item, title: copy.items[index][0], text: copy.items[index][1] })),
  };
});

const timelineCopy: Record<Locale, Omit<TimelineContent, "steps"> & { steps: readonly (readonly [string, string])[] }> = {
  ru: {
    title: ["Твой год", "до университета"],
    cta: "Составить мой план поступления",
    previous: "Предыдущий шаг",
    next: "Следующий шаг",
    gallery: "Шаги поступления",
    progress: "Позиция в карусели шагов",
    steps: [
      ["Твой список университетов", "Подберём программы и оценим шансы на поступление и финансирование"],
      ["Усиливаем заявку", "Язык, экзамены и твои достижения"],
      ["Готовим документы", "Аттестат, рекомендации и мотивационное письмо"],
      ["Подаёмся", "Заявки в университеты и на подходящие стипендии"],
      ["Получаем ответы", "Выбор предложения и подтверждение места"],
      ["Готовимся к вылету", "Виза, жильё и первые шаги в новой стране"],
    ],
  },
  kz: {
    title: ["Сенің жылың", "университетке дейін"],
    cta: "Түсу жоспарымды құру",
    previous: "Алдыңғы қадам",
    next: "Келесі қадам",
    gallery: "Түсу қадамдары",
    progress: "Қадамдар каруселіндегі орын",
    steps: [
      ["Университеттер тізімің", "Бағдарламаларды таңдап, түсу мен қаржыландыру мүмкіндігін бағалаймыз"],
      ["Өтінімді күшейтеміз", "Тіл, емтихандар және сенің жетістіктерің"],
      ["Құжаттарды дайындаймыз", "Аттестат, ұсыныстар және мотивациялық хат"],
      ["Өтінім береміз", "Университеттерге және қолайлы стипендияларға өтінімдер"],
      ["Жауап аламыз", "Ұсынысты таңдау және орынды растау"],
      ["Ұшуға дайындаламыз", "Виза, тұрғын үй және жаңа елдегі алғашқы қадамдар"],
    ],
  },
  en: {
    title: ["Your year", "before university"],
    cta: "Build my admission plan",
    previous: "Previous step",
    next: "Next step",
    gallery: "Admission steps",
    progress: "Position in the steps carousel",
    steps: [
      ["Your university list", "We'll match programmes and assess your chances of admission and funding"],
      ["Strengthening the application", "Language, exams and your achievements"],
      ["Preparing documents", "School certificate, references and motivation letter"],
      ["Applying", "Applications to universities and suitable scholarships"],
      ["Getting answers", "Choosing an offer and confirming your place"],
      ["Getting ready to fly", "Visa, housing and first steps in a new country"],
    ],
  },
};

export const abroadTimelineContent = byLocale<TimelineContent>((locale) => {
  const copy = timelineCopy[locale];
  return {
    ...copy,
    steps: stepIds.map((id, index) => ({ id, title: copy.steps[index][0], text: copy.steps[index][1] })),
  };
});

function faqItems(copy: {
  grades: readonly [string, string];
  certificate: string;
  ielts: readonly [string, string];
  grants: readonly [string, string];
  budget: readonly [string, string];
  start: string;
  rejection: string;
  format: readonly [string, string];
}): readonly AbroadFaqItem[] {
  return [
    { id: "grades", question: copy.grades[0], answer: copy.grades[1], action: true },
    { id: "certificate", question: copy.certificate, answer: 0 },
    { id: "ielts", question: copy.ielts[0], answer: copy.ielts[1] },
    { id: "grants", question: copy.grants[0], answer: copy.grants[1] },
    { id: "budget", question: copy.budget[0], answer: copy.budget[1] },
    { id: "start", question: copy.start, answer: 2 },
    { id: "rejection", question: copy.rejection, answer: 4 },
    { id: "format", question: copy.format[0], answer: copy.format[1] },
  ];
}

export const abroadFaqContent: Record<Locale, FaqContent> = {
  ru: {
    title: ["Ответы", "на ваши", "вопросы"],
    action: "Разберём твои варианты на бесплатной консультации",
    actionShort: "Бесплатная консультация",
    sticker: ["Бесплатная", "консультация"],
    items: faqItems({
      grades: [
        "Можно поступить со средними оценками?",
        "Да, подходящие варианты бывают и без идеального аттестата. Посмотрим на предметы, язык и требования программ.",
      ],
      certificate: "Хватит казахстанского аттестата или нужен Foundation?",
      ielts: [
        "Что делать, если IELTS ещё нет?",
        "Без языкового сертификата заявку не примут, поэтому подготовку к IELTS начинаем заранее, примерно за 10 месяцев до старта учёбы. Подтянуть уровень с B1 до нужного балла за пару месяцев не получается, поэтому закладываем запас на пересдачу: нужный балл с первого раза получают не все.",
      ],
      grants: [
        "Можно получить грант или стипендию?",
        "Да. Полное покрытие получают немногие, а частичное вполне реально. Стипендии вузов дают за академические результаты, госпрограммы у каждой страны свои. Решают баллы, эссе и портфолио, а заявку на стипендию готовим параллельно с поступлением.",
      ],
      budget: [
        "Сколько денег понадобится и сколько стоят услуги GSC?",
        "Бюджет зависит от страны и вуза. Кроме обучения, нужно учесть проживание, визу и страховку, а также депозит на счёте, который требуют почти везде. Первичная консультация бесплатная: на ней собираем смету по конкретной стране и рассказываем о стоимости сопровождения.",
      ],
      start: "Когда начинать подготовку?",
      rejection: "Что будет, если университет откажет?",
      format: [
        "Можно прийти с родителями или созвониться онлайн?",
        "Консультация проходит в Zoom или на встрече в центре и длится около 45 минут. Удобный формат выберем при записи, а остальные вопросы, в том числе об участии родителей, можно уточнить у менеджера.",
      ],
    }),
  },
  kz: {
    title: ["Сұрақтар", "мен", "жауаптар"],
    action: "Нұсқаларыңды тегін кеңесте талдаймыз",
    actionShort: "Тегін кеңес",
    sticker: ["Тегін", "кеңес"],
    items: faqItems({
      grades: [
        "Орташа бағалармен түсуге бола ма?",
        "Иә, мінсіз аттестатсыз да қолайлы нұсқалар болады. Пәндерге, тілге және бағдарлама талаптарына қараймыз.",
      ],
      certificate: "Қазақстандық аттестат жеткілікті ме, әлде Foundation қажет пе?",
      ielts: [
        "IELTS әлі жоқ болса, не істеу керек?",
        "Тіл сертификатынсыз өтінім қабылданбайды, сондықтан IELTS-ке дайындықты алдын ала, оқу басталуынан шамамен 10 ай бұрын бастаймыз. Деңгейді B1-ден қажетті балға бірер айда көтеру мүмкін емес, сондықтан қайта тапсыруға уақыт қалдырамыз: қажетті балды бірінші реттен бәрі ала бермейді.",
      ],
      grants: [
        "Грант немесе стипендия алуға бола ма?",
        "Иә. Толық жабуды санаулылар алады, ал ішінара жабу әбден мүмкін. ЖОО стипендиялары академиялық нәтиже үшін беріледі, мемлекеттік бағдарламалар әр елде өзінікі. Балл, эссе және портфолио шешеді, ал стипендияға өтінімді оқуға түсумен қатар дайындаймыз.",
      ],
      budget: [
        "Қанша ақша қажет және GSC қызметтері қанша тұрады?",
        "Бюджет елге және ЖОО-ға байланысты. Оқу ақысынан бөлек тұруды, виза мен сақтандыруды, сондай-ақ барлық жерде дерлік талап етілетін шоттағы депозитті ескеру керек. Алғашқы кеңес тегін: онда нақты ел бойынша смета жинап, қолдау құнын айтамыз.",
      ],
      start: "Дайындықты қашан бастау керек?",
      rejection: "Университет бас тартса, не болады?",
      format: [
        "Ата-анаммен келуге немесе онлайн сөйлесуге бола ма?",
        "Кеңес Zoom-да немесе орталықтағы кездесуде өтеді және шамамен 45 минутқа созылады. Ыңғайлы форматты жазылу кезінде таңдаймыз, ал басқа сұрақтарды, соның ішінде ата-ананың қатысуы туралы, менеджерден нақтылауға болады.",
      ],
    }),
  },
  en: {
    title: ["Answers", "to your", "questions"],
    action: "Let's go through your options in a free consultation",
    actionShort: "Free consultation",
    sticker: ["Free", "consultation"],
    items: faqItems({
      grades: [
        "Can I get in with average grades?",
        "Yes, there are suitable options even without a perfect school record. We'll look at your subjects, language level and programme requirements.",
      ],
      certificate: "Is a Kazakh school certificate enough, or do I need Foundation?",
      ielts: [
        "What if I don't have IELTS yet?",
        "Without a language certificate the application won't be accepted, so we start IELTS preparation early, about 10 months before your studies begin. You can't lift your level from B1 to the required score in a couple of months, so we leave time for a retake: not everyone gets the required score on the first try.",
      ],
      grants: [
        "Can I get a grant or scholarship?",
        "Yes. Full coverage goes to a few, but partial coverage is quite realistic. Universities award scholarships for academic results, and each country has its own government programmes. Scores, essays and portfolio decide, and we prepare the scholarship application alongside the university application.",
      ],
      budget: [
        "How much money will I need, and how much do GSC services cost?",
        "The budget depends on the country and university. Besides tuition, you need to account for accommodation, visa and insurance, plus a deposit in your account, which is required almost everywhere. The initial consultation is free: we put together an estimate for the specific country and tell you the cost of our support.",
      ],
      start: "When should I start preparing?",
      rejection: "What happens if a university rejects me?",
      format: [
        "Can I come with my parents or have a call online?",
        "The consultation takes place on Zoom or at a meeting at the centre and lasts about 45 minutes. We'll choose a convenient format when you book, and you can check other questions, including your parents joining, with the manager.",
      ],
    }),
  },
};
