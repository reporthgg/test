"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import Icon from "@/components/Icon";
import { useLocale } from "@/i18n/useLocale";
import { getDictionary } from "@/i18n/dictionaries";
import { getCampsDict } from "@/i18n/pages/camps";

type Status = "idle" | "loading" | "success" | "error";

export default function CampsConsult() {
  const locale = useLocale();
  const t = getCampsDict(locale).consult;
  const submissionText = getDictionary(locale).submission;
  const [status, setStatus] = useState<Status>("idle");
  const [crmDelivered, setCrmDelivered] = useState(false);
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    camp: t.campOptions[0],
    age: t.ageOptions[0],
    city: t.cityOptions[0],
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, consent, source: "camps-consult" }),
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
    <section
      id="consult"
      className="py-24 relative overflow-hidden bg-primary text-white scroll-mt-20"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary via-primary to-[#0d3f63] z-0" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-secondary opacity-30 blur-3xl mix-blend-screen z-0" />
      <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white font-bold text-sm tracking-wider uppercase mb-6 border border-white/20">
              {t.eyebrow}
            </span>
            <h2 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">
              {t.title1} <br />
              <em className="text-secondary not-italic">{t.title2}</em>
            </h2>
            <p className="text-xl text-primary-fixed mb-10 leading-relaxed">
              {t.text}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                className="inline-flex justify-center items-center gap-2 px-8 py-4 border border-white/30 text-base font-semibold rounded-xl bg-white/5 backdrop-blur hover:bg-white hover:text-primary transition-all hover:-translate-y-0.5"
                href={`tel:${site.phone.tel}`}
              >
                <Icon name="call" className="text-base" />
                {site.phone.display}
              </a>
              <a
                className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold rounded-xl shadow-premium text-white bg-whatsapp-green hover:bg-[#20bd5a] transition-all hover:-translate-y-0.5 gap-2"
                href={`${site.whatsapp.link}?text=${encodeURIComponent(t.waPrefill)}`}
                target="_blank"
                rel="noopener"
              >
                <Icon name="chat" />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-secondary/20 blur-2xl rounded-3xl transform rotate-3" />
            {status === "success" ? (
              <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-premium-lg relative text-center">
                <div className="w-16 h-16 bg-clever-green/10 text-clever-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="check" className="text-3xl" />
                </div>
                <h3 className="text-3xl font-extrabold text-on-surface mb-2">
                  {crmDelivered ? t.successTitle : submissionText.savedTitle}
                </h3>
                <p className="text-on-surface-variant">
                  {crmDelivered ? t.successText : submissionText.deliveryUnconfirmed}
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-premium-lg relative">
                <h3 className="text-3xl font-extrabold text-on-surface mb-2">
                  {t.formTitle}
                </h3>
                <p className="text-on-surface-variant mb-8">
                  {t.formSubtitle}
                </p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-sm font-bold text-on-surface mb-2"
                        htmlFor="k-name"
                      >
                        {t.nameLabel}
                      </label>
                      <input
                        className="w-full rounded-xl border border-border-subtle bg-surface-container-low px-4 py-3 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all"
                        id="k-name"
                        placeholder={t.namePh}
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-bold text-on-surface mb-2"
                        htmlFor="k-phone"
                      >
                        {t.phoneLabel}
                      </label>
                      <input
                        className="w-full rounded-xl border border-border-subtle bg-surface-container-low px-4 py-3 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all"
                        id="k-phone"
                        placeholder="+7 700 000 00 00"
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-sm font-bold text-on-surface mb-2"
                        htmlFor="k-camp"
                      >
                        {t.campLabel}
                      </label>
                      <select
                        className="w-full rounded-xl border border-border-subtle bg-surface-container-low px-4 py-3 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all"
                        id="k-camp"
                        value={form.camp}
                        onChange={(e) => setForm({ ...form, camp: e.target.value })}
                      >
                        {t.campOptions.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        className="block text-sm font-bold text-on-surface mb-2"
                        htmlFor="k-age"
                      >
                        {t.ageLabel}
                      </label>
                      <select
                        className="w-full rounded-xl border border-border-subtle bg-surface-container-low px-4 py-3 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all"
                        id="k-age"
                        value={form.age}
                        onChange={(e) => setForm({ ...form, age: e.target.value })}
                      >
                        {t.ageOptions.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-bold text-on-surface mb-2"
                      htmlFor="k-city"
                    >
                      {t.cityLabel}
                    </label>
                    <select
                      className="w-full rounded-xl border border-border-subtle bg-surface-container-low px-4 py-3 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all"
                      id="k-city"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                    >
                      {t.cityOptions.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        className="h-5 w-5 rounded border-border-subtle text-primary focus:ring-primary cursor-pointer"
                        id="k-consent"
                        required
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        className="font-medium text-on-surface-variant cursor-pointer"
                        htmlFor="k-consent"
                      >
                        {t.consent}
                      </label>
                    </div>
                  </div>
                  <button
                    className="btn-accent w-full flex justify-center py-4 px-4 rounded-xl text-lg font-semibold disabled:opacity-60"
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
      </div>
    </section>
  );
}
