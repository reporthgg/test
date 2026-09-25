import { prisma } from "@/lib/prisma";
import Icon from "@/components/Icon";
import LeadRow from "@/components/admin/LeadRow";
import Link from "next/link";

export const dynamic = "force-dynamic";

const filters = [
  { key: "all", label: "Все" },
  { key: "new", label: "Новые" },
  { key: "contacted", label: "Связались" },
  { key: "enrolled", label: "Записаны" },
];

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const { status = "all", q = "" } = await searchParams;

  const where: Record<string, unknown> = {};
  if (status !== "all") where.status = status;
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { phone: { contains: q } },
      { email: { contains: q } },
      { interest: { contains: q } },
    ];
  }

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({ where, orderBy: { createdAt: "desc" }, take: 200 }),
    prisma.lead.count(),
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">
          Заявки
        </h1>
        <p className="text-on-surface-variant mt-1">
          Все обращения с форм сайта. Всего в базе: {total}.
        </p>
      </div>

      {/* панель фильтров */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <Link
              key={f.key}
              href={`/admin/leads?status=${f.key}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                status === f.key
                  ? "bg-primary text-white border-primary"
                  : "bg-surface border-border-subtle text-on-surface-variant hover:border-primary hover:text-primary"
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>
        <form method="get" className="flex items-center gap-2">
          <input type="hidden" name="status" value={status} />
          <div className="flex items-center bg-surface-container-low rounded-full px-4 py-2 border border-border-subtle focus-within:border-primary transition-colors">
            <Icon name="search" className="text-outline mr-2" />
            <input
              name="q"
              defaultValue={q}
              placeholder="Поиск по имени, телефону…"
              className="bg-transparent border-none focus:ring-0 text-sm w-56 p-0"
            />
          </div>
        </form>
      </div>

      {/* таблица */}
      <div className="bg-white rounded-xl border border-border-subtle shadow-[0_4px_20px_rgba(19,86,133,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-border-subtle text-xs uppercase tracking-wider text-on-surface-variant">
                <th className="py-4 px-4 font-semibold">Имя</th>
                <th className="py-4 px-4 font-semibold">Контакты</th>
                <th className="py-4 px-4 font-semibold">Интерес</th>
                <th className="py-4 px-4 font-semibold">Город</th>
                <th className="py-4 px-4 font-semibold">Дата</th>
                <th className="py-4 px-4 font-semibold">Статус</th>
                <th className="py-4 px-4 font-semibold text-right">•••</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {leads.map((l) => (
                <LeadRow
                  key={l.id}
                  lead={{ ...l, createdAt: l.createdAt.toISOString() }}
                />
              ))}
            </tbody>
          </table>
        </div>
        {leads.length === 0 && (
          <div className="py-20 text-center text-on-surface-variant">
            <Icon name="group" className="text-5xl text-outline-variant mx-auto mb-4" />
            <p className="font-semibold">Заявок пока нет</p>
            <p className="text-sm mt-1">
              Оставьте заявку через форму на сайте, и она появится здесь.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
