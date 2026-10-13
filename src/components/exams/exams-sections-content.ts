import type { Locale } from "@/i18n/config";

export type ExamsChoiceCard = {
  id: "ielts" | "sat";
  logo: string;
  course: string;
  chips: readonly string[];
  text: string;
};

type ChoiceCopy = {
  title: string;
  text: readonly [string, string];
  cta: string;
  action: string;
  cards: readonly ExamsChoiceCard[];
};

const ieltsChips = ["Academic", "General Training"] as const;
const satChips = ["Digital"] as const;

export const examsChoiceContent: Record<Locale, ChoiceCopy> = {
  ru: {
    title: "К чему готовимся?",
    text: ["Нужны оба экзамена?", "Поможем расставить приоритеты в подготовке"],
    cta: "Начать подготовку",
    action: "Начать подготовку",
    cards: [
      { id: "ielts", logo: "IELTS", course: "IELTS", chips: ieltsChips, text: "Английский для учёбы, работы и переезда" },
      { id: "sat", logo: "SAT", course: "Digital SAT", chips: satChips, text: "Английский и математика для поступления в США" },
    ],
  },
  kz: {
    title: "Неге дайындаламыз?",
    text: ["Екі емтихан да керек пе?", "Дайындықтағы басымдықтарды анықтауға көмектесеміз"],
    cta: "Дайындықты бастау",
    action: "Дайындықты бастау",
    cards: [
      { id: "ielts", logo: "IELTS", course: "IELTS", chips: ieltsChips, text: "Оқу, жұмыс және көшу үшін ағылшын тілі" },
      { id: "sat", logo: "SAT", course: "Digital SAT", chips: satChips, text: "АҚШ-қа түсуге арналған ағылшын тілі мен математика" },
    ],
  },
  en: {
    title: "What are we preparing for?",
    text: ["Need both exams?", "We will help you prioritise your preparation"],
    cta: "Start preparation",
    action: "Start preparation",
    cards: [
      { id: "ielts", logo: "IELTS", course: "IELTS", chips: ieltsChips, text: "English for study, work and relocation" },
      { id: "sat", logo: "SAT", course: "Digital SAT", chips: satChips, text: "English and maths for admission to the USA" },
    ],
  },
};

export type ExamsStep = { title: string; text: string };

type StepsCopy = {
  title: readonly [string, string];
  cta: string;
  region: string;
  previous: string;
  next: string;
  progress: string;
  steps: readonly ExamsStep[];
};

export const examsStepsContent: Record<Locale, StepsCopy> = {
  ru: {
    title: ["От первого теста", "до твоего результата"],
    cta: "Составить мой план",
    region: "Этапы подготовки",
    previous: "Предыдущий этап",
    next: "Следующий этап",
    progress: "Позиция в списке этапов",
    steps: [
      { title: "Узнаём твой уровень", text: "Находим сильные стороны и темы, которые нужно подтянуть" },
      { title: "Собираем твой план", text: "Учитываем цель, дату экзамена и время на занятия" },
      { title: "Отрабатываем задания", text: "Разбираем ошибки и учимся справляться с форматом экзамена" },
      { title: "Проверяем прогресс", text: "Проходим пробные экзамены и корректируем подготовку" },
      { title: "Сдаёшь экзамен", text: "Показываешь, чему научился,\nи получаешь официальный результат" },
    ],
  },
  kz: {
    title: ["Алғашқы тесттен", "нәтижеңе дейін"],
    cta: "Жоспарымды құру",
    region: "Дайындық кезеңдері",
    previous: "Алдыңғы кезең",
    next: "Келесі кезең",
    progress: "Кезеңдер тізіміндегі орын",
    steps: [
      { title: "Деңгейіңді анықтаймыз", text: "Күшті жақтарыңды және жетілдіру керек тақырыптарды табамыз" },
      { title: "Жоспарыңды құрамыз", text: "Мақсатыңды, емтихан күнін және сабаққа бөлетін уақытыңды ескереміз" },
      { title: "Тапсырмаларды пысықтаймыз", text: "Қателерді талдап, емтихан форматына бейімделуді үйренеміз" },
      { title: "Прогресті тексереміз", text: "Сынама емтихандардан өтіп, дайындықты түзетеміз" },
      { title: "Емтихан тапсырасың", text: "Үйренгеніңді көрсетіп, ресми нәтиже аласың" },
    ],
  },
  en: {
    title: ["From your first test", "to your result"],
    cta: "Build my plan",
    region: "Preparation steps",
    previous: "Previous step",
    next: "Next step",
    progress: "Position in the list of steps",
    steps: [
      { title: "We find out your level", text: "We identify your strengths and the topics to work on" },
      { title: "We build your plan", text: "We take into account your goal, exam date and study time" },
      { title: "We practise the tasks", text: "We review mistakes and learn to handle the exam format" },
      { title: "We check your progress", text: "We run mock exams and adjust the preparation" },
      { title: "You take the exam", text: "You show what you have learned\nand get your official result" },
    ],
  },
};

export type ExamsFaqItem = { id: string; question: string; answer: string; action?: boolean };

type FaqCopy = {
  title: readonly [string, string, string];
  action: string;
  consultation: readonly [string, string];
  items: readonly ExamsFaqItem[];
};

export const examsFaqContent: Record<Locale, FaqCopy> = {
  ru: {
    title: ["Ответы", "на ваши", "вопросы"],
    action: "Пройти диагностику",
    consultation: ["Бесплатная", "консультация"],
    items: [
      {
        id: "free",
        question: "Диагностика действительно бесплатная?",
        answer: "Да. Ты можешь пройти тест и получить разбор, чтобы понять, с чего начинать подготовку",
        action: true,
      },
      {
        id: "weak",
        question: "Что делать, если английский пока слабый?",
        answer: "Тогда сначала общий курс. Если уровень ниже B1, готовиться к IELTS рано: экзамен проверяет владение языком, а не знание формата, и никакая стратегия не заменит недостающий словарный запас",
      },
      {
        id: "both",
        question: "Мне обязательно сдавать и IELTS, и SAT?",
        answer: "Не всегда. IELTS нужен для поступления в вузы Великобритании, Канады и ОАЭ, а Digital SAT нужен американским университетам и части стипендий. Какие экзамены нужны тебе, зависит от выбранных стран и программ, приоритеты поможем расставить на консультации",
      },
      {
        id: "time",
        question: "За сколько времени я подготовлюсь?",
        answer: "В среднем за 3-6 месяцев. Для IELTS с B1 до 6.5 обычно уходит около полугода, а с B2 до 7.0 нужно три-четыре месяца. Точный срок назовём после диагностики, когда увидим результаты по секциям",
      },
      {
        id: "site-test",
        question: "Тест на сайте покажет мой будущий экзаменационный балл?",
        answer: "Нет, он помогает оценить текущий уровень и понять, что подтянуть. Реальный стартовый балл покажет диагностика: полный пробный тест в условиях экзамена",
      },
      {
        id: "registration",
        question: "Поможете с регистрацией на экзамен?",
        answer: "Подскажем даты, площадки и порядок регистрации и поможем выбрать дату так, чтобы результат пришёл до дедлайна подачи документов. Саму регистрацию ты проходишь от своего имени",
      },
    ],
  },
  kz: {
    title: ["Сұрақтар", "мен", "жауаптар"],
    action: "Диагностикадан өту",
    consultation: ["Тегін", "кеңес"],
    items: [
      {
        id: "free",
        question: "Диагностика шынымен тегін бе?",
        answer: "Иә. Тесттен өтіп, талдау аласың, сөйтіп дайындықты неден бастау керегін түсінесің",
        action: true,
      },
      {
        id: "weak",
        question: "Ағылшын тілім әлі әлсіз болса, не істеу керек?",
        answer: "Онда алдымен жалпы курс. Деңгейің B1-ден төмен болса, IELTS-ке дайындалуға ерте: емтихан форматты білуді емес, тілді меңгеруді тексереді, ал ешқандай стратегия жетіспейтін сөздік қорды алмастыра алмайды",
      },
      {
        id: "both",
        question: "IELTS-ті де, SAT-ты да тапсыру міндетті ме?",
        answer: "Әрдайым емес. IELTS Ұлыбритания, Канада және БАӘ жоғары оқу орындарына түсу үшін қажет, ал Digital SAT Америка университеттері мен кейбір стипендияларға керек. Саған қай емтихан керегі таңдаған елдер мен бағдарламаларға байланысты, басымдықтарды кеңесте анықтауға көмектесеміз",
      },
      {
        id: "time",
        question: "Қанша уақытта дайындаламын?",
        answer: "Орта есеппен 3-6 ай. IELTS бойынша B1-ден 6.5-ке дейін әдетте жарты жылдай кетеді, ал B2-ден 7.0-ге дейін үш-төрт ай қажет. Нақты мерзімді диагностикадан кейін, секциялар бойынша нәтижелерді көргенде айтамыз",
      },
      {
        id: "site-test",
        question: "Сайттағы тест болашақ емтихан балымды көрсете ме?",
        answer: "Жоқ, ол ағымдағы деңгейіңді бағалап, нені жетілдіру керегін түсінуге көмектеседі. Нақты бастапқы балды диагностика көрсетеді: емтихан жағдайындағы толық сынама тест",
      },
      {
        id: "registration",
        question: "Емтиханға тіркелуге көмектесесіздер ме?",
        answer: "Күндерді, алаңдарды және тіркелу тәртібін айтып береміз әрі нәтиже құжат тапсыру мерзіміне дейін келетіндей күн таңдауға көмектесеміз. Тіркелудің өзін өз атыңнан өтесің",
      },
    ],
  },
  en: {
    title: ["Answers", "to your", "questions"],
    action: "Take the diagnostic",
    consultation: ["Free", "consultation"],
    items: [
      {
        id: "free",
        question: "Is the diagnostic really free?",
        answer: "Yes. You can take the test and get a review to understand where to start your preparation",
        action: true,
      },
      {
        id: "weak",
        question: "What if my English is still weak?",
        answer: "Then a general course comes first. If your level is below B1, it is too early to prepare for IELTS: the exam tests language proficiency, not knowledge of the format, and no strategy can make up for missing vocabulary",
      },
      {
        id: "both",
        question: "Do I have to take both IELTS and SAT?",
        answer: "Not always. IELTS is required for admission to universities in the UK, Canada and the UAE, while the Digital SAT is needed for American universities and some scholarships. Which exams you need depends on your chosen countries and programmes, and we will help you set priorities at the consultation",
      },
      {
        id: "time",
        question: "How long will it take me to prepare?",
        answer: "On average 3-6 months. For IELTS, going from B1 to 6.5 usually takes about half a year, while B2 to 7.0 takes three to four months. We will name the exact timeframe after the diagnostic, once we see your section results",
      },
      {
        id: "site-test",
        question: "Will the test on the website show my future exam score?",
        answer: "No, it helps you estimate your current level and see what to work on. Your real starting score will come from the diagnostic: a full mock test under exam conditions",
      },
      {
        id: "registration",
        question: "Will you help me register for the exam?",
        answer: "We will tell you the dates, venues and registration procedure, and help you choose a date so the result arrives before the application deadline. You complete the registration itself in your own name",
      },
    ],
  },
};
