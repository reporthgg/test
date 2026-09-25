import type { QuestionType, TestContactField } from "@/lib/test-types";

export type QuestionEditData = {
  text: string;
  contentHtml: string | null;
  type: QuestionType;
  required: boolean;
  acceptedAnswers: string[];
  options: { id: string | null; text: string; contentHtml: string | null; correct: boolean }[];
};

export type TestMetaData = {
  title: string;
  description: string;
  timeLimit: number | null;
  published: boolean;
  scoringMode: "level" | "raw";
  contactFields: TestContactField[];
};

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Некорректные данные.");
  return value as Record<string, unknown>;
}

function text(value: unknown, label: string, max: number, required = false): string {
  if (typeof value !== "string" || value.length > max) throw new Error(`${label}: допустимо до ${max} символов.`);
  const normalized = value.trim();
  if (required && !normalized) throw new Error(`${label}: заполните поле.`);
  return normalized;
}

function html(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  return text(value, "HTML", 200000) || null;
}

export function validateQuestionInput(value: unknown): QuestionEditData {
  const data = object(value);
  if (typeof data.type !== "string" || !["choice", "short_text", "essay"].includes(data.type)) throw new Error("Неизвестный тип вопроса.");
  if (typeof data.required !== "boolean") throw new Error("Укажите обязательность вопроса.");
  if (!Array.isArray(data.options) || data.options.length > 30) throw new Error("Допустимо до 30 вариантов ответа.");
  if (!Array.isArray(data.acceptedAnswers) || data.acceptedAnswers.length > 100) throw new Error("Допустимо до 100 принятых ответов.");
  const ids = new Set<string>();
  const options = data.options.map((value) => {
    const option = object(value);
    const id = option.id === null ? null : text(option.id, "ID варианта", 200, true);
    if (id && ids.has(id)) throw new Error("Варианты ответа не должны повторяться.");
    if (id) ids.add(id);
    if (typeof option.correct !== "boolean") throw new Error("Некорректный ключ ответа.");
    return {
      id,
      text: text(option.text, "Текст варианта", 10000, true),
      contentHtml: html(option.contentHtml),
      correct: option.correct,
    };
  });
  if (data.type === "choice" && options.length < 2) throw new Error("Для выбора ответа нужны минимум два варианта.");
  if (options.filter((option) => option.correct).length > 1) throw new Error("Укажите только один правильный вариант.");
  return {
    text: text(data.text, "Текст вопроса", 20000, true),
    contentHtml: html(data.contentHtml),
    type: data.type as QuestionType,
    required: data.required,
    acceptedAnswers: [...new Set(data.acceptedAnswers.map((answer) => text(answer, "Принятый ответ", 2000, true)))],
    options,
  };
}

export function validateTestMetaInput(value: unknown): TestMetaData {
  const data = object(value);
  if (typeof data.published !== "boolean") throw new Error("Некорректный статус публикации.");
  if (data.scoringMode !== "level" && data.scoringMode !== "raw") throw new Error("Неизвестный способ подсчёта.");
  if (data.timeLimit !== null && (typeof data.timeLimit !== "number" || !Number.isInteger(data.timeLimit) || data.timeLimit < 1 || data.timeLimit > 1440)) {
    throw new Error("Время: укажите целое число от 1 до 1440 минут или оставьте поле пустым.");
  }
  if (!Array.isArray(data.contactFields) || data.contactFields.length > 4) throw new Error("Некорректные контактные поля.");
  const names = new Set<string>();
  const contactFields = data.contactFields.map((value) => {
    const field = object(value);
    if (typeof field.name !== "string") throw new Error("Некорректное имя контактного поля.");
    const name = field.name;
    if (!["age", "city", "branch", "studyFormat"].includes(name) || names.has(name)) throw new Error("Контактное поле неизвестно или повторяется.");
    names.add(name);
    if (typeof field.required !== "boolean") throw new Error("Укажите обязательность контактного поля.");
    if (field.options !== undefined && (!Array.isArray(field.options) || field.options.length > 100)) throw new Error("В контактном поле допустимо до 100 вариантов.");
    const options = field.options === undefined ? undefined : (field.options as unknown[]).map((option) => text(option, "Контактный вариант", 200, true));
    if (options && new Set(options).size !== options.length) throw new Error("Контактные варианты не должны повторяться.");
    if (options?.length === 1) throw new Error("Для списка нужны минимум два варианта. Уберите все варианты, чтобы оставить свободный ввод.");
    return {
      name: name as TestContactField["name"],
      label: text(field.label, "Название контактного поля", 200, true),
      required: field.required,
      ...(options?.length ? { options } : {}),
    };
  });
  return {
    title: text(data.title, "Название", 300, true),
    description: text(data.description, "Описание", 10000),
    timeLimit: data.timeLimit as number | null,
    published: data.published,
    scoringMode: data.scoringMode,
    contactFields,
  };
}

type PublishQuestion = {
  text: string;
  type: string;
  acceptedAnswers: string | null;
  options: { text: string; correct: boolean }[];
};

export function publicationErrors(questions: PublishQuestion[]): string[] {
  if (!questions.length) return ["Добавьте хотя бы один вопрос."];
  return questions.flatMap((question, index) => {
    const prefix = `Вопрос ${index + 1}: `;
    if (!question.text.trim()) return [prefix + "нет текста вопроса."];
    if (question.type === "choice" && (question.options.length < 2 || question.options.some((option) => !option.text.trim()) || question.options.filter((option) => option.correct).length !== 1)) {
      return [prefix + "нужны минимум два заполненных варианта и ровно один правильный."];
    }
    if (question.type === "short_text") {
      let accepted: unknown;
      try { accepted = JSON.parse(question.acceptedAnswers ?? "[]"); } catch { accepted = null; }
      if (!Array.isArray(accepted) || accepted.length === 0 || accepted.length > 100 || accepted.some((answer) => typeof answer !== "string" || !answer.trim() || answer.length > 2000)) {
        return [prefix + "укажите принятые ответы для автоматической проверки."];
      }
    }
    if (!["choice", "short_text", "essay"].includes(question.type)) return [prefix + "неизвестный тип."];
    return [];
  });
}

export function parseBulkQuestions(raw: unknown): { text: string; options: { text: string; correct: boolean }[] }[] {
  const input = text(raw, "Импорт", 500000, true);
  const questions = input.split(/\r?\n/).flatMap((line, index) => {
    if (!line.trim()) return [];
    const parts = line.split("|").map((part) => part.trim());
    if (parts.length < 3 || parts.some((part) => !part)) throw new Error(`Строка ${index + 1}: нужны текст вопроса и минимум два непустых варианта через |.`);
    const [question, ...answers] = parts;
    if (answers.length > 30) throw new Error(`Строка ${index + 1}: допустимо до 30 вариантов.`);
    const options = answers.map((answer) => ({
      text: text(answer.startsWith("*") ? answer.slice(1) : answer, `Строка ${index + 1}, вариант`, 10000, true),
      correct: answer.startsWith("*"),
    }));
    if (options.filter((option) => option.correct).length > 1) throw new Error(`Строка ${index + 1}: отметьте звёздочкой только один вариант.`);
    return [{ text: text(question, `Строка ${index + 1}, вопрос`, 20000, true), options }];
  });
  if (!questions.length || questions.length > 500) throw new Error("За один импорт допустимо от 1 до 500 вопросов.");
  return questions;
}
