import type { Locale } from "@/i18n/config";
import type { LegalPage } from "./legal-documents";

export const consentLabel: Record<Locale, readonly [string, string, string, string, string]> = {
  ru: [
    "Я даю ",
    "согласие на обработку персональных данных",
    " и принимаю ",
    "политику конфиденциальности",
    ". Если мне нет 18 лет, согласие даёт мой родитель или законный представитель.",
  ],
  kz: [
    "",
    "Дербес деректерді өңдеуге келісім",
    " беремін және ",
    "құпиялылық саясатын",
    " қабылдаймын. Егер маған 18 жас толмаса, келісімді ата-анам немесе заңды өкілім береді.",
  ],
  en: [
    "I give my ",
    "consent to the processing of personal data",
    " and accept the ",
    "privacy policy",
    ". If I am under 18, my parent or legal guardian gives this consent.",
  ],
};

export const cookieNoticeContent: Record<Locale, { label: string; text: string; link: string; accept: string }> = {
  ru: {
    label: "Уведомление о cookie",
    text: "Мы используем cookie, чтобы сайт работал удобнее. Подробнее в",
    link: "политике конфиденциальности",
    accept: "Понятно",
  },
  kz: {
    label: "Cookie туралы хабарлама",
    text: "Сайт ыңғайлы жұмыс істеуі үшін cookie файлдарын қолданамыз. Толығырақ:",
    link: "құпиялылық саясаты",
    accept: "Түсінікті",
  },
  en: {
    label: "Cookie notice",
    text: "We use cookies to make the site work better. Details are in our",
    link: "privacy policy",
    accept: "Got it",
  },
};

export const legalChrome: Record<Locale, {
  edition: string;
  titles: Record<LegalPage, string>;
  descriptions: Record<LegalPage, string>;
  related: string;
}> = {
  ru: {
    edition: "Редакция от 13 октября 2026 года",
    titles: { privacy: "Политика конфиденциальности", consent: "Согласие на обработку персональных данных" },
    descriptions: {
      privacy: "Какие персональные данные GSC Study получает через сайт, зачем, кому их передаёт, где и сколько хранит и как отозвать согласие.",
      consent: "Текст согласия на обработку персональных данных, которое вы даёте, отправляя заявку или тест на сайте GSC Study.",
    },
    related: "Связанный документ:",
  },
  kz: {
    edition: "2026 жылғы 13 қазандағы редакция",
    titles: { privacy: "Құпиялылық саясаты", consent: "Дербес деректерді өңдеуге келісім" },
    descriptions: {
      privacy: "GSC Study сайт арқылы қандай дербес деректерді алады, не үшін, кімге береді, қайда және қанша уақыт сақтайды.",
      consent: "Сайтта өтінім немесе тест жібергенде беретін дербес деректерді өңдеуге келісімнің мәтіні.",
    },
    related: "Байланысты құжат:",
  },
  en: {
    edition: "Version of 13 October 2026",
    titles: { privacy: "Privacy policy", consent: "Consent to personal data processing" },
    descriptions: {
      privacy: "What personal data GSC Study receives through the website, why, who it is shared with, where and how long it is stored.",
      consent: "The consent to personal data processing you give when you send a request or a test on the GSC Study website.",
    },
    related: "Related document:",
  },
};
