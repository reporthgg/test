import type { Locale } from "@/i18n/config";

type SchoolPageContent = {
  eyebrow: string;
  heading: [string, string, string, string];
  description: string;
  trial: string;
  levelTest: string;
  smallGroups: string;
  format: string;
  photoAlts: [string, string, string];
  since: string;
  year: string;
  students: string;
  partners: string;
  certificateTitle: string;
  certificateResult: string;
  certificateAccent: string;
  certificateDescription: string;
  certificateAlt: string;
  cefr: string;
  certificateSteps: [string, string, string];
};

export const schoolPageContent: Record<Locale, SchoolPageContent> = {
  ru: {
    eyebrow: "Языковая школа GSC Study",
    heading: ["Английский,", "в котором", "вы ", "уверены"],
    description: "Для учёбы, работы и общения. Подберём программу под ваш уровень и цель",
    trial: "Попробовать бесплатно",
    levelTest: "Узнать свой уровень",
    smallGroups: "До 8 человек в группе",
    format: "В центре или онлайн",
    photoAlts: ["Студент языковой школы", "Студенты занимаются английским", "Занятие с преподавателем"],
    since: "С 2011",
    year: "года",
    students: "студентов",
    partners: "Опыт школы и партнёры",
    certificateTitle: "Новый уровень.",
    certificateResult: "Видимый",
    certificateAccent: "результат",
    certificateDescription: "В конце уровня вы проходите итоговый тест и получаете сертификат GSC Study с указанием достигнутого уровня по шкале CEFR",
    certificateAlt: "Образец сертификата GSC Study о завершении General English и подтверждении уровня B2",
    cefr: "Шкала уровней CEFR",
    certificateSteps: ["Итоговый тест", "Достигнутый уровень", "Следующий этап обучения"],
  },
  en: {
    eyebrow: "GSC Study Language School",
    heading: ["English", "you can", "feel ", "confident in"],
    description: "For study, work and everyday life. We will find a programme for your level and goals",
    trial: "Try a free lesson",
    levelTest: "Check your level",
    smallGroups: "Up to 8 students per group",
    format: "At a centre or online",
    photoAlts: ["Language school student", "Students learning English", "A lesson with a teacher"],
    since: "Since",
    year: "2011",
    students: "students",
    partners: "Our experience and partners",
    certificateTitle: "A new level.",
    certificateResult: "Visible",
    certificateAccent: "results",
    certificateDescription: "At the end of each level, you take a final test and receive a GSC Study certificate stating the level you have achieved on the CEFR scale",
    certificateAlt: "Sample GSC Study certificate for completing General English at CEFR level B2",
    cefr: "CEFR language levels",
    certificateSteps: ["Final test", "Your achieved level", "The next stage of learning"],
  },
  kz: {
    eyebrow: "GSC Study тіл мектебі",
    heading: ["Ағылшын", "тілінде", "", "сенімді болыңыз"],
    description: "Оқуға, жұмысқа және қарым-қатынасқа. Деңгейіңіз бен мақсатыңызға сай бағдарлама таңдаймыз",
    trial: "Тегін байқап көру",
    levelTest: "Деңгейімді білу",
    smallGroups: "Топта 8 адамға дейін",
    format: "Орталықта немесе онлайн",
    photoAlts: ["Тіл мектебінің студенті", "Ағылшын тілін үйреніп жатқан студенттер", "Мұғаліммен сабақ"],
    since: "2011",
    year: "жылдан",
    students: "студент",
    partners: "Мектеп тәжірибесі және серіктестер",
    certificateTitle: "Жаңа деңгей.",
    certificateResult: "Айқын",
    certificateAccent: "нәтиже",
    certificateDescription: "Әр деңгейдің соңында қорытынды тест тапсырып, CEFR шкаласы бойынша жеткен деңгейіңіз көрсетілген GSC Study сертификатын аласыз",
    certificateAlt: "General English курсын аяқтап, B2 деңгейін растаған GSC Study сертификатының үлгісі",
    cefr: "CEFR деңгейлер шкаласы",
    certificateSteps: ["Қорытынды тест", "Жеткен деңгейіңіз", "Оқудың келесі кезеңі"],
  },
};
