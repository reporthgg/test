import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Icon from "@/components/Icon";
import TestMetaForm from "@/components/admin/TestMetaForm";
import QuestionEditor from "@/components/admin/QuestionEditor";
import AddQuestionButton from "@/components/admin/AddQuestionButton";
import BulkImport from "@/components/admin/BulkImport";
import { parseAcceptedAnswers, parseQuestionType, parseTestContactFields } from "@/lib/test-content";
import { publicationErrors } from "../validation";

export const dynamic = "force-dynamic";

export default async function EditTestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const test = await prisma.test.findUnique({
    where: { id },
    include: {
      questions: {
        orderBy: { order: "asc" },
        include: { options: { orderBy: { order: "asc" } } },
      },
    },
  });

  if (!test) notFound();
  const errors = publicationErrors(test.questions);

  return (
    <div>
      <Link
        href="/admin/exams"
        className="inline-flex items-center gap-1 text-sm font-semibold text-on-surface-variant hover:text-primary mb-4"
      >
        ← Все тесты
      </Link>
      <h1 className="text-3xl font-extrabold text-primary tracking-tight mb-6">
        {test.title}
      </h1>
      <div className="flex flex-wrap gap-4 mb-6 text-sm font-semibold">
        <Link href={`/test/${test.slug}?preview=1`} target="_blank" className="text-primary hover:underline">Предпросмотр без сохранения</Link>
        <Link href={`/admin/exams/${test.id}/results`} className="text-primary hover:underline">Результаты и письменные ответы</Link>
      </div>
      {errors.length > 0 && <div className="rounded-xl border border-error/30 p-4 mb-6 text-sm">
        <p className="font-semibold mb-2">Перед публикацией исправьте:</p>
        <ul className="list-disc pl-5 space-y-1">{errors.map((error) => <li key={error}>{error}</li>)}</ul>
      </div>}

      <TestMetaForm
        testId={test.id}
        title={test.title}
        description={test.description ?? ""}
        timeLimit={test.timeLimit}
        published={test.published}
        scoringMode={test.scoringMode === "raw" ? "raw" : "level"}
        contactFields={parseTestContactFields(test.contactFields)}
      />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-on-surface">
          Вопросы ({test.questions.length})
        </h2>
      </div>

      <div className="space-y-4 mb-6">
        {test.questions.map((q, i) => (
          <QuestionEditor
            key={q.id}
            testId={test.id}
            index={i}
            question={{
              id: q.id,
              text: q.text,
              contentHtml: q.contentHtml,
              type: parseQuestionType(q.type),
              required: q.required,
              acceptedAnswers: parseAcceptedAnswers(q.acceptedAnswers),
              options: q.options.map((o) => ({
                id: o.id,
                text: o.text,
                contentHtml: o.contentHtml,
                correct: o.correct,
              })),
            }}
          />
        ))}
      </div>

      <BulkImport testId={test.id} />

      <AddQuestionButton testId={test.id} />

      <p className="text-xs text-on-surface-variant mt-4 flex items-center gap-1">
        <Icon name="help" className="text-sm" />
        Сохраните каждый вопрос перед публикацией. Добавление и массовый импорт доступны в черновике.
      </p>
    </div>
  );
}
