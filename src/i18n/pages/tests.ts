import type { Locale } from "@/i18n/config";


// Статический «хром» онлайн-тестов: хаб, интро, квиз, результат, ошибка.
// ru — источник; kz/en — перевод (вычитать). DB-контент не переводим.
const dict = {
  ru: {
    hub: {
      badge: "Бесплатно",
      title: "Онлайн-тесты уровня",
      subtitle:
        "Проверьте знания и получите результат. Письменные задания проверяет преподаватель.",
      forKids: "Для детей",
      forAdults: "Для взрослых и подростков",
      minutes: "мин",
      noLimit: "без лимита",
      start: "Пройти",
    },
    intro: {
      eyebrow: "Тест уровня",
      rawEyebrow: "Онлайн-тест",
      metaQuestions: "Вопросов",
      minutes: "мин",
      contactNotice: "В конце попросим имя и телефон для результата и разбора.",
      startBtn: "Начать тест",
      empty: "В этом тесте пока нет вопросов.",
    },
    contact: {
      title: "Ваши контакты",
      subtitle: "Укажите имя и телефон, чтобы получить результат и разбор.",
      nameLabel: "Имя",
      namePh: "Введите имя",
      phoneLabel: "Телефон",
      phonePh: "+7 700 000 00 00",
      consent:
        "Согласен(а) на обработку персональных данных, чтобы получить результат и разбор.",
      selectOption: "Выберите вариант",
      submit: "Получить результат",
      back: "Вернуться к ответам",
    },
    quiz: {
      question: "Вопрос",
      of: "из",
      back: "← Назад",
      next: "Далее",
      finish: "Отправить ответы",
      toContacts: "Завершить тест",
      skip: "Пропустить",
      required: "Обязательный вопрос",
      optional: "Необязательно",
      answerPlaceholder: "Введите ответ",
      answerRequired: "Ответьте на обязательный вопрос перед продолжением.",
      essayNotice: "Ответ проверяет преподаватель",
    },
    loading: {
      text: "Считаем результат…",
    },
    result: {
      yourResult: "Ваш результат",
      correctAnswers: "Правильных ответов:",
      of: "из",
      note: "Заявка отправлена. Менеджер свяжется с вами, подберёт программу и пришлёт подробный разбор.",
      manualReview: "Ответов на проверку:",
      manualReviewNote: "Оценка за них не выставлена автоматически и не включена в результат выше.",
      waButton: "Написать в WhatsApp",
      waIntro: "Здравствуйте! Прошёл(ла) тест «",
      waResult: "», результат: ",
      home: "На главную",
    },
    error: {
      text: "Не удалось сохранить результат.",
      retry: "Попробовать ещё раз",
      editContact: "Проверить контактные данные",
    },
    preview: {
      label: "Предпросмотр для администратора. Ответы и заявки не сохраняются.",
      resultNote: "Проверка завершена. Результат не сохранён, заявка не отправлена.",
    },
  },
  kz: {
    hub: {
      badge: "Тегін",
      title: "Онлайн деңгей тесттері",
      subtitle:
        "Біліміңізді тексеріп, нәтижені алыңыз. Жазбаша тапсырмаларды оқытушы тексереді.",
      forKids: "Балаларға",
      forAdults: "Ересектер мен жасөспірімдерге",
      minutes: "мин",
      noLimit: "шектеусіз",
      start: "Өту",
    },
    intro: {
      eyebrow: "Деңгей тесті",
      rawEyebrow: "Онлайн тест",
      metaQuestions: "Сұрақтар",
      minutes: "мин",
      contactNotice: "Соңында нәтиже мен талдау үшін атыңыз бен телефон нөміріңізді сұраймыз.",
      startBtn: "Тестті бастау",
      empty: "Бұл тестте әзірге сұрақтар жоқ.",
    },
    contact: {
      title: "Байланыс деректеріңіз",
      subtitle: "Нәтиже мен талдау алу үшін атыңыз бен телефон нөміріңізді көрсетіңіз.",
      nameLabel: "Аты",
      namePh: "Атыңызды енгізіңіз",
      phoneLabel: "Телефон",
      phonePh: "+7 700 000 00 00",
      consent:
        "Нәтиже мен талдауды алу үшін дербес деректерді өңдеуге келісемін.",
      selectOption: "Нұсқаны таңдаңыз",
      submit: "Нәтижені алу",
      back: "Жауаптарға оралу",
    },
    quiz: {
      question: "Сұрақ",
      of: "/",
      back: "← Артқа",
      next: "Келесі",
      finish: "Жауаптарды жіберу",
      toContacts: "Тестті аяқтау",
      skip: "Өткізіп жіберу",
      required: "Міндетті сұрақ",
      optional: "Міндетті емес",
      answerPlaceholder: "Жауапты енгізіңіз",
      answerRequired: "Жалғастыру үшін міндетті сұраққа жауап беріңіз.",
      essayNotice: "Жауапты оқытушы тексереді",
    },
    loading: {
      text: "Нәтиже есептелуде…",
    },
    result: {
      yourResult: "Сіздің нәтижеңіз",
      correctAnswers: "Дұрыс жауаптар:",
      of: "/",
      note: "Өтінім жіберілді. Менеджер сізбен хабарласып, бағдарлама таңдап, толық талдау жібереді.",
      manualReview: "Тексерілетін жауаптар:",
      manualReviewNote: "Олар автоматты түрде бағаланған жоқ және жоғарыдағы нәтижеге кірмейді.",
      waButton: "WhatsApp-қа жазу",
      waIntro: "Сәлеметсіз бе! «",
      waResult: "» тестінен өттім, нәтиже: ",
      home: "Басты бетке",
    },
    error: {
      text: "Нәтижені сақтау мүмкін болмады.",
      retry: "Қайталап көру",
      editContact: "Байланыс деректерін тексеру",
    },
    preview: {
      label: "Әкімшіге арналған алдын ала қарау. Жауаптар мен өтінімдер сақталмайды.",
      resultNote: "Тексеру аяқталды. Нәтиже сақталмады, өтінім жіберілмеді.",
    },
  },
  en: {
    hub: {
      badge: "Free",
      title: "Online level tests",
      subtitle:
        "Test your knowledge and see your result. A teacher reviews written tasks.",
      forKids: "For kids",
      forAdults: "For adults and teenagers",
      minutes: "min",
      noLimit: "no time limit",
      start: "Take the test",
    },
    intro: {
      eyebrow: "Level test",
      rawEyebrow: "Online test",
      metaQuestions: "Questions",
      minutes: "min",
      contactNotice: "At the end, we will ask for your name and phone number to show your result and provide feedback.",
      startBtn: "Start the test",
      empty: "This test has no questions yet.",
    },
    contact: {
      title: "Your contact details",
      subtitle: "Enter your name and phone number to receive your result and feedback.",
      nameLabel: "Name",
      namePh: "Enter your name",
      phoneLabel: "Phone",
      phonePh: "+7 700 000 00 00",
      consent:
        "I agree to the processing of personal data in order to receive my result and a breakdown.",
      selectOption: "Select an option",
      submit: "Get my result",
      back: "Back to answers",
    },
    quiz: {
      question: "Question",
      of: "of",
      back: "← Back",
      next: "Next",
      finish: "Submit answers",
      toContacts: "Finish the test",
      skip: "Skip",
      required: "Required question",
      optional: "Optional",
      answerPlaceholder: "Enter your answer",
      answerRequired: "Answer this required question to continue.",
      essayNotice: "A teacher reviews your answer",
    },
    loading: {
      text: "Calculating your result…",
    },
    result: {
      yourResult: "Your result",
      correctAnswers: "Correct answers:",
      of: "of",
      note: "Your request has been sent. Our manager will contact you, pick a programme and send a detailed breakdown.",
      manualReview: "Answers awaiting review:",
      manualReviewNote: "They have not been graded automatically and are not included in the result above.",
      waButton: "Message on WhatsApp",
      waIntro: "Hello! I took the “",
      waResult: "” test, result: ",
      home: "Back to home",
    },
    error: {
      text: "Could not save your result.",
      retry: "Try again",
      editContact: "Check contact details",
    },
    preview: {
      label: "Administrator preview. Answers and requests are not saved.",
      resultNote: "Preview complete. No result was saved and no request was sent.",
    },
  },
};

export type TestsDict = typeof dict.ru;

export function getTestsDict(locale: Locale): TestsDict {
  return dict[locale];
}
