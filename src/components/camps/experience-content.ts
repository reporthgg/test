import type { Locale } from "@/i18n/config";

type LocalizedText = Record<Locale, string>;
type ExperiencePoint = { title: LocalizedText; description: LocalizedText };

function text(ru: string, kz: string, en: string): LocalizedText {
  return { ru, kz, en };
}

export const experienceContent = {
  ru: {
    holidays: "Каникулы",
    includedIntro: "В стоимость входит всё: от перелёта и проживания до обучения и экскурсий. Вам остаётся предусмотреть карманные деньги",
    estimate: ["Получить", "расчёт"],
    scheduleTitle: ["Как выглядит", "день в лагере"],
    careTitle: ["Забота о ребёнке", "на каждом этапе"],
    stepsTitle: ["От первой консультации", "до вылета"],
    plan: "Составить план поездки",
    photos: [
      "Праздник в летнем лагере Kings Young Learners",
      "Участница поездки в Disneyland",
      "Участник лагеря рассказывает о поездке",
    ],
    mobilePhotos: [
      "Ученицы GSC Study",
      "Городская экскурсия во время поездки",
      "Эйфелева башня вечером",
    ],
  },
  kz: {
    holidays: "Демалыс",
    includedIntro: "Бағаға ұшу мен тұрудан бастап оқу мен экскурсияларға дейін бәрі кіреді. Сізге тек қалта ақшасын қарастыру қалады",
    estimate: ["Бағасын", "есептеу"],
    scheduleTitle: ["Лагерьдегі күн", "қалай өтеді"],
    careTitle: ["Балаға қамқорлық", "әр кезеңде"],
    stepsTitle: ["Алғашқы кеңестен", "ұшуға дейін"],
    plan: "Сапар жоспарын құру",
    photos: [
      "Kings Young Learners жазғы лагеріндегі мереке",
      "Disneyland-тағы сапарға қатысушы",
      "Лагерь қатысушысы сапар туралы айтып отыр",
    ],
    mobilePhotos: [
      "GSC Study оқушылары",
      "Сапар кезіндегі қала экскурсиясы",
      "Кешкі Эйфель мұнарасы",
    ],
  },
  en: {
    holidays: "Holidays",
    includedIntro: "Everything is included: flights, accommodation, classes and excursions. All you need to budget for is spending money",
    estimate: ["Get a", "quote"],
    scheduleTitle: ["What a day", "at camp looks like"],
    careTitle: ["Care for your child", "at every stage"],
    stepsTitle: ["From your first consultation", "to departure"],
    plan: "Plan your trip",
    photos: [
      "A celebration at Kings Young Learners summer camp",
      "A camp participant visiting Disneyland",
      "A camp student sharing his experience",
    ],
    mobilePhotos: [
      "GSC Study students",
      "A city excursion during the trip",
      "The Eiffel Tower in the evening",
    ],
  },
} satisfies Record<Locale, {
  holidays: string;
  includedIntro: string;
  estimate: readonly string[];
  scheduleTitle: readonly string[];
  careTitle: readonly string[];
  stepsTitle: readonly string[];
  plan: string;
  photos: readonly string[];
  mobilePhotos: readonly string[];
}>;

export const includedItems = [
  {
    id: "english",
    title: text("Английский каждый день", "Күн сайын ағылшын тілі", "English every day"),
    description: text(
      "Занятия и практика в международной среде",
      "Халықаралық ортадағы сабақтар мен тәжірибе",
      "Classes and practice in an international setting",
    ),
  },
  {
    id: "accommodation",
    title: text("Проживание и питание", "Тұру және тамақтану", "Accommodation and meals"),
    description: text(
      "Размещение в кампусе или резиденции и трёхразовое питание",
      "Кампуста немесе резиденцияда тұру және үш мезгіл тамақтану",
      "Campus or residence accommodation and three meals a day",
    ),
  },
  {
    id: "excursions",
    title: text("Экскурсии и развлечения", "Экскурсиялар мен ойын-сауық", "Excursions and entertainment"),
    description: text(
      "Знакомство с городом, поездки и совместные активности",
      "Қаламен танысу, саяхаттар және ортақ іс-шаралар",
      "City visits, trips and group activities",
    ),
  },
  {
    id: "flight",
    title: text("Перелёт и виза", "Ұшу және виза", "Flights and visa"),
    description: text(
      "Авиабилеты и организация визового оформления",
      "Әуе билеттері және виза рәсімдеуді ұйымдастыру",
      "Air tickets and help arranging the visa",
    ),
  },
  {
    id: "curator",
    title: text("Опытный куратор", "Тәжірибелі жетекші", "An experienced group leader"),
    description: text(
      "Сопровождение группы и помощь на протяжении поездки",
      "Сапар бойы топты сүйемелдеу және көмек көрсету",
      "Group supervision and support throughout the trip",
    ),
  },
  {
    id: "insurance",
    title: text("Медицинская страховка", "Медициналық сақтандыру", "Medical insurance"),
    description: text(
      "Страхование на весь период путешествия",
      "Сапардың бүкіл мерзіміне сақтандыру",
      "Insurance cover for the entire trip",
    ),
  },
] satisfies readonly (ExperiencePoint & { id: string })[];

export const scheduleItems = [
  {
    id: "breakfast",
    time: "8:00",
    title: text("Завтрак", "Таңғы ас", "Breakfast"),
    description: text(
      "В столовой кампуса вместе с группой",
      "Топпен бірге кампус асханасында",
      "In the campus dining hall with the group",
    ),
  },
  {
    id: "english",
    time: "9:00-12:30",
    notch: "pink",
    title: text("Уроки английского", "Ағылшын тілі", "English lessons"),
    description: text(
      "Три урока в международной группе своего уровня. Уровень определяют тестом в первый день",
      "Өз деңгейіне сай халықаралық топта үш сабақ. Деңгей бірінші күні тест арқылы анықталады",
      "Three lessons in an international group at your level, determined by a test on the first day",
    ),
  },
  {
    id: "lunch",
    time: "13:00-14:00",
    notch: "rose",
    title: text("Обед", "Түскі ас", "Lunch"),
    description: text(
      "И свободный час на территории",
      "Және кампус аумағында бір сағат бос уақыт",
      "Followed by an hour of free time on campus",
    ),
  },
  {
    id: "activity",
    time: "14:00-18:00",
    notch: "blue",
    title: text("Экскурсия или активность", "Экскурсия немесе іс-шара", "Excursion or activity"),
    mobileTitle: text("Туры и активность", "Турлар мен іс-шаралар", "Tours and activities"),
    description: text(
      "Город, музей, спорт или мастер-класс по программе смены",
      "Лагерь бағдарламасы бойынша қала, мұражай, спорт немесе шеберлік сабағы",
      "City visits, museums, sport or workshops on the camp programme",
    ),
  },
  {
    id: "evening",
    time: "19:00-22:00",
    notch: "green",
    title: text("Ужин и вечерняя программа", "Кешкі ас және кешкі бағдарлама", "Dinner and evening programme"),
    mobileTitle: text("Ужин и развлечение", "Кешкі ас, ойын-сауық", "Dinner and entertainment"),
    description: text(
      "Игры, кино, дискотека или квиз с другими группами",
      "Басқа топтармен ойындар, кино, би кеші немесе викторина",
      "Games, films, discos or quizzes with other groups",
    ),
  },
  {
    id: "bedtime",
    time: "22:00",
    notch: "yellow",
    title: text("Отбой", "Ұйқы уақыты", "Lights out"),
    description: text(
      "Вожатые проверяют комнаты, сопровождающий пишет родителям в общий чат",
      "Тәлімгерлер бөлмелерді тексереді, жетекші ата-аналарға ортақ чатта хабарлама жазады",
      "Counsellors check the rooms and the group leader updates parents in the group chat",
    ),
  },
] satisfies readonly (ExperiencePoint & {
  id: string;
  time: string;
  notch?: string;
  mobileTitle?: LocalizedText;
})[];

export const careItems = [
  {
    color: "blue",
    title: text("Опытный куратор", "Тәжірибелі жетекші", "An experienced group leader"),
    description: text(
      "Сопровождает группу от вылета до возвращения и помогает с любыми вопросами в поездке",
      "Топты ұшудан оралғанға дейін сүйемелдеп, сапардағы кез келген мәселені шешуге көмектеседі",
      "Accompanies the group from departure to return and helps with any questions during the trip",
    ),
  },
  {
    color: "pink",
    title: text("Связь 24/7", "Тәулік бойы байланыс", "24/7 contact"),
    description: text(
      "Общий чат, новости поездки и возможность связаться с куратором",
      "Ортақ чат, сапар жаңалықтары және жетекшімен байланысу мүмкіндігі",
      "A group chat, trip updates and a direct line to the group leader",
    ),
  },
  {
    color: "green",
    title: text("Комфортные условия", "Жайлы жағдай", "Comfortable accommodation"),
    description: text(
      "Заранее показываем школу, комнаты и условия размещения",
      "Мектепті, бөлмелерді және тұру жағдайын алдын ала көрсетеміз",
      "We show you the school, rooms and accommodation arrangements in advance",
    ),
  },
  {
    color: "yellow",
    title: text("Свободное время под присмотром", "Бақылаудағы бос уақыт", "Supervised free time"),
    description: text(
      "Ребята отдыхают на территории школы под наблюдением команды",
      "Балалар мектеп аумағында команда бақылауымен демалады",
      "Students enjoy free time on school grounds under the team's supervision",
    ),
  },
  {
    color: "rose",
    title: text("Медицинская страховка", "Медициналық сақтандыру", "Medical insurance"),
    description: text(
      "Действует на протяжении поездки. Куратор помогает организовать обращение за медицинской помощью",
      "Сапар бойы жарамды. Жетекші медициналық көмекке жүгінуді ұйымдастыруға көмектеседі",
      "Valid throughout the trip. The group leader helps arrange medical assistance when needed",
    ),
  },
] satisfies readonly (ExperiencePoint & { color: string })[];

export const bookingSteps = [
  {
    title: text("Обсуждаем планы", "Жоспарларды талқылаймыз", "Discuss your plans"),
    description: text(
      "Возраст, интересы, даты и бюджет",
      "Жасы, қызығушылықтары, күндері және бюджеті",
      "Age, interests, dates and budget",
    ),
  },
  {
    title: text("Подбираем программу", "Бағдарламаны таңдаймыз", "Choose a programme"),
    description: text(
      "Обучение, проживание и стоимость",
      "Оқу, тұру және құны",
      "Classes, accommodation and cost",
    ),
  },
  {
    title: text("Закрепляем место", "Орынды бекітеміз", "Secure your place"),
    description: text("Договор и оплата", "Келісімшарт және төлем", "Agreement and payment"),
  },
  {
    title: text("Готовим документы", "Құжаттарды дайындаймыз", "Prepare the documents"),
    description: text(
      "Виза, билеты и подготовка к вылету",
      "Виза, билеттер және ұшуға дайындық",
      "Visa, tickets and departure preparations",
    ),
  },
  {
    title: text("Знакомимся с группой", "Топпен танысамыз", "Meet the group"),
    description: text(
      "Встреча с куратором и последние детали",
      "Жетекшімен кездесу және соңғы мәліметтер",
      "Meet your group leader and confirm the final details",
    ),
  },
] satisfies readonly ExperiencePoint[];
