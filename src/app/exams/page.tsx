import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import ExamsConsult from "@/components/exams/ExamsConsult";
import Aurora from "@/components/ui/Aurora";
import Reveal from "@/components/Reveal";
import { getServerLocale } from "@/lib/locale";
import { getExamsDict } from "@/i18n/pages/exams";
import { getTestsDict } from "@/i18n/pages/tests";
import { getPageContent } from "@/lib/page-content";
import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const ov = await getPageContent("exams", locale);
  return {
    title:
      ov.metaTitle ??
      "Подготовка к IELTS и Digital SAT на нужный балл | GSC Study",
    description:
      ov.metaDescription ??
      "Подготовка к IELTS (Academic и General Training) и Digital SAT: диагностика, план до целевого балла, тренировка по секциям и пробные тесты. Средний балл IELTS 7.0+.",
  };
}

const container = "max-w-[1280px] mx-auto px-6 lg:px-8";
const card = "card-premium card-spotlight rounded-2xl p-8";
const btnOutline =
  "inline-flex items-center justify-center btn-outline rounded-xl px-6 py-3 font-semibold";

const methodMeta = [
  { n: "01", accent: true },
  { n: "02", accent: false },
  { n: "03", accent: false },
  { n: "04", accent: false },
];

const testKinds = ["placement", "ielts", "sat"];

const targetScores = ["5.5", "6.0", "6.5", "7.0"];

export default async function ExamsPage() {
  const locale = await getServerLocale();
  const t = getExamsDict(locale);
  const testLabels = getTestsDict(locale);
  const ov = await getPageContent("exams", locale);
  const tests = await prisma.test.findMany({
    where: { published: true, audience: "adults", kind: { in: testKinds } },
    orderBy: { order: "asc" },
    select: {
      id: true, kind: true, slug: true, title: true, description: true, timeLimit: true,
      _count: { select: { questions: true } },
    },
  });

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-surface-container-lowest">
          <Aurora intensity="subtle" />
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#135685 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <Reveal className={`${container} relative z-10`}>
            <div className="max-w-3xl md:mx-0">
              <div className="flex items-center gap-2 text-sm font-medium text-on-surface-variant mb-8">
                <Link className="hover:text-primary transition-colors" href="/">
                  {t.hero.breadcrumbHome}
                </Link>
                <Icon name="chevron_right" className="text-[16px]" />
                <span className="text-primary font-semibold">
                  {ov.heroEyebrow ?? t.hero.breadcrumbCurrent}
                </span>
              </div>
              <h1 className="text-display-lg-mobile md:text-[56px] font-extrabold tracking-tight text-on-surface mb-6 leading-[1.1]">
                {ov.heroTitle ? (
                  ov.heroTitle
                ) : (
                  <>
                    {t.hero.title1} <br />
                    <span className="text-gradient">{t.hero.title2}</span>
                  </>
                )}
              </h1>
              <p className="text-body-lg text-on-surface-variant mb-10 leading-relaxed max-w-2xl">
                {ov.heroSubtitle ?? t.hero.text}
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
                <a
                  className="btn-primary inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold w-full sm:w-auto"
                  href="#consult"
                >
                  {t.hero.ctaPrimary}
                </a>
                <a
                  className="btn-outline inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold w-full sm:w-auto group"
                  href="#how"
                >
                  {t.hero.ctaSecondary}
                  <Icon
                    name="arrow_forward"
                    className="ml-2 text-xl transition-transform group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {t.hero.stats.map(([v, l]) => (
                <div
                  key={l}
                  className="card-premium card-spotlight rounded-2xl p-6"
                >
                  <div className="text-[32px] md:text-[40px] font-extrabold number-gradient mb-2 leading-none">
                    {v}
                  </div>
                  <div className="text-sm font-medium text-on-surface-variant leading-snug">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Two exams */}
        <section className="py-24 md:py-28 bg-surface">
          <Reveal className={container}>
            <div className="max-w-3xl mb-16 text-center mx-auto">
              <span className="tag-pill mb-6">
                {t.exams.eyebrow}
              </span>
              <h2 className="text-[32px] md:text-[40px] font-extrabold text-on-surface mb-6 tracking-tight">
                {t.exams.title}
              </h2>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                {t.exams.text}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              {/* IELTS */}
              <div className={`${card} card-ring flex flex-col h-full border-t-[6px] border-t-primary`}>
                <div className="mb-8 flex justify-between items-start gap-4">
                  <h3 className="text-2xl font-bold text-on-surface leading-tight">
                    {t.exams.ielts.title}
                  </h3>
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                    <Icon name="language" className="text-[28px]" />
                  </span>
                </div>
                <p className="text-on-surface-variant mb-10 flex-grow leading-relaxed">
                  {t.exams.ielts.text}
                </p>
                <div className="space-y-4 mb-10 bg-surface rounded-xl p-6 border border-surface-variant/50">
                  {t.exams.ielts.params.map(([k, v], i) => (
                    <div
                      key={k}
                      className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 ${
                        i < t.exams.ielts.params.length - 1
                          ? "pb-4 border-b border-surface-variant/60"
                          : ""
                      }`}
                    >
                      <span className="text-sm text-on-surface-variant font-medium">
                        {k}
                      </span>
                      <span className="text-sm font-bold text-on-surface sm:text-right">
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
                <a href="#consult" className={`${btnOutline} w-full text-center`}>
                  {t.exams.ielts.cta}
                </a>
              </div>
              {/* SAT */}
              <div className={`${card} card-ring flex flex-col h-full border-t-[6px] border-t-secondary`}>
                <div className="mb-8 flex justify-between items-start gap-4">
                  <h3 className="text-2xl font-bold text-on-surface leading-tight">
                    {t.exams.sat.title}
                  </h3>
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-secondary/10 text-secondary flex-shrink-0">
                    <Icon name="school" className="text-[28px]" />
                  </span>
                </div>
                <p className="text-on-surface-variant mb-10 flex-grow leading-relaxed">
                  {t.exams.sat.text}
                </p>
                <div className="space-y-4 mb-10 bg-surface rounded-xl p-6 border border-surface-variant/50">
                  {t.exams.sat.params.map(([k, v], i) => (
                    <div
                      key={k}
                      className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 ${
                        i < t.exams.sat.params.length - 1
                          ? "pb-4 border-b border-surface-variant/60"
                          : ""
                      }`}
                    >
                      <span className="text-sm text-on-surface-variant font-medium">
                        {k}
                      </span>
                      <span className="text-sm font-bold text-on-surface sm:text-right">
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
                <a href="#consult" className={`${btnOutline} w-full text-center`}>
                  {t.exams.sat.cta}
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Method */}
        <section id="how" className="py-24 md:py-28 bg-surface-container-lowest scroll-mt-20">
          <Reveal className={container}>
            <div className="max-w-3xl mx-auto text-center mb-20">
              <span className="tag-pill mb-6">
                {t.method.eyebrow}
              </span>
              <h2 className="text-[32px] md:text-[40px] font-extrabold text-on-surface mb-6 tracking-tight">
                {t.method.title}
              </h2>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                {t.method.text}
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-8 md:gap-6 relative">
              <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-surface-variant/60 -z-10" />
              {methodMeta.map((m, i) => (
                <div
                  key={m.n}
                  className="relative bg-surface p-6 rounded-2xl border border-surface-variant/50 shadow-sm md:bg-transparent md:p-0 md:border-none md:shadow-none h-full flex flex-col"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-2xl mb-6 shadow-sm border mx-auto md:mx-0 ${
                      m.accent
                        ? "bg-primary/10 text-primary border-primary/10"
                        : "bg-surface-container-highest text-on-surface border-surface-variant"
                    }`}
                  >
                    {m.n}
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-3 text-center md:text-left">
                    {t.method.items[i].title}
                  </h3>
                  <p className="text-on-surface-variant text-sm mb-6 flex-grow text-center md:text-left">
                    {t.method.items[i].text}
                  </p>
                  <div className="text-center md:text-left">
                    <span className="inline-block px-3 py-1.5 bg-surface-container-high text-xs font-bold text-on-surface rounded-md">
                      {t.method.items[i].tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Free tests */}
        <section id="tests" className="py-24 md:py-28 bg-surface">
          <Reveal className={container}>
            <div className="max-w-3xl mb-16 mx-auto text-center">
              <span className="tag-pill mb-6">
                {t.placement.eyebrow}
              </span>
              <h2 className="text-[32px] md:text-[40px] font-extrabold text-on-surface mb-6 tracking-tight">
                {t.placement.title}
              </h2>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                {testLabels.hub.subtitle}
              </p>
              <Link
                href="/tests"
                className="link-underline inline-flex items-center gap-1 mt-4 font-bold text-primary transition-colors"
              >
                {t.placement.allTestsLink}
                <Icon name="arrow_forward" className="text-sm" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testKinds.map((kind) => {
                const test = tests.find((test) => test.kind === kind);
                if (!test) return null;
                return (
                  <div
                    key={test.id}
                    className={`${card} flex flex-col !p-6 sm:!p-8`}
                  >
                    <h3 className="text-xl font-bold text-on-surface mb-4">
                      {test.title}
                    </h3>
                    <p className="text-on-surface-variant text-sm mb-8 flex-grow leading-relaxed">
                      {test.description}
                    </p>
                    <div className="flex gap-6 mb-8 pt-6 border-t border-surface-variant/60">
                      <div>
                        <div className="text-[20px] font-extrabold number-gradient mb-1">
                          {test.timeLimit ? `${test.timeLimit} ${testLabels.hub.minutes}` : testLabels.hub.noLimit}
                        </div>
                        <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">
                          {t.placement.timeLabel}
                        </div>
                      </div>
                      <div>
                        <div className="text-[20px] font-extrabold number-gradient mb-1">
                          {test._count.questions}
                        </div>
                        <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">
                          {testLabels.intro.metaQuestions}
                        </div>
                      </div>
                    </div>
                    <Link href={`/test/${test.slug}`} className={`${btnOutline} w-full py-3`}>
                      {t.placement.cta}
                    </Link>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </section>

        {/* Targets */}
        <section className="py-24 md:py-28 bg-surface-container-lowest">
          <Reveal className={container}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <span className="tag-pill mb-6">
                  {t.targets.eyebrow}
                </span>
                <h2 className="text-[32px] md:text-[40px] font-extrabold text-on-surface mb-4 tracking-tight">
                  {t.targets.title}
                </h2>
                <p className="text-lg text-on-surface-variant">
                  {t.targets.text}
                </p>
              </div>
              <Link
                className="inline-flex items-center text-primary font-bold hover:opacity-80 transition-opacity group pb-2 border-b-2 border-primary/20 hover:border-primary"
                href="/abroad"
              >
                {t.targets.countriesLink}
                <Icon
                  name="arrow_forward"
                  className="ml-2 transition-transform group-hover:translate-x-1 text-xl"
                />
              </Link>
            </div>
            <div className="space-y-4">
              {t.targets.items.map((item, i) => (
                <div
                  key={targetScores[i]}
                  className="card-premium card-spotlight flex flex-col md:flex-row md:items-center gap-4 md:gap-10 p-6 sm:p-8 rounded-2xl"
                >
                  <div className="text-[40px] font-extrabold number-gradient w-24 flex-shrink-0 leading-none">
                    {targetScores[i]}
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-lg font-bold text-on-surface mb-2">
                      {item.title}
                    </h4>
                    <p className="text-on-surface-variant text-sm">{item.text}</p>
                  </div>
                  <div className="md:text-right text-sm font-bold text-on-surface-variant/80 md:w-48 flex-shrink-0 bg-surface-container p-3 rounded-lg md:bg-transparent md:p-0 md:rounded-none">
                    {item.note}
                  </div>
                </div>
              ))}
              <div className="card-spotlight flex flex-col md:flex-row md:items-center gap-4 md:gap-10 p-6 sm:p-8 bg-secondary/5 rounded-2xl border border-secondary/20 shadow-premium">
                <div className="text-[40px] font-extrabold text-secondary w-32 flex-shrink-0 leading-none">
                  1300+
                </div>
                <div className="flex-grow">
                  <h4 className="text-lg font-bold text-on-surface mb-2">
                    {t.targets.satSpecial.title}
                  </h4>
                  <p className="text-on-surface-variant text-sm">
                    {t.targets.satSpecial.text}
                  </p>
                </div>
                <div className="md:text-right text-sm font-bold text-on-surface-variant/80 md:w-48 flex-shrink-0 bg-white/50 p-3 rounded-lg md:bg-transparent md:p-0 md:rounded-none">
                  {t.targets.satSpecial.note}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 md:py-28 bg-surface">
          <Reveal className={`${container} max-w-3xl`}>
            <div className="text-center mb-16">
              <span className="tag-pill mb-6">
                {t.faq.eyebrow}
              </span>
              <h2 className="text-[32px] md:text-[40px] font-extrabold text-on-surface tracking-tight">
                {t.faq.title}
              </h2>
            </div>
            <div className="space-y-4">
              {t.faq.items.map((item, i) => (
                <details
                  key={i}
                  className="group glass-card rounded-2xl overflow-hidden"
                >
                  <summary className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer list-none">
                    <span className="font-bold text-on-surface text-lg">
                      {item.q}
                    </span>
                    <Icon
                      name="expand_more"
                      className="text-primary transition-transform duration-300 group-open:rotate-180"
                    />
                  </summary>
                  <div className="px-6 pb-6 text-on-surface-variant text-base leading-relaxed border-t border-surface-variant/30 pt-4">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Consult */}
        <ExamsConsult />
      </main>
      <Footer />
    </>
  );
}
