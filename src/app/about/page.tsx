import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import Aurora from "@/components/ui/Aurora";
import Reveal from "@/components/Reveal";
import { getServerLocale } from "@/lib/locale";
import { getAboutDict } from "@/i18n/pages/about";
import { getPageContent } from "@/lib/page-content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const ov = await getPageContent("about", locale);
  return {
    title: ov.metaTitle ?? "О нас | GSC Study",
    description:
      ov.metaDescription ??
      "GSC Study: образование без границ с 2011 года. Более 15 000 студентов, центры в Алматы и Астане, поступление в вузы 25+ стран.",
  };
}

const statsMeta = [
  { icon: "calendar_month", color: "text-clever-green" },
  { icon: "school", color: "text-secondary" },
  { icon: "location_city", color: "text-tertiary" },
  { icon: "public", color: "text-primary" },
];

const valuesMeta = [
  { icon: "verified", ring: "bg-primary/10 group-hover:bg-primary", color: "text-primary" },
  { icon: "trending_up", ring: "bg-secondary/10 group-hover:bg-secondary", color: "text-secondary" },
  { icon: "visibility", ring: "bg-clever-green/10 group-hover:bg-clever-green", color: "text-clever-green" },
  { icon: "travel_explore", ring: "bg-tertiary-container/20 group-hover:bg-tertiary-container", color: "text-tertiary" },
];

const partners = [
  { src: "/brand/icef.png", alt: "ICEF Accredited: Trusted Agency #1478", h: "h-16" },
  { src: "/brand/bc-ielts.png", alt: "British Council: IELTS Registration Centre", h: "h-12 sm:h-14" },
];

export default async function AboutPage() {
  const locale = await getServerLocale();
  const t = getAboutDict(locale);
  const ov = await getPageContent("about", locale);
  const stats = statsMeta.map((m, i) => ({ ...m, ...t.stats[i] }));
  const values = valuesMeta.map((m, i) => ({ ...m, ...t.values.items[i] }));
  return (
    <>
      <Header />
      <main className="pt-20 relative">
        <div className="blob-bg bg-primary w-96 h-96 top-20 left-10" />
        <div className="blob-bg bg-secondary w-[500px] h-[500px] top-[40%] right-0" />

        {/* Hero */}
        <section className="relative z-10 overflow-hidden bg-dots">
          <Aurora intensity="subtle" />
          <div className="relative z-10 px-mobile-margin md:px-desktop-margin py-section-gap max-w-container-max mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2 flex flex-col gap-stack-lg">
                <span className="tag-pill w-max">
                  {ov.heroEyebrow ?? t.hero.eyebrow}
                </span>
                <h1 className="text-display-lg-mobile md:text-display-lg text-balance">
                  <span className="text-gradient">{ov.heroTitle ?? t.hero.title}</span>
                </h1>
                <p className="text-body-lg text-on-surface-variant max-w-lg">
                  {ov.heroSubtitle ?? t.hero.text}
                </p>
                <div className="flex gap-4">
                  <a
                    href="#journey"
                    className="btn-primary inline-flex items-center rounded-xl px-8 py-4 font-button text-button font-semibold active:scale-95"
                  >
                    {t.hero.cta}
                  </a>
                </div>
              </div>
              <div className="w-full md:w-1/2 relative">
                <div className="glass-card rounded-2xl p-2 rotate-2 hover-card-lift shadow-premium-lg">
                  {/* TODO: заменить на реальное фото центра/команды */}
                  <div className="w-full h-[400px] rounded-xl border border-border-subtle bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center">
                    <Icon name="school" className="text-primary/40 text-[80px]" />
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest p-4 rounded-xl shadow-premium-lg border border-border-subtle flex items-center gap-4">
                  <Icon name="workspace_premium" className="text-secondary text-4xl" />
                  <div>
                    <div className="text-headline-sm text-primary">{t.hero.badge.value}</div>
                    <div className="font-label-caps text-label-caps text-on-surface-variant">
                      {t.hero.badge.label}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Journey */}
        <Reveal>
          <section
            id="journey"
            className="px-mobile-margin md:px-desktop-margin py-section-gap bg-surface-container-lowest border-y border-border-subtle relative z-10 scroll-mt-20"
          >
            <div className="max-w-container-max mx-auto readability-track">
              <div className="flex flex-col items-center text-center gap-stack-md mb-12">
                <h2 className="text-headline-md text-primary">{t.journey.title}</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
              </div>
              <div className="text-body-lg text-on-surface-variant space-y-6">
                <p>{t.journey.p1}</p>
                <p>{t.journey.p2}</p>
                <div className="glass-card card-spotlight p-8 rounded-2xl my-8 border-l-4 border-l-secondary text-primary text-headline-sm text-balance shadow-premium">
                  {t.journey.quote}
                </div>
                <p>{t.journey.p3}</p>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Stats */}
        <Reveal>
          <section className="px-mobile-margin md:px-desktop-margin py-section-gap max-w-container-max mx-auto relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-grid-gutter">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass-card card-spotlight p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3 hover-card-lift"
                >
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-low/60 ${s.color}`}>
                    <Icon name={s.icon} className="text-4xl" />
                  </span>
                  <div className="number-gradient text-display-lg">{s.value}</div>
                  <div className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    {s.label}
                  </div>
                  {s.sub && (
                    <div className="text-xs text-on-surface-variant/70">{s.sub}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Values */}
        <Reveal>
          <section className="px-mobile-margin md:px-desktop-margin py-section-gap bg-surface-container-low border-y border-border-subtle relative z-10">
            <div className="max-w-container-max mx-auto">
              <div className="flex flex-col items-center text-center gap-stack-md mb-12">
                <h2 className="text-headline-md text-primary">{t.values.title}</h2>
                <p className="text-body-md text-on-surface-variant max-w-2xl">
                  {t.values.subtitle}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-grid-gutter">
                {values.map((v) => (
                  <div
                    key={v.title}
                    className="card-premium card-spotlight p-8 rounded-2xl flex gap-6 group"
                  >
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-colors ${v.ring}`}
                    >
                      <Icon
                        name={v.icon}
                        className={`${v.color} group-hover:text-white transition-colors text-2xl`}
                      />
                    </div>
                    <div>
                      <h3 className="text-headline-sm text-primary mb-2">
                        {v.title}
                      </h3>
                      <p className="text-body-md text-on-surface-variant">
                        {v.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* Partners */}
        <Reveal>
          <section className="px-mobile-margin md:px-desktop-margin py-section-gap max-w-container-max mx-auto relative z-10 text-center">
            <div className="flex flex-col items-center text-center gap-stack-md mb-12">
              <h2 className="text-headline-md text-primary">{t.partners.title}</h2>
              <p className="text-body-md text-on-surface-variant">
                {t.partners.text}
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8">
              {partners.map((p) => (
                <div
                  key={p.src}
                  className="bg-white rounded-2xl border border-border-subtle shadow-premium px-8 py-5 flex items-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-premium-lg"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.alt} className={`${p.h} w-auto`} />
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <section className="px-mobile-margin md:px-desktop-margin py-section-gap mb-12 max-w-container-max mx-auto relative z-10">
            <div className="bg-gradient-to-br from-primary to-[#0d3f63] rounded-2xl p-12 text-center relative overflow-hidden flex flex-col items-center shadow-premium-lg">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary rounded-full opacity-20 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-fixed rounded-full opacity-20 blur-3xl" />
              <div className="relative z-10 max-w-2xl mx-auto flex flex-col gap-6 items-center">
                <h2 className="text-display-lg-mobile md:text-headline-md text-on-primary">
                  {t.cta.title}
                </h2>
                <p className="text-body-lg text-primary-fixed">
                  {t.cta.text}
                </p>
                <Link
                  href="/#consult"
                  className="btn-accent inline-flex items-center rounded-xl px-8 py-4 font-button text-button font-semibold active:scale-95 mt-4 gap-2"
                >
                  {t.cta.button}
                  <Icon name="arrow_forward" className="text-sm" />
                </Link>
              </div>
            </div>
          </section>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
