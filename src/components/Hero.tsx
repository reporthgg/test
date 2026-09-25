"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LeadForm from "./LeadForm";
import Aurora from "@/components/ui/Aurora";
import { useLocale } from "@/i18n/useLocale";
import { getDictionary } from "@/i18n/dictionaries";
import { withLocale } from "@/i18n/config";

export default function Hero() {
  const locale = useLocale();
  const t = getDictionary(locale);
  const L = (p: string) => withLocale(locale, p);

  const slides = [
    {
      s: t.hero.slides[0],
      accentTag: false,
      title2Class: "text-primary",
      primary: { label: t.actions.pickProgram, href: "#consult", accent: false },
      secondary: { label: t.actions.seeCourses, href: L("/school") },
    },
    {
      s: t.hero.slides[1],
      accentTag: true,
      title2Class: "text-secondary",
      primary: { label: t.actions.tryLevelTest, href: L("/tests"), accent: true },
      secondary: { label: t.actions.schedule, href: "#consult" },
    },
    {
      s: t.hero.slides[2],
      accentTag: false,
      title2Class: "text-primary",
      primary: { label: t.actions.signUp, href: "#consult", accent: false },
      secondary: { label: t.actions.consultOnAdmission, href: "#consult" },
    },
  ];

  const [current, setCurrent] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6500);
    return () => clearInterval(timer);
  }, [paused, slides.length]);

  const go = (dir: number) =>
    setCurrent((c) => (c + dir + slides.length) % slides.length);

  return (
    <section className="hero-section min-h-[90vh] flex items-center pt-24 pb-32 rounded-b-[3rem] shadow-sm">
      <Aurora intensity="subtle" />
      <div className="hero-blob w-[600px] h-[600px] top-0 left-[-200px]" />
      <div className="hero-blob w-[500px] h-[500px] bottom-0 right-[-100px] bg-secondary" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div
            className="lg:col-span-7"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative">
              {slides.map((slide, i) => (
                <div key={i} className={`hero-slide ${i === current ? "active" : ""}`}>
                  <span className={`tag-pill ${slide.accentTag ? "text-secondary bg-secondary-fixed" : ""}`}>
                    {slide.s.tag}
                  </span>
                  <h1 className="text-5xl lg:text-[4rem] font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.1]">
                    {slide.s.title1} <br />
                    <span className={`${slide.title2Class} text-gradient`}>{slide.s.title2}</span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
                    {slide.s.text}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={slide.primary.href}
                      className={`${slide.primary.accent ? "btn-accent" : "btn-primary"} px-8 py-4 rounded-xl text-base font-bold shadow-lg hover:shadow-xl`}
                    >
                      {slide.primary.label}
                    </a>
                    <Link
                      href={slide.secondary.href}
                      className="btn-outline px-8 py-4 rounded-xl text-base font-bold flex items-center gap-2 bg-white"
                    >
                      {slide.secondary.label}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-4 mt-12">
                <div className="flex items-center gap-3">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`${i + 1}`}
                      onClick={() => setCurrent(i)}
                      className={`slider-dot ${i === current ? "active" : ""}`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <button
                    aria-label="prev"
                    onClick={() => go(-1)}
                    className="w-9 h-9 rounded-full border border-gray-300 bg-white/70 text-gray-600 hover:text-primary hover:border-primary flex items-center justify-center transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                    </svg>
                  </button>
                  <button
                    aria-label="next"
                    onClick={() => go(1)}
                    className="w-9 h-9 rounded-full border border-gray-300 bg-white/70 text-gray-600 hover:text-primary hover:border-primary flex items-center justify-center transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                    </svg>
                  </button>
                </div>
              </div>

              <ul className="mt-12 space-y-4 text-gray-600 font-medium">
                {t.hero.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div id="consult" className="lg:col-span-5 relative scroll-mt-28">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-2xl transform rotate-3 scale-105 blur-lg" />
            <LeadForm />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-24 pt-12 border-t border-gray-200/50">
          {t.hero.stats.map((s, i) => (
            <div
              key={s[1]}
              className={i === 4 ? "col-span-2 md:col-span-4 lg:col-span-1 hidden lg:block" : ""}
            >
              <div className="text-4xl font-extrabold number-gradient">{s[0]}</div>
              <div className="text-base font-medium text-gray-600 mt-2">{s[1]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
