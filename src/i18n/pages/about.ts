import type { Locale } from "@/i18n/config";


// Словарь страницы «О нас».
// ru — источник; kz/en — перевод (вычитать).
const dict = {
  ru: {
    hero: {
      eyebrow: "С 2011 года",
      title: "GSC Study: образование без границ с 2011 года",
      text: "Помогаем студентам учить языки, готовиться к международным экзаменам и поступать в зарубежные университеты. Подбираем программы и сопровождаем подачу документов.",
      cta: "Наша миссия",
      badge: {
        value: "15+ лет",
        label: "работы в образовании",
      },
    },
    stats: [
      { value: "15+", label: "лет на рынке" },
      { value: "15 000+", label: "студентов обучено" },
      { value: "3", label: "центра", sub: "2 в Астане, 1 в Алматы" },
      { value: "643", label: "поступления в 246 вузов", sub: "25+ стран" },
    ],
    journey: {
      title: "Наш путь",
      p1: "GSC Study основан в 2011 году, чтобы помогать студентам из Казахстана поступать в зарубежные университеты. Мы начинали с небольшого консультационного офиса, а затем открыли учебные центры в Алматы и Астане.",
      p2: "На консультации обсуждаем интересы студента, его оценки, уровень языка и бюджет. По этим данным подбираем университеты, составляем план подготовки и помогаем собрать документы для поступления.",
      p3: "В центрах Алматы и Астаны проводим языковые курсы и подготовку к экзаменам. Развиваем учебные программы и сотрудничаем с международными партнёрами по вопросам поступления.",
    },
    values: {
      title: "Наши ценности",
      subtitle: "Принципы, на которых строится наш подход к обучению и консалтингу.",
      items: [
        { title: "Качество", text: "Подбираем учебную программу по уровню студента и требованиям выбранного вуза." },
        { title: "Ориентация на результат", text: "Оцениваем работу по поступлениям, экзаменационным баллам и прогрессу студентов." },
        { title: "Прозрачность", text: "Честная оценка, понятный маршрут и открытая коммуникация на всех этапах поступления." },
        { title: "Возможности без границ", text: "Помогаем студентам из Казахстана выбирать программы в зарубежных университетах и подавать документы." },
      ],
    },
    partners: {
      title: "Аккредитации и партнёры",
      text: "Международные образовательные организации, с которыми мы сотрудничаем.",
    },
    cta: {
      title: "Планируете поступление?",
      text: "Запишитесь на персональную консультацию. Обсудим ваши цели и составим план поступления.",
      button: "Получить консультацию",
    },
  },

  kz: {
    hero: {
      eyebrow: "2011 жылдан бері",
      title: "GSC Study: 2011 жылдан бері шекарасыз білім",
      text: "Студенттерге тіл үйренуге, халықаралық емтихандарға дайындалуға және шетел университеттеріне түсуге көмектесеміз. Бағдарлама таңдап, құжат тапсыру кезінде қолдау көрсетеміз.",
      cta: "Біздің миссиямыз",
      badge: {
        value: "15+ жыл",
        label: "білім беру саласында",
      },
    },
    stats: [
      { value: "15+", label: "нарықтағы жыл" },
      { value: "15 000+", label: "студент оқыды" },
      { value: "3", label: "орталық", sub: "Астанада 2, Алматыда 1" },
      { value: "643", label: "246 ЖОО-ға қабылдану", sub: "25+ ел" },
    ],
    journey: {
      title: "Біздің жолымыз",
      p1: "GSC Study 2011 жылы Қазақстан студенттеріне шетел университеттеріне түсуге көмектесу үшін құрылды. Жұмысты шағын кеңес беру кеңсесінен бастап, кейін Алматы мен Астанада оқу орталықтарын аштық.",
      p2: "Кеңесте студенттің қызығушылықтарын, бағаларын, тіл деңгейін және бюджетін талқылаймыз. Осы мәліметтерге сүйеніп университеттерді таңдаймыз, дайындық жоспарын құрамыз және түсуге қажетті құжаттарды жинауға көмектесеміз.",
      p3: "Алматы мен Астанадағы орталықтарда тіл курстарын және емтиханға дайындық сабақтарын өткіземіз. Оқу бағдарламаларын дамытып, түсу мәселелері бойынша халықаралық серіктестермен жұмыс істейміз.",
    },
    values: {
      title: "Біздің құндылықтарымыз",
      subtitle: "Оқыту мен консалтингке деген көзқарасымыз негізделген қағидаттар.",
      items: [
        { title: "Сапа", text: "Оқу бағдарламасын студенттің деңгейіне және таңдаған ЖОО талаптарына сай таңдаймыз." },
        { title: "Нәтижеге бағдарлану", text: "Жұмысты студенттердің оқуға түсуі, емтихан балдары және оқу барысындағы ілгерілеуі бойынша бағалаймыз." },
        { title: "Ашықтық", text: "Түсудің барлық кезеңінде әділ баға, түсінікті бағдар және ашық қарым-қатынас." },
        { title: "Шекарасыз мүмкіндіктер", text: "Қазақстан студенттеріне шетел университеттеріндегі бағдарламаларды таңдауға және құжат тапсыруға көмектесеміз." },
      ],
    },
    partners: {
      title: "Аккредитациялар мен серіктестер",
      text: "Біз жұмыс істейтін халықаралық білім беру ұйымдары.",
    },
    cta: {
      title: "Оқуға түсуді жоспарлап жүрсіз бе?",
      text: "Жеке кеңеске жазылыңыз. Мақсаттарыңызды талқылап, оқуға түсу жоспарын құрамыз.",
      button: "Кеңес алу",
    },
  },

  en: {
    hero: {
      eyebrow: "Since 2011",
      title: "GSC Study: education without borders since 2011",
      text: "We help students learn languages, prepare for international exams and apply to universities abroad. We help choose programmes and support the application process.",
      cta: "Our mission",
      badge: {
        value: "15+ years",
        label: "working in education",
      },
    },
    stats: [
      { value: "15+", label: "years on the market" },
      { value: "15,000+", label: "students taught" },
      { value: "3", label: "centres", sub: "2 in Astana, 1 in Almaty" },
      { value: "643", label: "admissions to 246 universities", sub: "25+ countries" },
    ],
    journey: {
      title: "Our journey",
      p1: "GSC Study was founded in 2011 to help students from Kazakhstan apply to universities abroad. We began with a small consulting office and later opened learning centres in Almaty and Astana.",
      p2: "During the consultation, we discuss the student's interests, grades, language level and budget. We use this information to select universities, plan preparation and help gather the required documents.",
      p3: "Our centres in Almaty and Astana offer language courses and exam preparation. We develop our teaching programmes and work with international partners on admissions.",
    },
    values: {
      title: "Our values",
      subtitle: "The principles that shape our approach to teaching and consulting.",
      items: [
        { title: "Quality", text: "We select a study programme based on the student's level and the requirements of their chosen university." },
        { title: "Results-driven", text: "We assess our work through students' admissions, exam scores and learning progress." },
        { title: "Transparency", text: "Honest assessment, a clear route and open communication at every stage of admission." },
        { title: "Opportunity without borders", text: "We help students from Kazakhstan choose programmes at universities abroad and submit applications." },
      ],
    },
    partners: {
      title: "Accreditations & partners",
      text: "The international educational organisations we work with.",
    },
    cta: {
      title: "Planning to apply?",
      text: "Book a personal consultation. We'll discuss your goals and make an admissions plan.",
      button: "Get a consultation",
    },
  },
};

export type AboutDict = typeof dict.ru;
export function getAboutDict(locale: Locale): AboutDict {
  return dict[locale];
}
