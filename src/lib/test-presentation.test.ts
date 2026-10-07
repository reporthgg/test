import assert from "node:assert/strict";
import { test } from "node:test";
import { questionSummary, testPresentation } from "./test-presentation";
import type { PublishedTest } from "./test-presentation";

const baseTest: PublishedTest = {
  id: "published-test",
  slug: "general-english",
  title: "General English 13+",
  kind: "placement",
  audience: "adults",
  timeLimit: null,
  questions: [],
};

test("questionSummary counts actual question types, not design figures", () => {
  const questions = [
    { type: "choice" },
    { type: "text" },
    { type: "essay" },
    { type: "essay" },
  ];
  assert.equal(questionSummary({ questions }, "ru"), "2 вопроса + 2 письменных задания");
  assert.equal(questionSummary({ questions }, "en"), "2 questions + 2 writing tasks");
  assert.equal(questionSummary({ questions }, "kz"), "2 сұрақ + 2 жазбаша тапсырма");
});

test("questionSummary preserves singular, plural and no-essay formatting", () => {
  assert.equal(questionSummary({ questions: [] }, "ru"), "0 вопросов");
  assert.equal(questionSummary({ questions: [{ type: "choice" }] }, "ru"), "1 вопрос");
  assert.equal(
    questionSummary({ questions: Array.from({ length: 25 }, () => ({ type: "choice" })) }, "ru"),
    "25 вопросов",
  );
  assert.equal(questionSummary({ questions: [{ type: "essay" }] }, "en"), "0 questions + 1 writing task");
});

test("presentation preserves both imported age groups", () => {
  assert.deepEqual(
    testPresentation({ ...baseTest, slug: "tilda-kids-6-8", kind: "kids" }, "ru"),
    { title: "English for Kids", flag: "kids-young", age: "(6-8 лет)" },
  );
  assert.deepEqual(
    testPresentation({ ...baseTest, slug: "tilda-kids-9-12", kind: "kids" }, "ru"),
    { title: "English for Kids", flag: "kids-older", age: "(9-12 лет)" },
  );
});

test("presentation preserves legacy, imported, exam and custom tests", () => {
  for (const slug of ["general-english", "tilda-general-english"]) {
    assert.equal(testPresentation({ ...baseTest, slug }, "en").flag, "general");
  }
  assert.equal(testPresentation({ ...baseTest, slug: "kids-english" }, "en").flag, "kids-young");
  assert.equal(testPresentation({ ...baseTest, kind: "ielts" }, "ru").title, "IELTS");
  assert.equal(testPresentation({ ...baseTest, kind: "sat" }, "ru").title, "SAT");
  assert.deepEqual(
    testPresentation({ ...baseTest, slug: "custom-test", title: "Custom English", audience: "kids" }, "en"),
    { title: "Custom English", flag: "kids-young", age: "" },
  );
});
