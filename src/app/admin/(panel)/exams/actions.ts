"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { sanitizeTestHtml } from "@/lib/test-content";
import type { Prisma } from "@prisma/client";
import type { QuestionType } from "@/lib/test-types";
import { parseBulkQuestions, publicationErrors, validateQuestionInput, validateTestMetaInput } from "./validation";

async function requireAdmin(): Promise<void> {
  if (!await verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value)) throw new Error("Войдите в админку для сохранения.");
}

function validateId(id: string): void {
  if (typeof id !== "string" || !id || id.length > 200) throw new Error("Некорректный идентификатор.");
}

async function checkPublication(tx: Prisma.TransactionClient, testId: string): Promise<void> {
  const questions = await tx.question.findMany({
    where: { testId },
    orderBy: { order: "asc" },
    include: { options: true },
  });
  const errors = publicationErrors(questions);
  if (errors.length) throw new Error(`Тест не готов к публикации. ${errors.join(" ")}`);
}

function refresh(testId: string, slug: string): void {
  revalidatePath(`/admin/exams/${testId}`);
  revalidatePath("/admin/exams");
  revalidatePath(`/test/${slug}`);
  revalidatePath("/tests");
}

export async function saveTestMeta(testId: string, input: unknown) {
  await requireAdmin();
  validateId(testId);
  const data = validateTestMetaInput(input);
  const test = await prisma.$transaction(async (tx) => {
    if (data.published) await checkPublication(tx, testId);
    return tx.test.update({
      where: { id: testId },
      data: {
        title: data.title,
        description: data.description || null,
        timeLimit: data.timeLimit,
        published: data.published,
        scoringMode: data.scoringMode,
        contactFields: data.contactFields.length ? JSON.stringify(data.contactFields) : null,
      },
    });
  });
  refresh(testId, test.slug);
}

export async function addQuestion(testId: string, type: QuestionType = "choice"): Promise<void> {
  await requireAdmin();
  validateId(testId);
  if (!["choice", "short_text", "essay"].includes(type)) throw new Error("Неизвестный тип вопроса.");
  const test = await prisma.$transaction(async (tx) => {
    const test = await tx.test.findUniqueOrThrow({ where: { id: testId } });
    if (test.published) throw new Error("Сначала сохраните тест как черновик.");
    const last = await tx.question.aggregate({ where: { testId }, _max: { order: true } });
    await tx.question.create({
      data: {
        testId,
        type,
        order: (last._max.order ?? -1) + 1,
        text: "Новый вопрос",
        options: type === "choice" ? { create: [{ order: 0, text: "Вариант 1" }, { order: 1, text: "Вариант 2" }] } : undefined,
      },
    });
    return test;
  });
  refresh(testId, test.slug);
}

export async function deleteQuestion(testId: string, questionId: string): Promise<void> {
  await requireAdmin();
  validateId(testId);
  validateId(questionId);
  const test = await prisma.$transaction(async (tx) => {
    const question = await tx.question.findFirst({ where: { id: questionId, testId }, include: { test: true } });
    if (!question) throw new Error("Вопрос не принадлежит этому тесту.");
    await tx.question.delete({ where: { id: questionId } });
    if (question.test.published) await checkPublication(tx, testId);
    return question.test;
  });
  refresh(testId, test.slug);
}

export async function saveQuestion(testId: string, questionId: string, input: unknown) {
  await requireAdmin();
  validateId(testId);
  validateId(questionId);
  const data = validateQuestionInput(input);
  const saved = await prisma.$transaction(async (tx) => {
    const question = await tx.question.findFirst({
      where: { id: questionId, testId },
      include: { options: true, test: true },
    });
    if (!question) throw new Error("Вопрос не принадлежит этому тесту.");
    const ownedIds = new Set(question.options.map((option) => option.id));
    if (data.options.some((option) => option.id !== null && !ownedIds.has(option.id))) throw new Error("Вариант не принадлежит этому вопросу.");
    await tx.question.update({
      where: { id: questionId },
      data: {
        text: data.text,
        contentHtml: sanitizeTestHtml(data.contentHtml),
        type: data.type,
        required: data.required,
        acceptedAnswers: data.acceptedAnswers.length ? JSON.stringify(data.acceptedAnswers) : null,
      },
    });
    const retainedIds = data.options.flatMap((option) => option.id ? [option.id] : []);
    await tx.option.deleteMany({ where: { questionId, id: { notIn: retainedIds } } });
    for (const [order, option] of data.options.entries()) {
      const optionData = {
        text: option.text,
        contentHtml: sanitizeTestHtml(option.contentHtml),
        correct: option.correct,
        order,
      };
      if (option.id) await tx.option.update({ where: { id: option.id }, data: optionData });
      else await tx.option.create({ data: { ...optionData, questionId } });
    }
    if (question.test.published) await checkPublication(tx, testId);
    return {
      slug: question.test.slug,
      question: await tx.question.findUniqueOrThrow({
        where: { id: questionId },
        include: { options: { orderBy: { order: "asc" } } },
      }),
    };
  });
  refresh(testId, saved.slug);
  return saved.question;
}

export async function importQuestions(testId: string, raw: string) {
  try {
    await requireAdmin();
    validateId(testId);
    const parsed = parseBulkQuestions(raw);
    const test = await prisma.$transaction(async (tx) => {
      const test = await tx.test.findUniqueOrThrow({ where: { id: testId } });
      if (test.published) throw new Error("Перед импортом сохраните тест как черновик.");
      const last = await tx.question.aggregate({ where: { testId }, _max: { order: true } });
      for (const [index, question] of parsed.entries()) {
        await tx.question.create({
          data: {
            testId,
            type: "choice",
            order: (last._max.order ?? -1) + 1 + index,
            text: question.text,
            options: { create: question.options.map((option, order) => ({ ...option, order })) },
          },
        });
      }
      return test;
    }, { timeout: 30000 });
    refresh(testId, test.slug);
    return { ok: true as const, added: parsed.length, unresolved: parsed.filter((question) => !question.options.some((option) => option.correct)).length };
  } catch (e) {
    return { ok: false as const, error: e instanceof Error ? e.message : "Ошибка импорта." };
  }
}

export async function addOption(testId: string, questionId: string): Promise<void> {
  await requireAdmin();
  validateId(testId);
  validateId(questionId);
  const test = await prisma.$transaction(async (tx) => {
    const question = await tx.question.findFirst({ where: { id: questionId, testId }, include: { options: true, test: true } });
    if (!question) throw new Error("Вопрос не принадлежит этому тесту.");
    if (question.type !== "choice" || question.options.length >= 30) throw new Error("Нельзя добавить вариант к этому вопросу.");
    const order = question.options.reduce((max, option) => Math.max(max, option.order), -1) + 1;
    await tx.option.create({ data: { questionId, order, text: `Вариант ${order + 1}` } });
    if (question.test.published) await checkPublication(tx, testId);
    return question.test;
  });
  refresh(testId, test.slug);
}

export async function deleteOption(testId: string, optionId: string): Promise<void> {
  await requireAdmin();
  validateId(testId);
  validateId(optionId);
  const test = await prisma.$transaction(async (tx) => {
    const option = await tx.option.findFirst({ where: { id: optionId, question: { testId } }, include: { question: { include: { test: true } } } });
    if (!option) throw new Error("Вариант не принадлежит этому тесту.");
    await tx.option.delete({ where: { id: optionId } });
    if (option.question.test.published) await checkPublication(tx, testId);
    return option.question.test;
  });
  refresh(testId, test.slug);
}
