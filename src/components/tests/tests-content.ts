import type { Locale } from "@/i18n/config";

type TestsCopy = {
  title: readonly [string, string];
  listLabel: string;
};

export const testsContent: Record<Locale, TestsCopy> = {
  ru: {
    title: ["Онлайн-тесты", "для определения уровня"],
    listLabel: "Список тестов",
  },
  kz: {
    title: ["Деңгейді", "анықтайтын онлайн-тесттер"],
    listLabel: "Тесттер тізімі",
  },
  en: {
    title: ["Online tests", "to find your level"],
    listLabel: "Available tests",
  },
};
