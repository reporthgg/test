export type QuestionType = "choice" | "short_text" | "essay";

export type TestOption = {
  id: string;
  text: string;
  contentHtml: string | null;
};

export type TestQuestion = {
  id: string;
  text: string;
  contentHtml: string | null;
  type: QuestionType;
  required: boolean;
  options: TestOption[];
};

export type TestContactField = {
  name: "age" | "city" | "branch" | "studyFormat";
  label: string;
  required: boolean;
  options?: string[];
};

export type TestSubmissionResult = {
  ok: true;
  score: number;
  total: number;
  level: string;
  pendingReview: number;
};
