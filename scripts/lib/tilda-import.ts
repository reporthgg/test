import { createHash } from "node:crypto";
import { readFile, realpath, stat } from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";
import type { PrismaClient } from "@prisma/client";
import {
  isRecord,
  isSafeTestImageUrl,
  parseQuestionType,
  sanitizeTestHtml,
  validateTestContactFields,
} from "../../src/lib/test-content";
import type { QuestionType, TestContactField } from "../../src/lib/test-types";

export type TildaImportQuestion = {
  sourceKey: string;
  type: QuestionType;
  text: string;
  contentHtml: string | null;
  required: boolean;
  acceptedAnswers: string[];
  options: { text: string; contentHtml: string | null; correct: boolean }[];
};

export type TildaImportTest = {
  sourceKey: string;
  sourceHash: string;
  slug: string;
  title: string;
  kind: "placement" | "kids" | "ielts" | "sat";
  audience: "adults" | "kids";
  description: string | null;
  timeLimit: number | null;
  scoringMode: "raw";
  contactFields: TestContactField[];
  questions: TildaImportQuestion[];
  warnings: string[];
};

export type TildaManifest = {
  version: 1;
  source: { projectId: string; pageId: string; url: string; exportedAt: string };
  tests: TildaImportTest[];
  assets: { sourceUrl: string; path: string; sha256: string }[];
  warnings: string[];
};

function fail(location: string, reason: string): never {
  throw new Error(`${location}: ${reason}`);
}

function object(value: unknown, location: string): Record<string, unknown> {
  return isRecord(value) ? value : fail(location, "ожидается объект");
}

function string(value: unknown, location: string, max = 20_000, allowEmpty = false): string {
  if (typeof value !== "string" || value.length > max || (!allowEmpty && !value.trim())) {
    fail(location, "некорректная строка");
  }
  return value;
}

function nullableString(value: unknown, location: string, max = 20_000): string | null {
  return value === null ? null : string(value, location, max, true);
}

function array(value: unknown, location: string, max: number): unknown[] {
  if (!Array.isArray(value) || value.length > max) fail(location, "некорректный массив");
  return value;
}

function boolean(value: unknown, location: string): boolean {
  if (typeof value !== "boolean") fail(location, "ожидается boolean");
  return value;
}

function key(value: unknown, location: string): string {
  const result = string(value, location, 200);
  if (!/^[a-zA-Z0-9][a-zA-Z0-9:._/-]*$/u.test(result)) {
    fail(location, "некорректный sourceKey");
  }
  return result;
}

function hash(value: unknown, location: string): string {
  const result = string(value, location, 64);
  if (!/^[a-f0-9]{64}$/iu.test(result)) fail(location, "ожидается SHA-256");
  return result.toLowerCase();
}

function warnings(value: unknown, location: string): string[] {
  return array(value, location, 1000).map((entry, index) =>
    string(entry, `${location}[${index}]`, 4000));
}

function httpsUrl(value: unknown, location: string): string {
  const result = string(value, location, 4000);
  if (!result.startsWith("https://") || !isSafeTestImageUrl(result)) {
    fail(location, "ожидается безопасный HTTPS URL");
  }
  return result;
}

function content(
  value: unknown,
  location: string,
  assets: Set<string>,
  testWarnings: string[],
): string | null {
  const html = nullableString(value, location, 200_000);
  if (!html) return null;
  const $ = load(html, null, false);
  $("img").each((_index, image) => {
    const src = $(image).attr("src") ?? "";
    if (!isSafeTestImageUrl(src)) fail(location, "небезопасный адрес изображения");
    if (src.startsWith("/") && !assets.has(src)) {
      fail(location, `изображение отсутствует в assets: ${src}`);
    }
    if (src.startsWith("https://")) {
      testWarnings.push(`${location}: внешнее изображение ${src}`);
    }
  });
  return sanitizeTestHtml(html);
}

export function validateTildaManifest(value: unknown): TildaManifest {
  const manifest = object(value, "manifest");
  if (manifest.version !== 1) fail("version", "поддерживается версия 1");
  const source = object(manifest.source, "source");
  if (source.projectId !== "3304416" || source.pageId !== "71753845") {
    fail("source", "неожиданный проект или страница Tilda");
  }
  const exportedAt = string(source.exportedAt, "source.exportedAt", 100);
  if (Number.isNaN(Date.parse(exportedAt))) fail("source.exportedAt", "некорректная дата");
  const assets = array(manifest.assets, "assets", 2000).map((value, index) => {
    const asset = object(value, `assets[${index}]`);
    const assetPath = string(asset.path, `assets[${index}].path`, 500);
    if (!assetPath.startsWith("/test-assets/tilda/") || !isSafeTestImageUrl(assetPath)) {
      fail(`assets[${index}].path`, "допустим только локальный путь /test-assets/tilda/");
    }
    return {
      sourceUrl: httpsUrl(asset.sourceUrl, `assets[${index}].sourceUrl`),
      path: assetPath,
      sha256: hash(asset.sha256, `assets[${index}].sha256`),
    };
  });
  const assetPaths = new Set(assets.map((asset) => asset.path));
  if (assetPaths.size !== assets.length) fail("assets", "повторяющийся путь");
  const globalWarnings = warnings(manifest.warnings, "warnings");
  const rawTests = array(manifest.tests, "tests", 5);
  if (rawTests.length !== 5) fail("tests", "ожидаются все пять тестов");
  const sourceKeys = new Set<string>();
  const slugs = new Set<string>();
  const tests = rawTests.map((value, testIndex): TildaImportTest => {
    const location = `tests[${testIndex}]`;
    const test = object(value, location);
    const sourceKey = key(test.sourceKey, `${location}.sourceKey`);
    const slug = string(test.slug, `${location}.slug`, 150);
    if (!/^tilda-[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(slug)) {
      fail(`${location}.slug`, "нужен новый slug с префиксом tilda-");
    }
    if (sourceKeys.has(sourceKey) || slugs.has(slug)) fail(location, "повторный ключ или slug");
    sourceKeys.add(sourceKey);
    slugs.add(slug);
    if (!["placement", "kids", "ielts", "sat"].includes(String(test.kind))) {
      fail(`${location}.kind`, "неизвестный вид теста");
    }
    if (test.audience !== "adults" && test.audience !== "kids") {
      fail(`${location}.audience`, "неизвестная аудитория");
    }
    if (test.scoringMode !== "raw") fail(`${location}.scoringMode`, "ожидается raw");
    if (test.timeLimit !== null && (typeof test.timeLimit !== "number" ||
      !Number.isInteger(test.timeLimit) || test.timeLimit < 1 || test.timeLimit > 720)) {
      fail(`${location}.timeLimit`, "некорректное время");
    }
    const testWarnings = warnings(test.warnings, `${location}.warnings`);
    const questionKeys = new Set<string>();
    const questions = array(test.questions, `${location}.questions`, 500).map(
      (value, questionIndex): TildaImportQuestion => {
        const qLocation = `${location}.questions[${questionIndex}]`;
        const question = object(value, qLocation);
        const qKey = key(question.sourceKey, `${qLocation}.sourceKey`);
        if (questionKeys.has(qKey)) fail(qLocation, "повторный ключ вопроса");
        questionKeys.add(qKey);
        const type = parseQuestionType(string(question.type, `${qLocation}.type`, 20));
        const text = string(question.text, `${qLocation}.text`, 20_000, true);
        const contentHtml = content(question.contentHtml, `${qLocation}.contentHtml`, assetPaths, testWarnings);
        if (!text.trim() && !contentHtml) fail(qLocation, "пустой вопрос");
        const acceptedAnswers = array(question.acceptedAnswers, `${qLocation}.acceptedAnswers`, 100)
          .map((answer, index) => string(answer, `${qLocation}.acceptedAnswers[${index}]`, 2000).trim());
        const options = array(question.options, `${qLocation}.options`, 30).map((value, index) => {
          const oLocation = `${qLocation}.options[${index}]`;
          const option = object(value, oLocation);
          const optionText = string(option.text, `${oLocation}.text`, 10_000, true);
          const optionHtml = content(option.contentHtml, `${oLocation}.contentHtml`, assetPaths, testWarnings);
          if (!optionText.trim() && !optionHtml) fail(oLocation, "пустой вариант");
          return {
            text: optionText,
            contentHtml: optionHtml,
            correct: boolean(option.correct, `${oLocation}.correct`),
          };
        });
        const correctCount = options.filter((option) => option.correct).length;
        if (type === "choice") {
          if (options.length < 2 || correctCount > 1 || acceptedAnswers.length) {
            fail(qLocation, "choice требует варианты и не более одного правильного ответа");
          }
          if (correctCount === 0) {
            testWarnings.push(`${qKey}: ключ ответа не восстановлен, публикация запрещена`);
          }
        } else {
          if (options.length) fail(qLocation, "текстовый вопрос не может содержать варианты");
          if (type === "essay" && acceptedAnswers.length) {
            fail(qLocation, "эссе проверяется вручную");
          }
          if (type === "short_text" && acceptedAnswers.length === 0) {
            testWarnings.push(`${qKey}: текстовый ключ не восстановлен, публикация запрещена`);
          }
        }
        return {
          sourceKey: qKey,
          type,
          text,
          contentHtml,
          required: boolean(question.required, `${qLocation}.required`),
          acceptedAnswers,
          options,
        };
      },
    );
    if (!questions.length) fail(`${location}.questions`, "нет вопросов");
    return {
      sourceKey,
      sourceHash: hash(test.sourceHash, `${location}.sourceHash`),
      slug,
      title: string(test.title, `${location}.title`, 300),
      kind: test.kind as TildaImportTest["kind"],
      audience: test.audience,
      description: nullableString(test.description, `${location}.description`),
      timeLimit: test.timeLimit as number | null,
      scoringMode: "raw",
      contactFields: validateTestContactFields(test.contactFields),
      questions,
      warnings: [...new Set(testWarnings)],
    };
  });
  return {
    version: 1,
    source: {
      projectId: "3304416",
      pageId: "71753845",
      url: httpsUrl(source.url, "source.url"),
      exportedAt,
    },
    tests,
    assets,
    warnings: globalWarnings,
  };
}

export async function validateTildaAssets(manifest: TildaManifest, root: string): Promise<void> {
  const publicRoot = await realpath(path.resolve(root, "public"));
  for (const asset of manifest.assets) {
    const filename = path.resolve(publicRoot, decodeURIComponent(asset.path.slice(1)));
    const actualPath = await realpath(filename);
    const relative = path.relative(publicRoot, actualPath);
    if (relative.startsWith("..") || path.isAbsolute(relative)) {
      fail(asset.path, "файл вне public");
    }
    const metadata = await stat(actualPath);
    if (!metadata.isFile() || metadata.size > 20_000_000) fail(asset.path, "некорректный файл");
    const actualHash = createHash("sha256").update(await readFile(actualPath)).digest("hex");
    if (actualHash !== asset.sha256) fail(asset.path, "SHA-256 файла не совпадает");
  }
}

export async function readTildaManifest(filename: string, root: string): Promise<TildaManifest> {
  const metadata = await stat(filename);
  if (metadata.size > 30_000_000) fail("manifest", "файл слишком большой");
  const manifest = validateTildaManifest(JSON.parse(await readFile(filename, "utf8")) as unknown);
  await validateTildaAssets(manifest, root);
  return manifest;
}

export type TildaImportOutcome = { slug: string; status: "created" | "skipped"; id: string };

export async function importTildaTests(
  prisma: PrismaClient,
  manifest: TildaManifest,
): Promise<TildaImportOutcome[]> {
  return prisma.$transaction(async (transaction) => {
    const existing = await transaction.test.findMany({
      where: {
        OR: [
          { sourceKey: { in: manifest.tests.map((test) => test.sourceKey) } },
          { slug: { in: manifest.tests.map((test) => test.slug) } },
        ],
      },
      select: { id: true, sourceKey: true, sourceHash: true, slug: true },
    });
    for (const test of manifest.tests) {
      const byKey = existing.find((entry) => entry.sourceKey === test.sourceKey);
      const bySlug = existing.find((entry) => entry.slug === test.slug);
      if (bySlug && bySlug.sourceKey !== test.sourceKey) {
        fail(test.slug, "slug уже занят, существующий тест не изменен");
      }
      if (byKey && (byKey.sourceHash !== test.sourceHash || byKey.slug !== test.slug)) {
        fail(test.sourceKey, "содержимое или slug изменились, автоматическая замена запрещена");
      }
    }
    const outcomes: TildaImportOutcome[] = [];
    for (const [order, test] of manifest.tests.entries()) {
      const found = existing.find((entry) => entry.sourceKey === test.sourceKey);
      if (found) {
        outcomes.push({ slug: test.slug, status: "skipped", id: found.id });
        continue;
      }
      const created = await transaction.test.create({
        data: {
          sourceKey: test.sourceKey,
          sourceHash: test.sourceHash,
          slug: test.slug,
          title: test.title,
          kind: test.kind,
          audience: test.audience,
          description: test.description,
          timeLimit: test.timeLimit,
          scoringMode: "raw",
          contactFields: JSON.stringify(test.contactFields),
          published: false,
          order,
          questions: {
            create: test.questions.map((question, questionOrder) => ({
              sourceKey: question.sourceKey,
              type: question.type,
              text: question.text,
              contentHtml: question.contentHtml,
              required: question.required,
              acceptedAnswers: JSON.stringify(question.acceptedAnswers),
              order: questionOrder,
              options: {
                create: question.options.map((option, optionOrder) => ({ ...option, order: optionOrder })),
              },
            })),
          },
        },
        select: { id: true },
      });
      outcomes.push({ slug: test.slug, status: "created", id: created.id });
    }
    return outcomes;
  }, { maxWait: 10_000, timeout: 120_000 });
}
