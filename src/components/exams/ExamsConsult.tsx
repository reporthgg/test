"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import Icon from "@/components/Icon";
import { useLocale } from "@/i18n/useLocale";
import { getExamsDict } from "@/i18n/pages/exams";

type Status = "idle" | "loading" | "success" | "error";

const inputCls =
  "w-full rounded-xl border border-surface-variant/60 bg-surface-container-low text-on-surface focus:ring-2 focus:ring-primary/30 focus:border-primary p-3.5 shadow-sm transition-all focus:shadow-md outline-none";

export default function ExamsConsult() {
  const locale = useLocale();
  const t = getExamsDict(locale).consult;
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    city: "",
    phone: "",
    email: "",
    exam: "IELTS Academic",
    goal: "IELTS 5.5-6.0",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "exams-consult" }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="consult"
      className="py-20 md:py-32 bg-primary text-white relative overflow-hidden scroll-mt-20"
    >
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ffffff 2px, transparent 2px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div>
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-white/90 text-label-caps tracking-widest uppercase mb-6 border border-white/20 shadow-sm">
              {t.eyebrow}
            </span>
            <h2 className="text-display-lg-mobile md:text-[56px] font-extrabold mb-8 leading-[1.1] tracking-tight">
              {t.title1} <br />
              <span className="text-primary-fixed">{t.title2}</span>
            </h2>
            <p className="text-lg text-white/80 mb-10 max-w-md leading-relaxed">
              {t.text}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                className="inline-flex items-center justify-center bg-white/10 text-white font-bold rounded-xl px-6 py-3.5 border border-white/20 hover:bg-white/20 transition-all shadow-sm"
                href={`tel:${site.phone.tel}`}
              >
                <Icon name="phone" className="mr-2 text-xl" />
                {site.phone.display}
              </a>
              <a
                className="inline-flex items-center justify-center bg-whatsapp-green text-white font-bold rounded-xl px-6 py-3.5 hover:bg-[#20bd5a] transition-colors shadow-sm"
                href={`${site.whatsapp.link}?text=Здравствуйте!%20Хочу%20готовиться%20к%20экзамену`}
                target="_blank"
                rel="noopener"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {status === "success" ? (
            <div className="bg-surface-container-lowest text-on-surface p-8 sm:p-10 rounded-2xl shadow-2xl border border-surface-variant/50 text-center">
              <div className="w-16 h-16 bg-clever-green/10 text-clever-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="check" className="text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight">
                {t.successTitle}
              </h3>
              <p className="text-on-surface-variant text-sm">
                {t.successText}
              </p>
            </div>
          ) : (
            <div className="bg-surface-container-lowest text-on-surface p-8 sm:p-10 rounded-2xl shadow-2xl border border-surface-variant/50">
              <h3 className="text-2xl font-bold mb-3 tracking-tight">
                {t.formTitle}
              </h3>
              <p className="text-on-surface-variant text-sm mb-8">
                {t.formSubtitle}
              </p>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-on-surface mb-2" htmlFor="e-name">
                      {t.name}
                    </label>
                    <input
                      className={inputCls}
                      id="e-name"
                      placeholder={t.namePh}
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface mb-2" htmlFor="e-city">
                      {t.city}
                    </label>
                    <select
                      className={inputCls}
                      id="e-city"
                      required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                    >
                      <option value="">{t.cityChoose}</option>
                      {t.cities.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-on-surface mb-2" htmlFor="e-phone">
                      {t.phone}
                    </label>
                    <input
                      className={inputCls}
                      id="e-phone"
                      placeholder="+7 700 000 00 00"
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface mb-2" htmlFor="e-email">
                      {t.emailLabel}
                    </label>
                    <input
                      className={inputCls}
                      id="e-email"
                      placeholder="you@example.com"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-on-surface mb-2" htmlFor="e-exam">
                      {t.examLabel}
                    </label>
                    <select
                      className={inputCls}
                      id="e-exam"
                      value={form.exam}
                      onChange={(e) => setForm({ ...form, exam: e.target.value })}
                    >
                      <option>IELTS Academic</option>
                      <option>IELTS General Training</option>
                      <option>Digital SAT</option>
                      <option>{t.examUndecided}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface mb-2" htmlFor="e-goal">
                      {t.goalLabel}
                    </label>
                    <select
                      className={inputCls}
                      id="e-goal"
                      value={form.goal}
                      onChange={(e) => setForm({ ...form, goal: e.target.value })}
                    >
                      <option>IELTS 5.5-6.0</option>
                      <option>IELTS 6.5</option>
                      <option>IELTS 7.0+</option>
                      <option>SAT 1200+</option>
                      <option>SAT 1300+</option>
                      <option>{t.goalUnknown}</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-start gap-3 py-2">
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      className="w-4 h-4 text-primary bg-surface-container-lowest border-surface-variant/80 rounded focus:ring-primary focus:ring-2 cursor-pointer"
                      id="e-consent"
                      required
                      type="checkbox"
                    />
                  </div>
                  <label
                    className="text-xs text-on-surface-variant cursor-pointer leading-tight"
                    htmlFor="e-consent"
                  >
                    {t.consent}
                  </label>
                </div>
                <button
                  className="btn-primary inline-flex items-center justify-center w-full rounded-xl py-4 text-base mt-2 font-semibold disabled:opacity-60"
                  type="submit"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? t.sending : t.submit}
                </button>
                {status === "error" && (
                  <p className="text-sm text-error text-center">
                    {t.error}
                  </p>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
