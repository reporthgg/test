import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendLeadToBitrix } from "@/lib/bitrix";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { parseTestContactFields } from "@/lib/test-content";
import {
  createSubmissionSnapshot,
  gradeTest,
  SubmissionValidationError,
  validateTestSubmission,
} from "@/lib/test-submission";

const MAX_BODY_BYTES = 1_000_000;

function errorResponse(
  status: number,
  code: string,
  message: string,
  details: Record<string, string> | null = null,
): NextResponse {
  return NextResponse.json(
    { ok: false, error: message, code, message, details },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

async function readPayload(request: Request): Promise<unknown> {
  if (!/^application\/json(?:\s*;|$)/iu.test(request.headers.get("content-type") ?? "")) {
    throw new SubmissionValidationError(
      "Ожидается application/json", {}, "UNSUPPORTED_MEDIA_TYPE", 415,
    );
  }
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
    throw new SubmissionValidationError("Запрос слишком большой", {}, "PAYLOAD_TOO_LARGE", 413);
  }
  const reader = request.body?.getReader();
  if (!reader) throw new SubmissionValidationError("Пустой запрос", {}, "INVALID_JSON");
  const decoder = new TextDecoder();
  let length = 0;
  let text = "";
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      length += chunk.value.byteLength;
      if (length > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new SubmissionValidationError(
          "Запрос слишком большой", {}, "PAYLOAD_TOO_LARGE", 413,
        );
      }
      text += decoder.decode(chunk.value, { stream: true });
    }
    text += decoder.decode();
  } finally {
    reader.releaseLock();
  }
  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new SubmissionValidationError("Некорректный JSON", {}, "INVALID_JSON");
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
  try {
    const { slug } = await params;
    const preview = request.nextUrl.searchParams.get("preview") === "1";
    if (preview && !(await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value))) {
      return errorResponse(401, "UNAUTHORIZED", "Для предпросмотра войдите в админку");
    }
    const test = await prisma.test.findUnique({
      where: { slug },
      include: {
        questions: {
          orderBy: { order: "asc" },
          include: { options: { orderBy: { order: "asc" } } },
        },
      },
    });
    if (!test || (!test.published && !preview) || test.questions.length === 0) {
      return errorResponse(404, "TEST_NOT_FOUND", "Тест не найден");
    }
    const body = await readPayload(request);
    const contactFields = parseTestContactFields(test.contactFields);
    const submission = validateTestSubmission(body, test.questions, contactFields, preview);
    const result = gradeTest(test, submission.answers);
    if (preview) {
      return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
    }
    const { name, phone, email, contacts, answers } = submission;
    const { score, total, level, pendingReview } = result;
    const snapshot = createSubmissionSnapshot(test, submission, contactFields, result);

    await prisma.$transaction(async (transaction) => {
      // заявка (лид)
      const lead = await transaction.lead.create({
        data: {
          name,
          phone,
          email,
          city: contacts.city ?? null,
          interest: `${test.title}: ${level}`,
          source: `test:${slug}`,
          extra: JSON.stringify({ level, score, total, pendingReview, contacts }),
        },
      });
      await transaction.testResult.create({
        data: {
          testId: test.id,
          name,
          phone,
          email,
          score,
          total,
          level,
          pendingReview,
          answers: JSON.stringify(answers),
          submissionSnapshot: snapshot,
          leadId: lead.id,
        },
      });
    });

    try {
      await sendLeadToBitrix({
        name,
        phone,
        email,
        source: `test:${slug}`,
        title: `Тест «${test.title}»: ${level}`,
        comment: [
          `Результат теста «${test.title}»: ${level}`,
          `Правильных: ${score} из ${total}`,
          `Ожидают проверки: ${pendingReview}`,
          ...contactFields
            .filter((field) => contacts[field.name])
            .map((field) => `${field.label}: ${contacts[field.name]}`),
        ].join("\n"),
      });
    } catch (error) {
      console.error("[test submit] CRM delivery failed:", error);
    }
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    if (e instanceof SubmissionValidationError) {
      return errorResponse(e.status, e.code, e.message, e.details);
    }
    console.error("[test submit] error:", e);
    return errorResponse(500, "SUBMISSION_FAILED", "Не удалось сохранить результат");
  }
}
