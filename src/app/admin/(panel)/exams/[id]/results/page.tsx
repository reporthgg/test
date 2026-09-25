import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function TestResultsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string; pending?: string }>;
}) {
  if (!await verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value)) redirect("/admin/login");
  const { id } = await params;
  const query = await searchParams;
  const page = Math.max(1, Math.min(1000000, Number.parseInt(query.page ?? "1", 10) || 1));
  const pending = query.pending === "1";
  const where = { testId: id, ...(pending ? { pendingReview: { gt: 0 } } : {}) };
  const [test, results, count] = await Promise.all([
    prisma.test.findUnique({ where: { id }, select: { title: true } }),
    prisma.testResult.findMany({
      where,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      skip: (page - 1) * 50,
      take: 50,
      select: { id: true, name: true, phone: true, email: true, score: true, total: true, level: true, pendingReview: true, createdAt: true },
    }),
    prisma.testResult.count({ where }),
  ]);
  if (!test) notFound();
  const base = `/admin/exams/${id}/results`;

  return <div>
    <Link href={`/admin/exams/${id}`} className="text-sm font-semibold text-primary hover:underline">К редактору теста</Link>
    <h1 className="text-3xl font-extrabold text-primary mt-4">Результаты: {test.title}</h1>
    <div className="flex flex-wrap gap-4 my-5 text-sm">
      <Link href={base} className={!pending ? "font-bold text-primary" : "text-on-surface-variant"}>Все результаты</Link>
      <Link href={`${base}?pending=1`} className={pending ? "font-bold text-primary" : "text-on-surface-variant"}>Есть ответы на проверку</Link>
      <span className="text-on-surface-variant">Найдено: {count}</span>
    </div>
    <p className="text-sm text-on-surface-variant mb-5">Здесь можно прочитать письменные ответы. Выставление оценок вручную пока не предусмотрено.</p>
    <div className="overflow-x-auto rounded-xl border border-border-subtle bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface-container-low">
          <tr>
            <th className="p-4">Участник</th>
            <th className="p-4">Автоматический результат</th>
            <th className="p-4">На проверку</th>
            <th className="p-4">Дата</th>
            <th className="p-4">Ответы</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {results.map((result) => <tr key={result.id}>
            <td className="p-4">
              <div className="font-semibold">{result.name}</div>
              <div>{result.phone}</div>
              {result.email && <div className="text-on-surface-variant">{result.email}</div>}
            </td>
            <td className="p-4">{result.score} / {result.total}{result.level && <span className="block text-on-surface-variant">{result.level}</span>}</td>
            <td className="p-4">{result.pendingReview}</td>
            <td className="p-4 whitespace-nowrap">{result.createdAt.toLocaleString("ru-RU", { timeZone: "Asia/Almaty" })}</td>
            <td className="p-4"><Link href={`${base}/${result.id}`} className="font-semibold text-primary hover:underline">Открыть ответы</Link></td>
          </tr>)}
        </tbody>
      </table>
      {!results.length && <p className="p-8 text-center text-on-surface-variant">Результатов пока нет.</p>}
    </div>
    <div className="flex justify-between items-center mt-5 text-sm">
      {page > 1 ? <Link href={`${base}?page=${page - 1}${pending ? "&pending=1" : ""}`} className="text-primary">Назад</Link> : <span />}
      <span>Страница {page} из {Math.max(1, Math.ceil(count / 50))}</span>
      {page * 50 < count ? <Link href={`${base}?page=${page + 1}${pending ? "&pending=1" : ""}`} className="text-primary">Далее</Link> : <span />}
    </div>
  </div>;
}
