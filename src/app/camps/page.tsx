import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CampsConsult from "@/components/camps/CampsConsult";
import Icon from "@/components/Icon";
import Aurora from "@/components/ui/Aurora";
import Reveal from "@/components/Reveal";
import { prisma } from "@/lib/prisma";
import { getServerLocale } from "@/lib/locale";
import { getCampsDict } from "@/i18n/pages/camps";
import { getPageContent } from "@/lib/page-content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const ov = await getPageContent("camps", locale);
  return {
    title:
      ov.metaTitle ??
      "Языковые лагеря за рубежом: лето 2026 для школьников | GSC Study",
    description:
      ov.metaDescription ??
      "Языковые лагеря за рубежом для школьников 12-17 лет. Уроки английского, экскурсии, проживание и сопровождающий от GSC Study.",
  };
}

const gradients = [
  "from-[#1e3a5f] to-[#2c5f8a]",
  "from-[#b8860b] to-[#daa520]",
  "from-[#8a2c2c] to-[#c14040]",
  "from-[#2d4a3e] to-[#3f6b57]",
  "from-[#4a2d5f] to-[#7a4f9c]",
  "from-[#2d5f5a] to-[#3f9c8f]",
];

// Иконки/номера/время — статичные; тексты берём из словаря по индексу.
const includedMeta = [
  { n: "01", icon: "menu_book" },
  { n: "02", icon: "hotel" },
  { n: "03", icon: "local_activity" },
  { n: "04", icon: "group" },
  { n: "05", icon: "flight_takeoff" },
  { n: "06", icon: "health_and_safety" },
];

const scheduleMeta = [
  { icon: "restaurant", time: "8:00" },
  { icon: "school", time: "9:00-12:30" },
  { icon: "lunch_dining", time: "13:00" },
  { icon: "directions_walk", time: "14:00-18:00" },
  { icon: "celebration", time: "19:00" },
  { icon: "bedtime", time: "22:00" },
];

export default async function CampsPage() {
  const locale = await getServerLocale();
  const t = getCampsDict(locale);
  const ov = await getPageContent("camps", locale);

  const dbCamps = await prisma.camp.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  const camps = dbCamps.map((c, i) => {
    const [from, to] = gradients[i % gradients.length].split(" ");
    const rows: [string, string][] = [
      [t.camps.labels.country, c.country],
      [t.camps.labels.dates, c.dates ?? ""],
      [t.camps.labels.age, c.ageRange ?? ""],
      [t.camps.labels.housing, c.housing ?? ""],
    ].filter(([, v]) => v) as [string, string][];
    return {
      num: String(i + 1).padStart(2, "0"),
      city: c.city,
      seats: c.seats ? `${c.seats} ${t.camps.seatsSuffix}` : c.price || "",
      desc: c.summary ?? "",
      image: c.image ?? null,
      rows,
      from,
      to,
    };
  });

  // Иконки для чипов-меток карточек (только оформление; тексты берём из словаря).
  const metaIcon: Record<string, string> = {
    [t.camps.labels.country]: "public",
    [t.camps.labels.dates]: "calendar_month",
    [t.camps.labels.age]: "person",
    [t.camps.labels.housing]: "hotel",
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden bg-surface py-24 md:py-28 lg:py-32">
          <Aurora intensity="subtle" />
          <div className="absolute inset-0 bg-grid-pattern opacity-40" />
          <div className="relative z-10 max-w-container-max mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <nav className="flex items-center space-x-2 text-sm font-semibold text-on-surface-variant mb-8">
                <Link className="link-underline hover:text-primary transition-colors" href="/">
                  {t.breadcrumb.home}
                </Link>
                <span>·</span>
                <span className="text-primary">
                  {ov.heroEyebrow ?? t.breadcrumb.current}
                </span>
              </nav>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-on-surface tracking-tight mb-6 leading-[1.08]">
                {ov.heroTitle ? (
                  ov.heroTitle
                ) : (
                  <>
                    {t.hero.title1} <br />
                    <span className="text-gradient">
                      {t.hero.title2}
                    </span>
                  </>
                )}
              </h1>
              <p className="text-xl text-on-surface-variant mb-10 leading-relaxed max-w-2xl">
                {ov.heroSubtitle ?? t.hero.text}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <a
                  className="btn-primary inline-flex justify-center items-center rounded-xl px-8 py-4 text-base font-semibold"
                  href="#consult"
                >
                  {t.hero.bookCta}
                </a>
                <a
                  className="btn-outline inline-flex justify-center items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold bg-white"
                  href="#camps"
                >
                  {t.hero.seeCta}
                  <Icon name="arrow_downward" className="text-base" />
                </a>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 border-t border-border-subtle pt-10">
                {t.hero.stats.map(([v, l]) => (
                  <div key={l}>
                    <div className="number-gradient text-3xl font-extrabold mb-1">
                      {v}
                    </div>
                    <div className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Camps */}
        <Reveal>
          <section id="camps" className="py-24 md:py-28 bg-surface-container-low scroll-mt-20">
            <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="tag-pill">{t.camps.eyebrow}</span>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-on-surface mb-6">
                  {t.camps.title}
                </h2>
                <p className="text-lg text-on-surface-variant">
                  {t.camps.text}
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {camps.map((c) => (
                  <a
                    key={c.city}
                    href="#consult"
                    className="group card-premium card-spotlight rounded-2xl overflow-hidden flex flex-col"
                  >
                    <div className="relative h-60 overflow-hidden">
                      {c.image ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={c.image}
                            alt={c.city}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        </>
                      ) : (
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${c.from} ${c.to} transition-transform duration-500 group-hover:scale-105`}
                        >
                          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-sm font-bold text-primary shadow-premium">
                        {c.seats}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="text-white/80 font-bold text-sm mb-1">
                          {c.num}
                        </div>
                        <h3 className="text-3xl font-extrabold text-white">
                          {c.city}
                        </h3>
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <p className="text-on-surface-variant mb-8 flex-1">{c.desc}</p>
                      <div className="grid grid-cols-2 gap-3">
                        {c.rows.map(([k, v]) => (
                          <div
                            key={k}
                            className="flex items-start gap-3 rounded-xl border border-border-subtle bg-surface-container-low/60 p-3 transition-colors group-hover:border-primary/20"
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              <Icon name={metaIcon[k] ?? "info"} className="text-lg" />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-on-surface-variant mb-0.5 text-[11px] uppercase tracking-wider font-semibold">
                                {k}
                              </span>
                              <b className="text-on-surface text-sm leading-snug">{v}</b>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* Included */}
        <Reveal>
          <section className="py-24 md:py-28 bg-white">
            <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="tag-pill">{t.included.eyebrow}</span>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-on-surface mb-6">
                  {t.included.title}
                </h2>
                <p className="text-lg text-on-surface-variant">
                  {t.included.text}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {includedMeta.map((meta, i) => (
                  <div
                    key={meta.n}
                    className="card-premium card-spotlight p-8 rounded-2xl"
                  >
                    <div className="number-gradient text-5xl font-black mb-4 leading-none opacity-90">
                      {meta.n}
                    </div>
                    <h4 className="text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                        <Icon name={meta.icon} className="text-xl" />
                      </span>
                      {t.included.items[i].title}
                    </h4>
                    <p className="text-on-surface-variant">{t.included.items[i].text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* Daily schedule */}
        <Reveal>
          <section className="py-24 md:py-28 bg-surface-container-low">
            <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="tag-pill">{t.schedule.eyebrow}</span>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-on-surface mb-6">
                  {t.schedule.title}
                </h2>
                <p className="text-lg text-on-surface-variant">
                  {t.schedule.text}
                </p>
              </div>
              <div className="max-w-3xl mx-auto relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/20 before:to-transparent">
                {scheduleMeta.map((s, i) => (
                  <div
                    key={i}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-8 last:mb-0"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary text-white shadow-premium shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <Icon name={s.icon} className="text-xl" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] card-premium card-spotlight p-6 rounded-2xl">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-lg text-on-surface">
                          {t.schedule.items[i].title}
                        </h4>
                        <span className="number-gradient font-extrabold">
                          {s.time}
                        </span>
                      </div>
                      <p className="text-on-surface-variant">{t.schedule.items[i].text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* Safety & Booking */}
        <Reveal>
          <section className="py-24 md:py-28 bg-white">
            <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="card-premium card-spotlight rounded-2xl p-8 lg:p-12">
                  <span className="tag-pill">{t.safety.eyebrow}</span>
                  <h3 className="text-3xl font-extrabold text-on-surface mb-6">
                    {t.safety.title}
                  </h3>
                  <p className="text-on-surface-variant mb-8 text-lg">
                    {t.safety.text}
                  </p>
                  <ul className="space-y-4">
                    {t.safety.items.map(([title, d]) => (
                      <li
                        key={title}
                        className="flex items-start gap-3 border-b border-border-subtle pb-4 last:border-0 last:pb-0"
                      >
                        <Icon
                          name="check_circle"
                          className="text-secondary mt-1"
                        />
                        <div>
                          <span className="font-semibold text-on-surface block">
                            {title}
                          </span>
                          <span className="text-on-surface-variant">{d}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-premium card-spotlight rounded-2xl p-8 lg:p-12">
                  <span className="tag-pill">{t.booking.eyebrow}</span>
                  <h3 className="text-3xl font-extrabold text-on-surface mb-6">
                    {t.booking.title}
                  </h3>
                  <p className="text-on-surface-variant mb-8 text-lg">
                    {t.booking.text}
                  </p>
                  <ul className="space-y-4 mb-10">
                    {t.booking.items.map(([title, d], i) => (
                      <li
                        key={title}
                        className="flex gap-4 border-b border-border-subtle pb-4 last:border-0 last:pb-0"
                      >
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-[#1a6ba3] text-white font-bold text-sm shrink-0 shadow-premium">
                          {i + 1}
                        </span>
                        <div>
                          <span className="font-semibold text-on-surface block">
                            {title}
                          </span>
                          <span className="text-on-surface-variant">{d}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <a
                    className="btn-outline inline-flex justify-center items-center w-full rounded-xl px-6 py-3.5 text-base font-semibold"
                    href="#consult"
                  >
                    {t.booking.cta}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* FAQ */}
        <Reveal>
          <section id="faq" className="py-24 md:py-28 bg-surface-container-low">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="tag-pill">{t.faq.eyebrow}</span>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-on-surface mb-6">
                  {t.faq.title}
                </h2>
              </div>
              <div className="space-y-4">
                {t.faq.items.map((item, i) => (
                  <details
                    key={i}
                    className="group card-premium rounded-2xl open:border-primary/30 open:shadow-premium"
                    open={i === 0}
                  >
                    <summary className="flex items-center justify-between cursor-pointer list-none p-6 text-lg font-bold text-on-surface group-open:text-primary">
                      <span>{item.q}</span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                        <Icon
                          name="expand_more"
                          className="transition group-open:rotate-180"
                        />
                      </span>
                    </summary>
                    <div className="text-on-surface-variant px-6 pb-6 pt-0 leading-relaxed">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* Consult */}
        <CampsConsult />
      </main>
      <Footer />
    </>
  );
}
