import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import Aurora from "@/components/ui/Aurora";
import Reveal from "@/components/Reveal";
import { prisma } from "@/lib/prisma";
import { getServerLocale } from "@/lib/locale";
import { getTestsDict } from "@/i18n/pages/tests";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Онлайн-тесты уровня: English, IELTS, SAT | GSC Study",
  description:
    "Бесплатные онлайн-тесты по английскому для взрослых и детей, IELTS и SAT. Письменные задания проверяет преподаватель.",
};

export default async function TestsHubPage() {
  const locale = await getServerLocale();
  const t = getTestsDict(locale);

  const tests = await prisma.test.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    include: { _count: { select: { questions: true } } },
  });

  return (
    <>
      <Header />
      <main className="pt-20">
        <Reveal>
          <section className="relative overflow-hidden py-20 bg-surface-container-lowest bg-dots">
            <Aurora intensity="subtle" />
            <div className="relative z-10 max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <span className="tag-pill">{t.hub.badge}</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
                <span className="text-gradient">{t.hub.title}</span>
              </h1>
              <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
                {t.hub.subtitle}
              </p>
            </div>
          </section>
        </Reveal>

        <section className="py-16">
          <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="grid md:grid-cols-2 gap-6">
                {tests.map((test) => (
                  <Link
                    key={test.id}
                    href={`/test/${test.slug}`}
                    className="card-premium card-spotlight card-ring rounded-2xl bg-white p-8 flex flex-col group"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                        <Icon name={test.audience === "kids" ? "group" : "quiz"} className="text-2xl" />
                      </div>
                      <span className="tag-pill !mb-0">
                        {test.audience === "kids" ? t.hub.forKids : t.hub.forAdults}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-2">{test.title}</h3>
                    <p className="text-on-surface-variant flex-1 leading-relaxed">{test.description}</p>
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-border-subtle">
                      <span className="inline-flex items-center gap-2 text-sm text-on-surface-variant">
                        <span className="inline-flex items-center gap-1.5">
                          <Icon name="help_outline" className="text-base text-primary/70" />
                          {t.intro.metaQuestions}: {test._count.questions}
                        </span>
                        <span className="text-border-subtle">·</span>
                        <span className="inline-flex items-center gap-1.5">
                          <Icon name="schedule" className="text-base text-primary/70" />
                          {test.timeLimit ? `${test.timeLimit} ${t.hub.minutes}` : t.hub.noLimit}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1 font-bold text-secondary group-hover:gap-2 transition-all">
                        {t.hub.start} <Icon name="arrow_forward" className="text-sm" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
