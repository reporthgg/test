import type { Locale } from "@/i18n/config";

type DirectionCopy = {
  title: string;
  description: string;
  cta: string;
};

type ProgramsCopy = {
  directionsTitle: readonly [string, string, string];
  directionsIntro: string;
  directions: readonly [DirectionCopy, DirectionCopy, DirectionCopy, DirectionCopy];
  languageFormats: readonly [string, string, string];
  testsTitle: readonly [string, string];
  testsIntro: string;
  testTitles: { general: string; kids: string };
  years: string;
  questionForms: { one: string; few: string; other: string };
  writtenForms: { one: string; few: string; other: string };
  minutes: string;
  noTimeLimit: string;
  startTest: string;
  allTests: string;
  previous: string;
  next: string;
  testsEmpty: string;
  abroadTitle: readonly [string, string];
  abroadLead: string;
  abroadDetails: string;
  abroadSummary: string;
  consultationTags: readonly [string, string, string];
  consultationCta: string;
  studentName: string;
  studentFollowers: string;
  studentImageAlt: string;
  watchStudentVideo: string;
  stepsLabel: string;
  steps: readonly [
    { title: string; description: string },
    { title: string; description: string },
    { title: string; description: string },
  ];
  studentsImageAlt: string;
  discussAdmission: string;
};

export const programsContent: Record<Locale, ProgramsCopy> = {
  ru: {
    directionsTitle: ["Экосистема", "для будущего", "вашего ребёнка"],
    directionsIntro: "От первых занятий языком до поступления в зарубежный университет",
    directions: [
      {
        title: "Языковые курсы",
        description: "Английский и китайский для общения, учёбы и новых возможностей",
        cta: "Смотреть курсы",
      },
      {
        title: "Международные\nэкзамены",
        description: "Подготовка к IELTS и SAT с учётом вашего уровня и цели",
        cta: "Подготовка к экзаменам",
      },
      {
        title: "Образование\nза рубежом",
        description: "Подбор университета, подготовка документов и сопровождение поступления",
        cta: "Программы за рубежом",
      },
      {
        title: "Зарубежные лагеря",
        description: "Языковая практика, самостоятельность и знакомство с международной средой",
        cta: "Смотреть лагеря",
      },
    ],
    languageFormats: ["группы до 8 человек", "индивидуально", "онлайн"],
    testsTitle: ["Узнайте свой уровень", "бесплатно"],
    testsIntro: "Выберите тест, чтобы понять, с чего начать подготовку",
    testTitles: { general: "General English", kids: "English for Kids" },
    years: "лет",
    questionForms: { one: "вопрос", few: "вопроса", other: "вопросов" },
    writtenForms: { one: "письменное задание", few: "письменных задания", other: "письменных заданий" },
    minutes: "мин",
    noTimeLimit: "без лимита",
    startTest: "Пройти тест",
    allTests: "Все тесты",
    previous: "Предыдущие тесты",
    next: "Следующие тесты",
    testsEmpty: "Тесты готовятся к публикации. Пока можно записаться на бесплатный разбор.",
    abroadTitle: ["Узнайте, с чего начать", "поступление за рубеж"],
    abroadLead: "За 15 минут онлайн эксперт разберёт вашу ситуацию:",
    abroadDetails: " цели, уровень подготовки и сроки.",
    abroadSummary: "Вы поймёте, какие варианты рассматривать и что делать в первую очередь.",
    consultationTags: ["бесплатно", "онлайн", "15 минут"],
    consultationCta: "Получить бесплатный разбор",
    studentName: "Аминка-витаминка",
    studentFollowers: "6,4 млн подписчиков на YouTube",
    studentImageAlt: "Аминка-витаминка в университетском кампусе",
    watchStudentVideo: "Смотреть историю Аминки в Instagram",
    stepsLabel: "Этапы поступления",
    steps: [
      {
        title: "Цели и возможности",
        description: "Обсуждаем интересы, уровень языка, бюджет и сроки поступления",
      },
      {
        title: "Подготовка",
        description: "Определяем необходимые экзамены и план подготовки",
      },
      {
        title: "Поступление",
        description: "Подбираем программы, готовим документы и сопровождаем подачу заявок",
      },
    ],
    studentsImageAlt: "Студенты GSC Study",
    discussAdmission: "Обсудить поступление",
  },
  kz: {
    directionsTitle: ["Балаңыздың", "болашағына", "арналған экожүйе"],
    directionsIntro: "Алғашқы тіл сабағынан шетел университетіне түскенге дейін",
    directions: [
      {
        title: "Тіл курстары",
        description: "Қарым-қатынас, оқу және жаңа мүмкіндіктер үшін ағылшын және қытай тілдері",
        cta: "Курстарды көру",
      },
      {
        title: "Халықаралық\nемтихандар",
        description: "Деңгейіңіз бен мақсатыңызға сай IELTS және SAT емтихандарына дайындық",
        cta: "Емтиханға дайындық",
      },
      {
        title: "Шетелде\nбілім алу",
        description: "Университет таңдау, құжат дайындау және оқуға түсуге қолдау",
        cta: "Шетелдік бағдарламалар",
      },
      {
        title: "Шетелдік лагерьлер",
        description: "Тілдік тәжірибе, дербестік және халықаралық ортамен танысу",
        cta: "Лагерьлерді көру",
      },
    ],
    languageFormats: ["8 адамға дейінгі топтар", "жеке сабақтар", "онлайн"],
    testsTitle: ["Деңгейіңізді", "тегін анықтаңыз"],
    testsIntro: "Дайындықты неден бастау керегін білу үшін тест таңдаңыз",
    testTitles: { general: "Жалпы ағылшын тілі", kids: "Балаларға ағылшын тілі" },
    years: "жас",
    questionForms: { one: "сұрақ", few: "сұрақ", other: "сұрақ" },
    writtenForms: { one: "жазбаша тапсырма", few: "жазбаша тапсырма", other: "жазбаша тапсырма" },
    minutes: "мин",
    noTimeLimit: "шектеусіз",
    startTest: "Тесттен өту",
    allTests: "Барлық тесттер",
    previous: "Алдыңғы тесттер",
    next: "Келесі тесттер",
    testsEmpty: "Тесттер жариялауға дайындалуда. Әзірге тегін кеңеске жазыла аласыз.",
    abroadTitle: ["Шетелге оқуға түсуді", "неден бастау керек?"],
    abroadLead: "Сарапшы 15 минуттық онлайн кездесуде жағдайыңызды талдайды:",
    abroadDetails: " мақсатыңыз, дайындық деңгейіңіз және мерзімдер.",
    abroadSummary: "Қандай нұсқаларды қарастыру және алдымен не істеу керегін білесіз.",
    consultationTags: ["тегін", "онлайн", "15 минут"],
    consultationCta: "Тегін кеңес алу",
    studentName: "Аминка-витаминка",
    studentFollowers: "YouTube желісінде 6,4 млн жазылушы",
    studentImageAlt: "Аминка-витаминка университет кампусында",
    watchStudentVideo: "Аминканың оқиғасын Instagram-да көру",
    stepsLabel: "Оқуға түсу кезеңдері",
    steps: [
      {
        title: "Мақсат пен мүмкіндік",
        description: "Қызығушылық, тіл деңгейі, бюджет және оқуға түсу мерзімін талқылаймыз",
      },
      {
        title: "Дайындық",
        description: "Қажетті емтихандар мен дайындық жоспарын анықтаймыз",
      },
      {
        title: "Оқуға түсу",
        description: "Бағдарламаларды таңдап, құжаттарды дайындаймыз және өтініш беруге көмектесеміз",
      },
    ],
    studentsImageAlt: "GSC Study студенттері",
    discussAdmission: "Оқуға түсуді талқылау",
  },
  en: {
    directionsTitle: ["An ecosystem", "for your child's", "future"],
    directionsIntro: "From the first language lesson to admission to a university abroad",
    directions: [
      {
        title: "Language courses",
        description: "English and Chinese for communication, study and new opportunities",
        cta: "Explore courses",
      },
      {
        title: "International\nexams",
        description: "IELTS and SAT preparation tailored to your level and goals",
        cta: "Prepare for exams",
      },
      {
        title: "Education\nabroad",
        description: "University selection, application documents and admission support",
        cta: "Programmes abroad",
      },
      {
        title: "Camps abroad",
        description: "Language practice, independence and an introduction to an international environment",
        cta: "Explore camps",
      },
    ],
    languageFormats: ["groups of up to 8", "one-to-one", "online"],
    testsTitle: ["Find out your level", "for free"],
    testsIntro: "Choose a test to find out where to start your preparation",
    testTitles: { general: "General English", kids: "English for Kids" },
    years: "years",
    questionForms: { one: "question", few: "questions", other: "questions" },
    writtenForms: { one: "writing task", few: "writing tasks", other: "writing tasks" },
    minutes: "min",
    noTimeLimit: "no time limit",
    startTest: "Take the test",
    allTests: "All tests",
    previous: "Previous tests",
    next: "Next tests",
    testsEmpty: "Tests are being prepared for publication. You can book a free consultation in the meantime.",
    abroadTitle: ["Find out how to start", "your study abroad journey"],
    abroadLead: "In 15 minutes online, an expert will review your situation:",
    abroadDetails: " your goals, current level and timeline.",
    abroadSummary: "You will understand which options to consider and what to do first.",
    consultationTags: ["free", "online", "15 minutes"],
    consultationCta: "Get a free consultation",
    studentName: "Aminka Vitaminka",
    studentFollowers: "6.4 million YouTube subscribers",
    studentImageAlt: "Aminka Vitaminka on a university campus",
    watchStudentVideo: "Watch Aminka's story on Instagram",
    stepsLabel: "Admission steps",
    steps: [
      {
        title: "Goals and opportunities",
        description: "We discuss your interests, language level, budget and admission timeline",
      },
      {
        title: "Preparation",
        description: "We identify the exams you need and plan your preparation",
      },
      {
        title: "Admission",
        description: "We select programmes, prepare documents and support your applications",
      },
    ],
    studentsImageAlt: "GSC Study students",
    discussAdmission: "Discuss your admission",
  },
};
