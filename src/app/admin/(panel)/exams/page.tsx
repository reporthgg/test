import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Icon from "@/components/Icon";

export const dynamic = "force-dynamic";

export default async function ExamsAdminPage() {
  const tests = await prisma.test.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { questions: true, results: true } } },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">
          Тесты
        </h1>
        <p className="text-on-surface-variant mt-1">
          Редактируйте вопросы, проверяйте черновики и просматривайте ответы участников.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {tests.map((t) => (
          <div
            key={t.id}
            className="bg-white border border-border-subtle rounded-xl p-6 flex flex-col"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-xl font-bold text-primary">{t.title}</h3>
                <span className="text-xs uppercase tracking-wider text-on-surface-variant">
                  {t.audience === "kids" ? "Для детей" : "Взрослые/подростки"} ·{" "}
                  {t.kind}
                </span>
              </div>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  t.published
                    ? "bg-clever-green/10 text-clever-green"
                    : "bg-surface-variant text-on-surface-variant"
                }`}
              >
                {t.published ? "Опубликован" : "Черновик"}
              </span>
            </div>
            <p className="text-sm text-on-surface-variant flex-1">
              {t.description}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-border-subtle text-sm">
              <span className="text-on-surface-variant">
                {t._count.questions} вопросов · {t._count.results} прохождений
              </span>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/test/${t.slug}?preview=1`}
                  target="_blank"
                  className="font-semibold text-on-surface-variant hover:text-primary"
                >
                  Предпросмотр
                </Link>
                <Link href={`/admin/exams/${t.id}/results`} className="font-semibold text-primary hover:underline">Результаты</Link>
                <Link
                  href={`/admin/exams/${t.id}`}
                  className="font-semibold text-primary hover:underline inline-flex items-center gap-1"
                >
                  Редактировать <Icon name="arrow_forward" className="text-sm" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
