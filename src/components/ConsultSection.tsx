"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/i18n/useLocale";
import { getDictionary } from "@/i18n/dictionaries";
import { getSchoolDict } from "@/i18n/pages/school";

type Status = "idle" | "loading" | "success" | "error";

type Props = {
  eyebrow?: string;
  title?: React.ReactNode;
  text?: string;
  courses?: string[];
  source?: string;
};

export default function ConsultSection({
  eyebrow,
  title,
  text,
  courses,
  source = "consult-section",
}: Props) {
  const locale = useLocale();
  const t = getSchoolDict(locale);
  const submissionText = getDictionary(locale).submission;

  const eyebrowText = eyebrow ?? t.consult.eyebrow;
  const titleNode = title ?? (
    <>
      {t.consult.title1} <br />
      <em className="text-secondary not-italic">{t.consult.title2}</em>
    </>
  );
  const textStr = text ?? t.consult.text;

  const [status, setStatus] = useState<Status>("idle");
  const [crmDelivered, setCrmDelivered] = useState(false);
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    city: "",
    phone: "",
    email: "",
    course: courses?.[0] ?? "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, consent, source }),
      });
      const data: { ok?: unknown; crmDelivered?: unknown } | null = await res.json();
      if (!res.ok || data?.ok !== true) throw new Error("failed");
      setCrmDelivered(data.crmDelivered === true);
      setStatus("success");
      setForm({ name: "", city: "", phone: "", email: "", course: courses?.[0] ?? "" });
      setConsent(false);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="consult"
      className="py-[120px] relative overflow-hidden bg-primary text-white scroll-mt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[#0d3f63] z-0" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-secondary opacity-30 blur-3xl mix-blend-screen z-0" />
      <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white font-label-caps text-label-caps tracking-wider uppercase mb-6 border border-white/20">
              {eyebrowText}
            </span>
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6 leading-tight">
              {titleNode}
            </h2>
            <p className="font-body-lg text-body-lg text-primary-fixed mb-10 leading-relaxed">
              {textStr}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                className="inline-flex justify-center items-center px-8 py-4 border-2 border-white/30 font-button text-button rounded-xl hover:bg-white hover:text-primary transition-all"
                href={`tel:${site.phone.tel}`}
              >
                {site.phone.display}
              </a>
              <a
                className="inline-flex justify-center items-center px-8 py-4 rounded-xl shadow-lg text-white bg-whatsapp-green hover:bg-[#20bd5a] transition-all gap-2 font-button text-button"
                href={`${site.whatsapp.link}?text=Здравствуйте!%20Хочу%20записаться`}
                target="_blank"
                rel="noopener"
              >
                <Icon name="chat" />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-secondary/20 blur-2xl rounded-2xl transform rotate-3" />
            {status === "success" ? (
              <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-premium-lg relative text-center">
                <div className="w-16 h-16 bg-clever-green/10 text-clever-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="check" className="text-3xl" />
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-2">
                  {crmDelivered ? t.consult.successTitle : submissionText.savedTitle}
                </h3>
                <p className="font-body-md text-on-surface-variant">
                  {crmDelivered ? t.consult.successText : submissionText.deliveryUnconfirmed}
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-premium-lg relative">
                <h3 className="font-headline-md text-headline-md text-primary mb-2">
                  {t.consult.formTitle}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-8">
                  {t.consult.formSubtitle}
                </p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block font-label-caps text-[14px] text-primary mb-2"
                        htmlFor="s-name"
                      >
                        {t.consult.name}
                      </label>
                      <input
                        className="w-full rounded-lg border-border-subtle bg-surface-container-low px-4 py-3 text-on-surface text-[14px] focus:border-primary focus:ring-primary focus:bg-white transition-colors"
                        id="s-name"
                        placeholder={t.consult.namePh}
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label
                        className="block font-label-caps text-[14px] text-primary mb-2"
                        htmlFor="s-city"
                      >
                        {t.consult.city}
                      </label>
                      <select
                        className="w-full rounded-lg border-border-subtle bg-surface-container-low px-4 py-3 text-on-surface text-[14px] focus:border-primary focus:ring-primary focus:bg-white transition-colors"
                        id="s-city"
                        required
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                      >
                        <option value="">{t.consult.cityChoose}</option>
                        <option>{t.consult.cityAlmaty}</option>
                        <option>{t.consult.cityAstana}</option>
                        <option>{t.consult.cityOther}</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block font-label-caps text-[14px] text-primary mb-2"
                        htmlFor="s-phone"
                      >
                        {t.consult.phone}
                      </label>
                      <input
                        className="w-full rounded-lg border-border-subtle bg-surface-container-low px-4 py-3 text-on-surface text-[14px] focus:border-primary focus:ring-primary focus:bg-white transition-colors"
                        id="s-phone"
                        placeholder="+7 700 000 00 00"
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label
                        className="block font-label-caps text-[14px] text-primary mb-2"
                        htmlFor="s-email"
                      >
                        {t.consult.emailOptional}
                      </label>
                      <input
                        className="w-full rounded-lg border-border-subtle bg-surface-container-low px-4 py-3 text-on-surface text-[14px] focus:border-primary focus:ring-primary focus:bg-white transition-colors"
                        id="s-email"
                        placeholder="you@example.com"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>
                  {courses && courses.length > 0 && (
                    <div>
                      <label
                        className="block font-label-caps text-[14px] text-primary mb-2"
                        htmlFor="s-course"
                      >
                        {t.consult.course}
                      </label>
                      <select
                        className="w-full rounded-lg border-border-subtle bg-surface-container-low px-4 py-3 text-on-surface text-[14px] focus:border-primary focus:ring-primary focus:bg-white transition-colors"
                        id="s-course"
                        value={form.course}
                        onChange={(e) => setForm({ ...form, course: e.target.value })}
                      >
                        {courses.map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        className="h-5 w-5 rounded border-border-subtle text-primary focus:ring-primary cursor-pointer"
                        id="consent2"
                        required
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        className="font-body-md text-[14px] text-on-surface-variant cursor-pointer"
                        htmlFor="consent2"
                      >
                        {t.consult.consent}
                      </label>
                    </div>
                  </div>
                  <button
                    className="w-full flex justify-center py-4 px-4 rounded-xl font-button text-button text-white bg-secondary hover:bg-[#8f0048] shadow-cta hover:shadow-cta-hover transition-all disabled:opacity-60"
                    type="submit"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? t.consult.sending : t.consult.submit}
                  </button>
                  {status === "error" && (
                    <p className="text-sm text-error text-center">
                      {t.consult.error}
                    </p>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
