import sanitizeHtml from "sanitize-html";
import type { QuestionType, TestContactField, TestQuestion } from "./test-types";

const CONTACT_NAMES = new Set(["age", "city", "branch", "studyFormat"]);

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isSafeTestImageUrl(value: string): boolean {
  if (!value || /[\s\\\u0000-\u001f\u007f]/u.test(value)) return false;
  if (value.startsWith("/")) {
    if (!/^\/(?:uploads|test-assets)\/[^?#]+$/u.test(value)) return false;
    try {
      const decoded = decodeURIComponent(value);
      return !/[%\\\u0000-\u001f\u007f]/u.test(decoded) &&
        !decoded.slice(1).split("/").some((part) => part === "." || part === ".." || part === "");
    } catch {
      return false;
    }
  }
  try {
    const url = new URL(value);
    return url.protocol === "https:" && Boolean(url.hostname) &&
      !url.username && !url.password;
  } catch {
    return false;
  }
}

export function sanitizeTestHtml(input: string | null | undefined): string | null {
  if (input == null) return null;
  if (typeof input !== "string" || input.length > 200_000) {
    throw new Error("Некорректный HTML теста");
  }
  if (input.trim() === "") return null;
  const result = sanitizeHtml(input, {
    allowedTags: [
      "p", "br", "strong", "b", "em", "i", "u", "s", "sub", "sup",
      "ul", "ol", "li", "blockquote", "div", "span", "h2", "h3", "h4",
      "table", "thead", "tbody", "tr", "th", "td", "img",
    ],
    allowedAttributes: {
      img: ["src", "alt", "width", "height"],
      th: ["colspan", "rowspan", "scope"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["https"],
    allowProtocolRelative: false,
    nonTextTags: ["script", "style", "textarea", "option", "iframe", "object"],
    transformTags: {
      img: (_tagName, attributes) => {
        const attrs = { ...attributes };
        if (!isSafeTestImageUrl(attrs.src ?? "")) delete attrs.src;
        for (const name of ["width", "height"]) {
          if (!/^[1-9]\d{0,3}$/u.test(attrs[name] ?? "") || Number(attrs[name]) > 4096) {
            delete attrs[name];
          }
        }
        return { tagName: "img", attribs: attrs };
      },
    },
    exclusiveFilter: (frame) => frame.tag === "img" && !frame.attribs.src,
  }).trim();
  return result || null;
}

export function parseQuestionType(value: string): QuestionType {
  if (value === "choice" || value === "short_text" || value === "essay") return value;
  throw new Error("Неизвестный формат вопроса");
}

export function validateTestContactFields(value: unknown): TestContactField[] {
  if (!Array.isArray(value) || value.length > CONTACT_NAMES.size) {
    throw new Error("Некорректные контактные поля теста");
  }
  const names = new Set<string>();
  return value.map((field: unknown) => {
    if (!isRecord(field) || typeof field.name !== "string" ||
      !CONTACT_NAMES.has(field.name) || names.has(field.name) ||
      typeof field.label !== "string" || !field.label.trim() ||
      field.label.length > 200 || typeof field.required !== "boolean") {
      throw new Error("Некорректное контактное поле теста");
    }
    names.add(field.name);
    let options: string[] | undefined;
    if (field.options !== undefined) {
      if (!Array.isArray(field.options) || field.options.length === 0 ||
        field.options.length > 100 ||
        field.options.some((option: unknown) =>
          typeof option !== "string" || !option.trim() || option.length > 200)) {
        throw new Error("Некорректные варианты контактного поля");
      }
      options = (field.options as string[]).map((option) => option.trim());
      if (new Set(options).size !== options.length) {
        throw new Error("Повторяющиеся варианты контактного поля");
      }
    }
    return {
      name: field.name as TestContactField["name"],
      label: field.label.trim(),
      required: field.required,
      ...(options ? { options } : {}),
    };
  });
}

export function parseTestContactFields(value: string | null): TestContactField[] {
  return value === null ? [] : validateTestContactFields(JSON.parse(value) as unknown);
}

export function parseAcceptedAnswers(value: string | null): string[] {
  if (value === null) return [];
  const parsed: unknown = JSON.parse(value);
  if (!Array.isArray(parsed) || parsed.length > 100 ||
    parsed.some((answer: unknown) =>
      typeof answer !== "string" || !answer.trim() || answer.length > 2000)) {
    throw new Error("Некорректный ключ текстового ответа");
  }
  return (parsed as string[]).map((answer) => answer.trim());
}

type StoredQuestion = {
  id: string;
  text: string;
  contentHtml: string | null;
  type: string;
  required: boolean;
  options: { id: string; text: string; contentHtml: string | null }[];
};

export function toPublicTestQuestion(question: StoredQuestion): TestQuestion {
  return {
    id: question.id,
    text: question.text,
    contentHtml: sanitizeTestHtml(question.contentHtml),
    type: parseQuestionType(question.type),
    required: question.required,
    options: question.options.map((option) => ({
      id: option.id,
      text: option.text,
      contentHtml: sanitizeTestHtml(option.contentHtml),
    })),
  };
}
