import { computeLevel } from "./scoring";
import {
  isRecord,
  parseAcceptedAnswers,
  parseQuestionType,
  sanitizeTestHtml,
} from "./test-content";
import type { TestContactField, TestSubmissionResult } from "./test-types";

export type GradingQuestion = {
  id: string;
  sourceKey: string | null;
  text: string;
  contentHtml: string | null;
  type: string;
  required: boolean;
  acceptedAnswers: string | null;
  options: {
    id: string;
    text: string;
    contentHtml: string | null;
    correct: boolean;
  }[];
};

export type GradingTest = {
  id: string;
  slug: string;
  title: string;
  kind: string;
  scoringMode: string;
  sourceKey: string | null;
  sourceHash: string | null;
  questions: GradingQuestion[];
};

export type ValidatedSubmission = {
  name: string;
  phone: string;
  email: string | null;
  consent: boolean;
  contacts: Partial<Record<TestContactField["name"], string>>;
  answers: Record<string, string>;
};

export class SubmissionValidationError extends Error {
  constructor(
    message: string,
    public readonly details: Record<string, string> = {},
    public readonly code = "INVALID_SUBMISSION",
    public readonly status = 400,
  ) {
    super(message);
    this.name = "SubmissionValidationError";
  }
}

function invalid(field: string, message: string): never {
  throw new SubmissionValidationError(message, { [field]: message });
}

function textField(
  value: unknown,
  field: string,
  maxLength: number,
  required: boolean,
): string {
  if (value == null && !required) return "";
  if (typeof value !== "string" || value.length > maxLength) {
    return invalid(field, `Некорректное поле: ${field}`);
  }
  const text = value.trim();
  if (required && !text) return invalid(field, `Заполните поле: ${field}`);
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(text)) {
    return invalid(field, `Недопустимые символы: ${field}`);
  }
  return text;
}

export function validateTestSubmission(
  body: unknown,
  questions: GradingQuestion[],
  contactFields: TestContactField[],
  preview = false,
): ValidatedSubmission {
  if (!isRecord(body)) throw new SubmissionValidationError("Ожидается JSON-объект");
  const allowedFields = new Set([
    "name", "phone", "email", "consent", "answers", "contacts", ...contactFields.map((field) => field.name),
  ]);
  for (const key of Object.keys(body)) {
    if (!allowedFields.has(key)) invalid(key, "Неизвестное поле формы");
  }
  const name = textField(body.name, "name", 200, !preview);
  const phone = textField(body.phone, "phone", 60, !preview);
  const email = textField(body.email, "email", 200, false);
  if (phone && (!/^\+?[\d\s().-]+$/u.test(phone) ||
    phone.replace(/\D/gu, "").length < 5 || phone.replace(/\D/gu, "").length > 20)) {
    invalid("phone", "Некорректный телефон");
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email)) {
    invalid("email", "Некорректный email");
  }
  if (body.consent !== undefined && typeof body.consent !== "boolean") {
    invalid("consent", "Согласие должно быть передано как логическое значение");
  }
  if (!preview && body.consent !== true) {
    invalid("consent", "Подтвердите согласие на обработку персональных данных");
  }
  const consent = body.consent === true;
  const rawContacts = body.contacts === undefined ? {} : body.contacts;
  if (!isRecord(rawContacts)) invalid("contacts", "Некорректные контакты");
  const contactNames = new Set<string>(contactFields.map((field) => field.name));
  for (const key of Object.keys(rawContacts)) {
    if (!contactNames.has(key)) invalid(`contacts.${key}`, "Неизвестное контактное поле");
  }
  const contacts: ValidatedSubmission["contacts"] = {};
  for (const field of contactFields) {
    if (body[field.name] !== undefined && rawContacts[field.name] !== undefined &&
      body[field.name] !== rawContacts[field.name]) {
      invalid(`contacts.${field.name}`, "Переданы разные значения контактного поля");
    }
    const value = textField(
      rawContacts[field.name] ?? body[field.name],
      `contacts.${field.name}`,
      200,
      field.required && !preview,
    );
    if (value && field.options && !field.options.includes(value)) {
      invalid(`contacts.${field.name}`, "Выберите значение из списка");
    }
    if (value && field.name === "age" && !field.options &&
      (!/^\d{1,3}$/u.test(value) || Number(value) < 1 || Number(value) > 120)) {
      invalid("contacts.age", "Возраст должен быть от 1 до 120");
    }
    if (value) contacts[field.name] = value;
  }
  if (!isRecord(body.answers)) invalid("answers", "Ожидается объект ответов");
  const questionIds = new Set(questions.map((question) => question.id));
  for (const key of Object.keys(body.answers)) {
    if (!questionIds.has(key)) invalid(`answers.${key}`, "Неизвестный вопрос");
  }
  const answers: Record<string, string> = {};
  for (const question of questions) {
    const type = parseQuestionType(question.type);
    const value = textField(
      body.answers[question.id],
      `answers.${question.id}`,
      type === "essay" ? 20_000 : type === "short_text" ? 2000 : 200,
      question.required,
    );
    if (value && type === "choice" && !question.options.some((option) => option.id === value)) {
      invalid(`answers.${question.id}`, "Неизвестный вариант ответа");
    }
    if (value) answers[question.id] = value;
  }
  return { name, phone, email: email || null, consent, contacts, answers };
}

function questionKey(question: GradingQuestion): string[] | null {
  const type = parseQuestionType(question.type);
  if (type === "essay") return null;
  if (type === "short_text") {
    const accepted = parseAcceptedAnswers(question.acceptedAnswers);
    return accepted.length ? accepted.map((answer) => answer.toLowerCase()) : null;
  }
  const correct = question.options.filter((option) => option.correct);
  if (correct.length > 1) throw new Error("У вопроса несколько правильных вариантов");
  return correct.length === 1 ? [correct[0].id] : null;
}

export function gradeTest(
  test: GradingTest,
  answers: Record<string, string>,
): TestSubmissionResult {
  if (test.scoringMode !== "raw" && test.scoringMode !== "level") {
    throw new Error("Неизвестный способ подсчета результата");
  }
  let score = 0;
  let total = 0;
  let pendingReview = 0;
  for (const question of test.questions) {
    const key = questionKey(question);
    const value = answers[question.id]?.trim();
    if (!key) {
      if (value) pendingReview += 1;
      continue;
    }
    total += 1;
    const normalized = question.type === "short_text" ? value?.toLowerCase() : value;
    if (normalized && key.includes(normalized)) score += 1;
  }
  return {
    ok: true,
    score,
    total,
    level: test.scoringMode === "raw" ? `${score}/${total}` : computeLevel(test.kind, score, total),
    pendingReview,
  };
}

export function createSubmissionSnapshot(
  test: GradingTest,
  submission: ValidatedSubmission,
  contactFields: TestContactField[],
  result: TestSubmissionResult,
): string {
  return JSON.stringify({
    version: 1,
    test: {
      id: test.id,
      slug: test.slug,
      title: test.title,
      kind: test.kind,
      scoringMode: test.scoringMode,
      sourceKey: test.sourceKey,
      sourceHash: test.sourceHash,
    },
    contactFields,
    contact: {
      name: submission.name,
      phone: submission.phone,
      email: submission.email,
      ...submission.contacts,
    },
    consent: submission.consent,
    result,
    questions: test.questions.map((question) => ({
      id: question.id,
      sourceKey: question.sourceKey,
      type: question.type,
      required: question.required,
      text: question.text,
      contentHtml: sanitizeTestHtml(question.contentHtml),
      acceptedAnswers: parseAcceptedAnswers(question.acceptedAnswers),
      options: question.options.map((option) => ({
        id: option.id,
        text: option.text,
        contentHtml: sanitizeTestHtml(option.contentHtml),
        correct: option.correct,
      })),
      submittedValue: submission.answers[question.id] ?? null,
      grading: questionKey(question) ? "automatic" :
        submission.answers[question.id] ? "pending_review" : "not_submitted",
    })),
  });
}
