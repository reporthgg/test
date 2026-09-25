import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLocale } from "@/lib/locale";
import { getDictionary } from "@/i18n/dictionaries";
import { getTestsDict } from "@/i18n/pages/tests";
import Icon from "@/components/Icon";

export default async function Tests() {
  const locale = await getServerLocale();
  const t = getDictionary(locale).testsBlock;
  const { hub: h, intro } = getTestsDict(locale);

  const tests = await prisma.test.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    include: { _count: { select: { questions: true } } },
  });

  return (
    <section
      id="tests"
      className="py-24 md:py-28 bg-gray-layered my-8 rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="tag-pill">{t.eyebrow}</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.text}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {tests.map((test) => (
            <Link
              key={test.id}
              href={`/test/${test.slug}`}
              className="card-premium card-spotlight p-8 bg-white/90 backdrop-blur flex flex-col group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon
                    name={test.audience === "kids" ? "group" : "quiz"}
                    className="text-2xl"
                  />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  {test.audience === "kids" ? h.forKids : h.forAdults}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {test.title}
              </h3>
              <p className="text-gray-600 flex-1">{test.description}</p>
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  {intro.metaQuestions}: {test._count.questions} ·{" "}
                  {test.timeLimit
                    ? `${test.timeLimit} ${h.minutes}`
                    : h.noLimit}
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-secondary group-hover:gap-2 transition-all">
                  {h.start} <Icon name="arrow_forward" className="text-sm" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/tests"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
          >
            {h.title}
            <Icon name="arrow_forward" className="text-sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}
