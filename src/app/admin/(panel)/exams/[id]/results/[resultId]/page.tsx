import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { sanitizeTestHtml } from "@/lib/test-content";
import { legacyResultQuestions, parseResultSnapshot } from "../../../results-data";

export const dynamic = "force-dynamic";

export default async function TestResultDetailPage({
  params,
}: {
  params: Promise<{ id: string; resultId: string }>;
}) {
  if (!await verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value)) redirect("/admin/login");
  const { id, resultId } = await params;
  const result = await prisma.testResult.findFirst({
    where: { id: resultId, testId: id },
    include: {
      test: { include: { questions: { orderBy: { order: "asc" }, include: { options: { orderBy: { order: "asc" } } } } } },
    },
  });
  if (!result) notFound();
  const snapshot = parseResultSnapshot(result.submissionSnapshot);
  const questions = snapshot?.questions ?? legacyResultQuestions(result.answers, result.test.questions);
  const contacts = snapshot?.contact ?? { name: result.name, phone: result.phone, ...(result.email ? { email: result.email } : {}) };
  const labels: Record<string, string> = {
    name: "Имя", phone: "Телефон", email: "Email", age: "Возраст", city: "Город", branch: "Филиал", studyFormat: "Формат обучения",
    ...snapshot?.contactLabels,
  };

  return <div>
    <Link href={`/admin/exams/${id}/results`} className="text-primary font-semibold text-sm hover:underline">Все результаты теста</Link>
    <h1 className="text-3xl font-extrabold text-primary mt-4">{snapshot?.title ?? result.test.title}</h1>
    <p className="text-on-surface-variant mt-2">{result.createdAt.toLocaleString("ru-RU", { timeZone: "Asia/Almaty" })}</p>
    <section className="rounded-xl border border-border-subtle bg-white p-6 my-6">
      <h2 className="text-xl font-bold mb-4">Участник и результат</h2>
      <dl className="grid sm:grid-cols-2 gap-4">
        {Object.entries(contacts).map(([name, value]) => <div key={name}>
          <dt className="text-xs uppercase tracking-wide text-on-surface-variant">{labels[name] ?? name}</dt>
          <dd className="font-semibold whitespace-pre-wrap break-words">{value || "Не указано"}</dd>
        </div>)}
        <div>
          <dt className="text-xs uppercase tracking-wide text-on-surface-variant">Согласие на обработку персональных данных</dt>
          <dd className="font-semibold">{snapshot?.consent === true ? "Получено" : snapshot?.consent === false ? "Не дано" : "Не зафиксировано"}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-on-surface-variant">Автоматический результат</dt>
          <dd className="font-semibold">{result.score} / {result.total}{result.level ? ` (${result.level})` : ""}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-on-surface-variant">Ответов на проверку</dt>
          <dd className="font-semibold">{result.pendingReview}</dd>
        </div>
      </dl>
      {result.pendingReview > 0 && <p className="mt-4 text-sm text-on-surface-variant">Эти ответы не оценены автоматически. Выставление оценок на этой странице не предусмотрено.</p>}
    </section>
    <p className="text-sm text-on-surface-variant mb-5">
      {snapshot
        ? "Показана сохранённая версия вопросов и ответов на момент прохождения."
        : "У старой записи нет доступной сохранённой версии вопросов. Показаны текущие формулировки, которые могли измениться после прохождения."}
    </p>
    <div className="space-y-5">
      {questions.map((question, index) => {
        const selected = question.type === "choice" ? question.options.find((option) => option.id === question.submittedValue) : undefined;
        const typeLabel = question.type === "choice" ? "Выбор варианта" : question.type === "short_text" ? "Короткий ответ" : question.type === "essay" ? "Эссе" : "Старый ответ";
        return <section key={question.id} className="rounded-xl border border-border-subtle bg-white p-6">
          <h2 className="font-bold mb-3">Вопрос {index + 1} · {typeLabel}</h2>
          <StoredContent text={question.text} html={question.contentHtml} />
          <div className="mt-5 rounded-lg bg-surface-container-low p-4">
            <h3 className="text-xs uppercase tracking-wide text-on-surface-variant mb-2">Ответ участника</h3>
            {!question.submittedValue ? <p className="text-on-surface-variant">Ответ не дан.</p>
              : selected ? <StoredContent text={selected.text} html={selected.contentHtml} />
              : <p className="whitespace-pre-wrap break-words">{question.type === "choice" ? `Выбранный вариант недоступен. Сохранённый ID: ${question.submittedValue}` : question.submittedValue}</p>}
          </div>
          {question.type === "choice" && question.options.length > 0 && <details className="mt-4 text-sm">
            <summary className="cursor-pointer text-primary">Варианты вопроса</summary>
            <ol className="list-decimal pl-6 mt-3 space-y-3">
              {question.options.map((option) => <li key={option.id}>
                <StoredContent text={option.text} html={option.contentHtml} />
              </li>)}
            </ol>
          </details>}
          {question.grading === "pending_review" && <p className="mt-3 text-sm font-semibold text-primary">Ожидает проверки. Автоматическая оценка не выставлена.</p>}
        </section>;
      })}
      {!questions.length && <p className="text-on-surface-variant">Сохранённые ответы недоступны.</p>}
    </div>
  </div>;
}

function StoredContent({ text, html }: { text: string; html: string | null }) {
  const safeHtml = html && html.length <= 200000 ? sanitizeTestHtml(html) : null;
  return safeHtml
    ? <div className="break-words overflow-x-auto [&_img]:max-w-full [&_img]:h-auto [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5" dangerouslySetInnerHTML={{ __html: safeHtml }} />
    : <p className="whitespace-pre-wrap break-words">{text}</p>;
}
