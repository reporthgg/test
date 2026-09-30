import sanitizeHtml from "sanitize-html";
import type { GradingTest, ValidatedSubmission } from "./test-submission";
import type { TestContactField, TestSubmissionResult } from "./test-types";

const SITE_URL = "https://gscstudy.com";
const BLOCK_TAGS = new Set([
  "p", "div", "section", "article", "header", "footer", "blockquote", "pre",
  "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "table",
  "thead", "tbody", "tfoot", "tr", "figure", "figcaption",
]);
const HIDDEN_TAGS = new Set(["script", "style", "textarea", "option", "iframe", "object"]);
const FIELD_LABELS: Record<string, string> = {
  name: "Имя",
  phone: "Телефон",
  email: "Email",
  city: "Город",
  source: "Источник",
  level: "Уровень программы",
  year: "Год поступления",
  goal: "Целевой балл",
  age: "Возраст",
  course: "Курс",
  country: "Страна",
  exam: "Экзамен",
  camp: "Лагерь",
  program: "Программа",
  consent: "Согласие на обработку персональных данных",
  branch: "Филиал",
  studyFormat: "Формат обучения",
  comment: "Комментарий",
  message: "Сообщение",
  interest: "Интерес",
};

function plainText(value: string): string {
  return value.replaceAll("[", "［").replaceAll("]", "］");
}

function imageUrl(source: string | undefined): string | null {
  if (!source?.trim()) return null;
  try {
    const url = new URL(source, SITE_URL);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) {
      return null;
    }
    for (const part of ["pathname", "search", "hash"] as const) {
      url[part] = url[part].replaceAll("[", "%5B").replaceAll("]", "%5D");
    }
    return url.href;
  } catch {
    return null;
  }
}

export function formatBitrixRichText(
  contentHtml: string | null | undefined,
  fallback = "",
): string {
  if (!contentHtml?.trim()) return plainText(fallback);
  const parts: string[] = [];
  let hiddenDepth = 0;
  let hasText = false;
  sanitizeHtml(contentHtml, {
    allowedTags: [],
    allowedAttributes: {},
    nonTextTags: [...HIDDEN_TAGS],
    parser: { decodeEntities: true },
    onOpenTag: (name, attributes) => {
      if (hiddenDepth || HIDDEN_TAGS.has(name)) {
        hiddenDepth += 1;
        return;
      }
      if (BLOCK_TAGS.has(name)) parts.push("\n\n");
      if (name === "br" || name === "hr") parts.push("\n");
      if (name === "li") parts.push("- ");
      if (name === "sup") parts.push("^(");
      if (name === "sub") parts.push("_(");
      if (name === "img") {
        const url = imageUrl(attributes.src);
        const alt = attributes.alt?.trim();
        if (alt || url) {
          parts.push(`\nИзображение${alt ? ` (${plainText(alt)})` : ""}${url ? `: ${url}` : ""}\n`);
        }
      }
    },
    onCloseTag: (name) => {
      if (hiddenDepth) {
        hiddenDepth -= 1;
        return;
      }
      if (name === "sup" || name === "sub") parts.push(")");
      if (name === "td" || name === "th") parts.push("\t");
      if (BLOCK_TAGS.has(name)) parts.push("\n\n");
    },
    textFilter: (text) => {
      if (!hiddenDepth) {
        const decoded = text.replace(/&(amp|lt|gt);/gu, (entity) =>
          entity === "&amp;" ? "&" : entity === "&lt;" ? "<" : ">");
        parts.push(plainText(decoded));
        if (decoded.trim()) hasText = true;
      }
      return "";
    },
  });
  const rendered = parts.join("")
    .replace(/[ \t]+\n/gu, "\n")
    .replace(/\n[ \t]+/gu, "\n")
    .replace(/\n{3,}/gu, "\n\n")
    .trim();
  return [!hasText && fallback ? plainText(fallback) : "", rendered].filter(Boolean).join("\n\n");
}

export function formatGeneralLeadComment(fields: Readonly<Record<string, unknown>>): string {
  return Object.entries(fields)
    .filter(([key, value]) => key !== "_bitrix" && value !== "" && value != null)
    .map(([key, value]) => {
      const label = Object.hasOwn(FIELD_LABELS, key) ? FIELD_LABELS[key] : key;
      const text = key === "consent" && typeof value === "boolean"
        ? value ? "Да" : "Нет"
        : typeof value === "string" ? value : JSON.stringify(value, null, 2);
      return `${plainText(label)}: ${plainText(text)}`;
    })
    .join("\n");
}

export function formatTestLeadComment(
  test: GradingTest,
  submission: ValidatedSubmission,
  contactFields: TestContactField[],
  result: TestSubmissionResult,
  resultId: string,
): string {
  const { name, phone, email, consent, contacts, answers } = submission;
  const header = [
    `Тест: ${plainText(test.title)}`,
    `Результат: ${plainText(result.level)}`,
    `Правильных: ${result.score} из ${result.total}`,
    `Всего вопросов: ${test.questions.length}`,
    `Ожидают проверки: ${result.pendingReview}`,
    "",
    `Имя: ${plainText(name)}`,
    `Телефон: ${plainText(phone)}`,
    `Email: ${email ? plainText(email) : "Не указан"}`,
    ...contactFields.map((field) => {
      const value = contacts[field.name];
      return `${plainText(field.label)}: ${value ? plainText(value) : "Не указано"}`;
    }),
    `Согласие на обработку персональных данных: ${consent ? "Да" : "Нет"}`,
    `Результат в админке: ${SITE_URL}/admin/exams/${encodeURIComponent(test.id)}/results/${encodeURIComponent(resultId)}`,
  ].join("\n");
  const essays = test.questions
    .filter((question) => question.type === "essay" && answers[question.id]?.trim())
    .map((question, index) => [
      `Эссе ${index + 1}`,
      formatBitrixRichText(question.contentHtml, question.text),
      `Ответ: ${plainText(answers[question.id])}`,
    ].join("\n"));
  return [header, ...essays].join("\n\n");
}
