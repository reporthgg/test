import { stripLocale } from "@/i18n/config";

const PAGE_PRODUCTS: readonly (readonly [string, string])[] = [
  ["/school", "Языковая школа"],
  ["/exams", "IELTS / SAT"],
  ["/abroad", "Поступление за рубеж"],
  ["/camps", "Лагерь"],
];

const SERVICE_PRODUCTS: Readonly<Record<string, string>> = {
  "Языковые курсы": "Языковая школа",
  "Подготовка к IELTS": "IELTS",
  "Digital SAT": "Digital SAT",
  "Поступление за рубеж": "Поступление за рубеж",
  "Летние лагеря": "Лагерь",
};

export const UNKNOWN_PRODUCT = "Не определён";

function text(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function leadProduct(fields: { page?: string; program?: unknown; course?: unknown; camp?: unknown }): string {
  const program = text(fields.program);
  if (program) return Object.hasOwn(SERVICE_PRODUCTS, program) ? SERVICE_PRODUCTS[program] : program;
  const course = text(fields.course);
  if (course) return course;
  if (text(fields.camp)) return "Лагерь";
  const path = stripLocale(fields.page ?? "/");
  const match = PAGE_PRODUCTS.find(([prefix]) => path === prefix || path.startsWith(`${prefix}/`));
  return match ? match[1] : UNKNOWN_PRODUCT;
}
