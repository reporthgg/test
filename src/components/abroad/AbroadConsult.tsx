"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import Icon from "@/components/Icon";
import { useLocale } from "@/i18n/useLocale";
import { getDictionary } from "@/i18n/dictionaries";
import { getAbroadDict } from "@/i18n/pages/abroad";

type Status = "idle" | "loading" | "success" | "error";

const infoIcons = ["videocam", "schedule"];

export default function AbroadConsult() {
  const locale = useLocale();
  const t = getAbroadDict(locale).consult;
  const submissionText = getDictionary(locale).submission;

  const [status, setStatus] = useState<Status>("idle");
  const [crmDelivered, setCrmDelivered] = useState(false);
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    country: t.form.countries[0],
    level: t.form.levels[0],
    year: t.form.years[0],
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, consent, source: "abroad-consult" }),
      });
      const data: { ok?: unknown; crmDelivered?: unknown } | null = await res.json();
      if (!res.ok || data?.ok !== true) throw new Error("failed");
      setCrmDelivered(data.crmDelivered === true);
      setStatus("success");
      setConsent(false);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="consult" className="py-24 md:py-28 bg-primary relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      <div className="max-w-[1280px] mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <div className="text-white">
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white text-xs font-bold tracking-widest uppercase mb-4">
            {t.eyebrow}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-[1.25]">
            {t.title1}{" "}
            <span className="text-secondary bg-white px-3 py-0.5 rounded-lg shadow-premium [-webkit-box-decoration-break:clone] [box-decoration-break:clone]">
              {t.titleHighlight}
            </span>
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-lg">
            {t.text}
          </p>
          <div className="space-y-6 mb-10">
            {t.info.map((it, ii) => (
              <div key={it.label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Icon name={infoIcons[ii]} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-white/60 uppercase tracking-wider font-bold">
                    {it.label}
                  </div>
                  <div className="font-bold">{it.value}</div>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Icon name="payments" className="text-white" />
              </div>
              <div>
                <div className="text-xs text-white/60 uppercase tracking-wider font-bold">
                  {t.costLabel}
                </div>
                <div className="font-bold text-secondary bg-white px-2 rounded inline-block">
                  {t.costValue}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
              href={`tel:${site.phone.tel}`}
            >
              <Icon name="call" className="text-sm" />
              {site.phone.display}
            </a>
            <a
              className="bg-whatsapp-green text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-[#20b858] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-whatsapp-green/20"
              href={`${site.whatsapp.link}?text=Здравствуйте!%20Хочу%20поступить%20за%20рубеж`}
              target="_blank"
              rel="noopener"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div>
          {status === "success" ? (
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-premium-lg relative text-center">
              <div className="w-16 h-16 bg-clever-green/10 text-clever-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="check" className="text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-2">
                {crmDelivered ? t.successTitle : submissionText.savedTitle}
              </h3>
              <p className="text-sm text-on-surface-variant">
                {crmDelivered ? t.successText : submissionText.deliveryUnconfirmed}
              </p>
            </div>
          ) : (
            <div className="bg-white card-ring rounded-2xl p-8 md:p-10 shadow-premium-lg relative">
              <h3 className="text-2xl font-bold text-on-surface mb-2">
                {t.formTitle}
              </h3>
              <p className="text-sm text-on-surface-variant mb-8">
                {t.formText}
              </p>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2"
                      htmlFor="a-name"
                    >
                      {t.form.nameLabel}
                    </label>
                    <input
                      className="w-full bg-surface-container-low border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-on-surface"
                      id="a-name"
                      placeholder={t.form.namePh}
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2"
                      htmlFor="a-phone"
                    >
                      {t.form.phoneLabel}
                    </label>
                    <input
                      className="w-full bg-surface-container-low border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-on-surface"
                      id="a-phone"
                      placeholder={t.form.phonePh}
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2"
                      htmlFor="a-country"
                    >
                      {t.form.countryLabel}
                    </label>
                    <select
                      className="w-full bg-surface-container-low border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-on-surface"
                      id="a-country"
                      value={form.country}
                      onChange={(e) =>
                        setForm({ ...form, country: e.target.value })
                      }
                    >
                      {t.form.countries.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2"
                      htmlFor="a-level"
                    >
                      {t.form.levelLabel}
                    </label>
                    <select
                      className="w-full bg-surface-container-low border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-on-surface"
                      id="a-level"
                      value={form.level}
                      onChange={(e) => setForm({ ...form, level: e.target.value })}
                    >
                      {t.form.levels.map((l) => (
                        <option key={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2"
                    htmlFor="a-year"
                  >
                    {t.form.yearLabel}
                  </label>
                  <select
                    className="w-full bg-surface-container-low border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-on-surface"
                    id="a-year"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                  >
                    {t.form.years.map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </select>
                </div>
                <label className="flex items-start gap-3 cursor-pointer pt-2">
                  <input
                    className="mt-1 rounded text-primary focus:ring-primary border-border-subtle"
                    required
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  <span className="text-xs text-on-surface-variant leading-tight">
                    {t.form.consent}
                  </span>
                </label>
                <button
                  className="w-full bg-secondary text-white py-4 rounded-xl font-semibold hover:bg-secondary/90 transition-colors shadow-lg shadow-secondary/20 mt-4 disabled:opacity-60"
                  type="submit"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? t.form.sending : t.form.submit}
                </button>
                {status === "error" && (
                  <p className="text-sm text-error text-center">
                    {t.form.error}
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
