import type { TestQuestion } from "@/lib/test-types";

export function isQuestionAnswered(question: TestQuestion, answer: string | undefined): boolean {
  if (!answer?.trim()) return false;
  return question.type !== "choice" || question.options.some((option) => option.id === answer);
}

export function firstMissingAnswer(questions: TestQuestion[], answers: Record<string, string>): number {
  return questions.findIndex((question) => question.required && !isQuestionAnswered(question, answers[question.id]));
}
