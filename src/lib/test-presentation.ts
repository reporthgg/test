import type { Locale } from "@/i18n/config";
import { programsContent } from "@/components/landing/programs-content";

export type PublishedTest = {
  id: string;
  slug: string;
  title: string;
  kind: string;
  audience: string;
  timeLimit: number | null;
  questions: { type: string }[];
};

export function testPresentation(
  test: PublishedTest,
  locale: Locale,
): { title: string; flag: string; age: string } {
  const t = programsContent[locale];
  if (test.kind === "ielts") return { title: "IELTS", flag: "ielts", age: "" };
  if (test.kind === "sat") return { title: "SAT", flag: "sat", age: "" };
  if (test.slug === "tilda-kids-6-8") {
    return { title: t.testTitles.kids, flag: "kids-young", age: `(6-8 ${t.years})` };
  }
  if (test.slug === "tilda-kids-9-12") {
    return { title: t.testTitles.kids, flag: "kids-older", age: `(9-12 ${t.years})` };
  }
  if (test.slug === "general-english" || test.slug === "tilda-general-english") {
    return { title: t.testTitles.general, flag: "general", age: "" };
  }
  if (test.slug === "kids-english") {
    return { title: t.testTitles.kids, flag: "kids-young", age: "" };
  }
  return {
    title: test.title,
    flag: test.audience === "kids" ? "kids-young" : "general",
    age: "",
  };
}

export function questionSummary(
  test: Pick<PublishedTest, "questions">,
  locale: Locale,
): string {
  const written = test.questions.filter((question) => question.type === "essay").length;
  const questions = test.questions.length - written;
  const t = programsContent[locale];
  const rules = new Intl.PluralRules(locale === "kz" ? "kk" : locale);
  const questionCategory = rules.select(questions);
  const writtenCategory = rules.select(written);
  const questionForm = questionCategory === "one" || questionCategory === "few" ? questionCategory : "other";
  const writtenForm = writtenCategory === "one" || writtenCategory === "few" ? writtenCategory : "other";
  return `${questions} ${t.questionForms[questionForm]}${written > 0 ? ` + ${written} ${t.writtenForms[writtenForm]}` : ""}`;
}
