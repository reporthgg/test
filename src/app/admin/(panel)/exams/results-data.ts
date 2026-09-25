export type ResultQuestion = {
  id: string;
  text: string;
  contentHtml: string | null;
  type: string;
  options: { id: string; text: string; contentHtml: string | null }[];
  submittedValue: string | null;
  grading: string | null;
};

type ResultSnapshot = {
  title: string | null;
  questions: ResultQuestion[];
  contact: Record<string, string>;
  contactLabels: Record<string, string>;
  consent: boolean | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function parseResultSnapshot(raw: string | null): ResultSnapshot | null {
  if (!raw) return null;
  try {
    const snapshot: unknown = JSON.parse(raw);
    if (!isRecord(snapshot) || snapshot.version !== 1 || !Array.isArray(snapshot.questions)) return null;
    const questions: ResultQuestion[] = [];
    for (const question of snapshot.questions) {
      if (!isRecord(question) || typeof question.id !== "string" || typeof question.text !== "string" ||
        typeof question.type !== "string" || !Array.isArray(question.options) ||
        (question.submittedValue !== null && typeof question.submittedValue !== "string")) return null;
      const options: ResultQuestion["options"] = [];
      for (const option of question.options) {
        if (!isRecord(option) || typeof option.id !== "string" || typeof option.text !== "string") return null;
        options.push({ id: option.id, text: option.text, contentHtml: typeof option.contentHtml === "string" ? option.contentHtml : null });
      }
      questions.push({
        id: question.id,
        text: question.text,
        type: question.type,
        contentHtml: typeof question.contentHtml === "string" ? question.contentHtml : null,
        options,
        submittedValue: question.submittedValue,
        grading: typeof question.grading === "string" ? question.grading : null,
      });
    }
    const contact: Record<string, string> = {};
    if (isRecord(snapshot.contact)) {
      for (const [key, value] of Object.entries(snapshot.contact)) {
        if (typeof value === "string") contact[key] = value;
      }
    }
    const contactLabels: Record<string, string> = {};
    if (Array.isArray(snapshot.contactFields)) {
      for (const field of snapshot.contactFields) {
        if (isRecord(field) && typeof field.name === "string" && typeof field.label === "string") contactLabels[field.name] = field.label;
      }
    }
    return {
      title: isRecord(snapshot.test) && typeof snapshot.test.title === "string" ? snapshot.test.title : null,
      questions,
      contact,
      contactLabels,
      consent: typeof snapshot.consent === "boolean" ? snapshot.consent : null,
    };
  } catch {
    return null;
  }
}

export function legacyResultQuestions(
  rawAnswers: string | null,
  questions: Omit<ResultQuestion, "submittedValue" | "grading">[],
): ResultQuestion[] {
  let answers: Record<string, unknown> = {};
  try {
    const parsed: unknown = JSON.parse(rawAnswers ?? "{}");
    if (isRecord(parsed)) answers = parsed;
  } catch {
  }
  const result = questions.map((question) => ({
    ...question,
    submittedValue: typeof answers[question.id] === "string" ? answers[question.id] as string : null,
    grading: null,
  }));
  const ids = new Set(questions.map((question) => question.id));
  for (const [id, value] of Object.entries(answers)) {
    if (!ids.has(id) && typeof value === "string") {
      result.push({ id, text: "Вопрос удалён. Исходная формулировка недоступна.", contentHtml: null, type: "unknown", options: [], submittedValue: value, grading: null });
    }
  }
  return result;
}
