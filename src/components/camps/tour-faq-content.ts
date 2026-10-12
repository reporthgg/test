import type { Locale } from "@/i18n/config";

// Figma 334:2670 и 409:2387: осенний тур в Китай 24-31 октября 2026.
export const tourDates = { start: "2026-10-24", end: "2026-10-31" } as const;

const dayMs = 24 * 60 * 60 * 1000;
// С марта 2024 года весь Казахстан живёт по UTC+5, дни до тура считаем по местной дате.
const kazakhstanOffsetMs = 5 * 60 * 60 * 1000;

export function getDaysUntilTour(now: Date): number {
  const local = new Date(now.getTime() + kazakhstanOffsetMs);
  const today = Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate());
  const [year, month, day] = tourDates.start.split("-").map(Number);
  return Math.round((Date.UTC(year, month - 1, day) - today) / dayMs);
}

/** Текст плашки обратного отсчёта или null, если тур уже начался или прошёл. */
export function getTourCountdown(locale: Locale, now: Date): string | null {
  const days = getDaysUntilTour(now);
  if (days < 1) return null;
  if (locale === "kz") return `Турға ${days} күн қалды`;
  if (locale === "en") return `${days} ${days === 1 ? "day" : "days"} to go`;
  const form = new Intl.PluralRules("ru").select(days);
  return `до тура: ${days} ${form === "one" ? "день" : form === "few" ? "дня" : "дней"}`;
}

type TourCopy = {
  dates: readonly [string, string];
  title: readonly [string, string];
  text: readonly [string, string];
  button: string;
  buttonLabel: string;
  whatsappMessage: string;
  photoAlt: string;
};

export const campsTourContent: Record<Locale, TourCopy> = {
  ru: {
    dates: ["24 октября", "31 октября 2026"],
    title: ["Спланируйте осенний", "тур в Китае"],
    text: ["Обсудим программу, проживание и бюджет.", "Начните подготовку сейчас, чтобы осталось время на документы"],
    button: "Получить консультацию",
    buttonLabel: "Получить консультацию в WhatsApp",
    whatsappMessage: "Здравствуйте! Хочу получить консультацию по осеннему туру в Китай 24-31 октября 2026.",
    photoAlt: "Небоскрёбы Шанхая и телебашня «Восточная жемчужина»",
  },
  kz: {
    dates: ["24 қазан", "31 қазан 2026"],
    title: ["Қытайдағы күзгі", "турды жоспарлаңыз"],
    text: ["Бағдарламаны, тұру мен бюджетті талқылаймыз.", "Құжаттарға уақыт жетуі үшін дайындықты қазір бастаңыз"],
    button: "Кеңес алу",
    buttonLabel: "WhatsApp арқылы кеңес алу",
    whatsappMessage: "Сәлеметсіз бе! 2026 жылғы 24-31 қазанда өтетін Қытайға күзгі тур бойынша кеңес алғым келеді.",
    photoAlt: "Шанхайдың зәулім ғимараттары және «Шығыс інжу-маржаны» телемұнарасы",
  },
  en: {
    dates: ["24 October", "31 October 2026"],
    title: ["Plan your autumn", "tour in China"],
    text: ["We will discuss the programme, accommodation and budget.", "Start preparing now to leave time for the paperwork"],
    button: "Get a consultation",
    buttonLabel: "Get a consultation on WhatsApp",
    whatsappMessage: "Hello! I would like a consultation about the autumn tour to China on 24-31 October 2026.",
    photoAlt: "Shanghai skyscrapers and the Oriental Pearl TV Tower",
  },
};

export type CampsFaqItem = { id: string; question: string; answer: string; action?: boolean };

type FaqCopy = {
  title: readonly [string, string, string];
  action: string;
  items: readonly CampsFaqItem[];
};

// Вопросы и первый ответ: Figma 334:2613. Остальные ответы собраны только из фактов,
// которые уже есть в experience-content.ts (куратор, связь 24/7, проживание, страховка,
// что входит в стоимость) и в src/i18n/pages/camps.ts (виза и возврат, сроки бронирования).
export const campsFaqContent: Record<Locale, FaqCopy> = {
  ru: {
    title: ["Ответы", "на ваши", "вопросы"],
    action: "Обсудить подходящую программу",
    items: [
      {
        id: "shy",
        question: "Подойдёт ли лагерь, если ребёнок стесняется говорить по-английски?",
        answer: "Подберём программу с учётом его уровня. Занятия и повседневное общение помогут чаще использовать английский на практике",
        action: true,
      },
      {
        id: "first-trip",
        question: "Ребёнок впервые едет без родителей. Кто поможет ему освоиться?",
        answer: "С группой едет опытный куратор GSC Study. Он сопровождает ребят от вылета до возвращения и помогает с любыми вопросами в поездке, а свободное время они проводят на территории школы под присмотром команды",
      },
      {
        id: "contact",
        question: "Как я буду получать новости и связываться с ребёнком?",
        answer: "Для родителей работает общий чат поездки. Каждый вечер куратор пишет туда новости, а связаться с ним можно круглосуточно",
      },
      {
        id: "accommodation",
        question: "Где ребёнок будет жить и как организовано питание?",
        answer: "Ребята живут в кампусе или резиденции, питание трёхразовое. Школу, комнаты и условия размещения показываем заранее",
      },
      {
        id: "health",
        question: "Что произойдёт, если ребёнок заболеет?",
        answer: "Медицинская страховка действует на протяжении всей поездки. Если понадобится врач, куратор поможет организовать обращение за медицинской помощью. Он на связи с родителями и решает вопросы на месте",
      },
      {
        id: "price",
        question: "Что входит в стоимость и сколько нужно карманных денег?",
        answer: "В стоимость входят перелёт и оформление визы, проживание и трёхразовое питание, занятия английским, экскурсии, сопровождение куратора и медицинская страховка. Отдельно нужны только карманные деньги, сумму подскажем на консультации",
      },
      {
        id: "refund",
        question: "Что будет при отказе в визе или отмене поездки?",
        answer: "Мы готовим пакет документов и заранее оцениваем риски. Условия возврата прописываются в договоре, их обсуждаем до оплаты",
      },
      {
        id: "booking",
        question: "Когда лучше бронировать?",
        answer: "Оптимально за три-четыре месяца до вылета, чтобы хватило времени на визу и групповые билеты. Места в группе ограничены",
      },
    ],
  },
  kz: {
    title: ["Сұрақтар", "мен", "жауаптар"],
    action: "Қолайлы бағдарламаны талқылау",
    items: [
      {
        id: "shy",
        question: "Бала ағылшынша сөйлеуге ұялса, лагерь оған сай келе ме?",
        answer: "Бағдарламаны баланың деңгейіне қарай таңдаймыз. Сабақтар мен күнделікті қарым-қатынас ағылшын тілін тәжірибеде жиірек қолдануға көмектеседі",
        action: true,
      },
      {
        id: "first-trip",
        question: "Бала ата-анасыз алғаш рет сапарға шығады. Оған бейімделуге кім көмектеседі?",
        answer: "Топпен бірге GSC Study-дің тәжірибелі жетекшісі барады. Ол балаларды ұшудан оралғанға дейін сүйемелдеп, сапардағы кез келген мәселені шешуге көмектеседі, ал бос уақытта балалар мектеп аумағында команданың бақылауында болады",
      },
      {
        id: "contact",
        question: "Жаңалықтарды қалай аламын және баламен қалай байланысамын?",
        answer: "Ата-аналарға арналған ортақ сапар чаты бар. Жетекші күн сайын кешке сол жерге жаңалықтарды жазады, ал онымен тәулік бойы байланысуға болады",
      },
      {
        id: "accommodation",
        question: "Бала қайда тұрады және тамақтану қалай ұйымдастырылған?",
        answer: "Балалар кампуста немесе резиденцияда тұрады, күніне үш мезгіл тамақтанады. Мектепті, бөлмелерді және тұру жағдайын алдын ала көрсетеміз",
      },
      {
        id: "health",
        question: "Бала ауырып қалса, не болады?",
        answer: "Медициналық сақтандыру сапар бойы жарамды. Дәрігер қажет болса, жетекші медициналық көмекке жүгінуді ұйымдастыруға көмектеседі. Ол ата-аналармен байланыста болып, мәселелерді орнында шешеді",
      },
      {
        id: "price",
        question: "Бағаға не кіреді және қанша қалта ақша керек?",
        answer: "Бағаға ұшу мен виза рәсімдеу, тұру және үш мезгіл тамақ, ағылшын тілі сабақтары, экскурсиялар, жетекшінің сүйемелдеуі және медициналық сақтандыру кіреді. Бөлек тек қалта ақша керек, оның мөлшерін кеңес беру кезінде айтамыз",
      },
      {
        id: "refund",
        question: "Виза берілмесе немесе сапар тоқтатылса, не болады?",
        answer: "Біз құжаттар топтамасын дайындап, тәуекелдерді алдын ала бағалаймыз. Қайтару шарттары келісімшартта жазылады, оларды төлемге дейін талқылаймыз",
      },
      {
        id: "booking",
        question: "Қашан брондаған дұрыс?",
        answer: "Визаға және топтық билеттерге уақыт жетуі үшін ұшудан үш-төрт ай бұрын брондаған оңтайлы. Топтағы орындар шектеулі",
      },
    ],
  },
  en: {
    title: ["Answers", "to your", "questions"],
    action: "Discuss a suitable programme",
    items: [
      {
        id: "shy",
        question: "Is the camp right for a child who is shy about speaking English?",
        answer: "We will choose a programme that matches their level. Classes and everyday conversations will help them use English in practice more often",
        action: true,
      },
      {
        id: "first-trip",
        question: "My child is travelling without parents for the first time. Who will help them settle in?",
        answer: "An experienced GSC Study group leader travels with the group. They accompany the students from departure to return and help with any questions during the trip, and free time is spent on school grounds under the team's supervision",
      },
      {
        id: "contact",
        question: "How will I get updates and stay in touch with my child?",
        answer: "There is a group chat for parents. The group leader posts trip updates there every evening, and you can reach them 24/7",
      },
      {
        id: "accommodation",
        question: "Where will my child stay, and how are meals organised?",
        answer: "Students stay on campus or in a residence and have three meals a day. We show you the school, rooms and accommodation arrangements in advance",
      },
      {
        id: "health",
        question: "What happens if my child gets ill?",
        answer: "Medical insurance is valid throughout the trip. If a doctor is needed, the group leader helps arrange medical assistance. They stay in touch with parents and resolve issues on the spot",
      },
      {
        id: "price",
        question: "What does the price include, and how much pocket money is needed?",
        answer: "The price includes flights and visa arrangements, accommodation and three meals a day, English classes, excursions, a group leader and medical insurance. You only need pocket money on top, and we will suggest an amount during the consultation",
      },
      {
        id: "refund",
        question: "What happens if the visa is refused or the trip is cancelled?",
        answer: "We prepare the document package and assess the risks in advance. Refund terms are set out in the agreement, and we discuss them before payment",
      },
      {
        id: "booking",
        question: "When is the best time to book?",
        answer: "Ideally three to four months before departure, so there is enough time for the visa and group tickets. Places in the group are limited",
      },
    ],
  },
};
