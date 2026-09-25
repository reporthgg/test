"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import CountUp from "@/components/ui/CountUp";
import { site } from "@/lib/site";
import { useLocale } from "@/i18n/useLocale";
import { getTestsDict } from "@/i18n/pages/tests";
import type { TestContactField, TestQuestion, TestSubmissionResult } from "@/lib/test-types";
import { firstMissingAnswer, isQuestionAnswered } from "./test-runner-state";

type Props = {
  slug: string;
  title: string;
  description?: string | null;
  timeLimit?: number | null;
  questions: TestQuestion[];
  contactFields?: TestContactField[];
  preview?: boolean;
  scoringMode?: string;
};

type Step = "intro" | "quiz" | "contacts" | "loading" | "done" | "error";

export default function TestRunner({
  slug,
  title,
  description,
  timeLimit,
  questions,
  contactFields = [],
  preview = false,
  scoringMode = "level",
}: Props) {
  const t = getTestsDict(useLocale());
  const [step, setStep] = useState<Step>("intro");
  const [form, setForm] = useState({ name: "", phone: "" });
  const [consent, setConsent] = useState(false);
  const [contactError, setContactError] = useState("");
  const [contact, setContact] = useState<Partial<Record<TestContactField["name"], string>>>({});
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<TestSubmissionResult | null>(null);
  const [validationError, setValidationError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const request = useRef<AbortController | null>(null);
  const submitting = useRef(false);

  useEffect(() => () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    request.current?.abort();
  }, []);

  useEffect(() => {
    if (step !== "intro") cardRef.current?.scrollIntoView({ block: "start" });
  }, [step, idx]);

  const total = questions.length;
  const q = questions[idx];
  const chosen = q ? answers[q.id] : undefined;
  const progress = total ? Math.round((idx / total) * 100) : 0;
  const previewLabel = preview ? t.preview.label : undefined;

  function cancelAdvance() {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = null;
  }

  async function submit(finalAnswers: Record<string, string>) {
    cancelAdvance();
    if (submitting.current) return;
    setContactError("");
    const missing = firstMissingAnswer(questions, finalAnswers);
    if (missing !== -1) {
      setIdx(missing);
      setValidationError(true);
      setStep("quiz");
      return;
    }
    submitting.current = true;
    const controller = new AbortController();
    request.current = controller;
    setStep("loading");
    try {
      const res = await fetch(`/api/tests/${encodeURIComponent(slug)}/submit${preview ? "?preview=1" : ""}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          ...Object.fromEntries(Object.entries(contact).filter(([, value]) => value?.trim())),
          consent,
          answers: finalAnswers,
        }),
        signal: controller.signal,
      });
      const data: Partial<TestSubmissionResult> & { message?: unknown } = await res.json();
      if (!preview && res.status === 400) {
        setContactError(typeof data.message === "string" ? data.message : t.error.text);
        setStep("contacts");
        return;
      }
      if (!res.ok || data.ok !== true || typeof data.score !== "number" ||
          typeof data.total !== "number" || typeof data.level !== "string" ||
          typeof data.pendingReview !== "number") throw new Error();
      setResult(data as TestSubmissionResult);
      setStep("done");
    } catch {
      if (!controller.signal.aborted) setStep("error");
    } finally {
      submitting.current = false;
      request.current = null;
    }
  }

  function choose(optionId: string) {
    cancelAdvance();
    setAnswers((previous) => ({ ...previous, [q.id]: optionId }));
    setValidationError(false);
    if (idx + 1 < total) {
      // небольшая пауза и переход дальше
      advanceTimer.current = setTimeout(() => {
        advanceTimer.current = null;
        setIdx(idx + 1);
      }, 220);
    }
  }

  function advance() {
    cancelAdvance();
    if (q.required && !isQuestionAnswered(q, chosen)) {
      setValidationError(true);
      return;
    }
    setValidationError(false);
    if (idx + 1 < total) {
      setIdx(idx + 1);
      return;
    }
    const missing = firstMissingAnswer(questions, answers);
    if (missing !== -1) {
      setIdx(missing);
      setValidationError(true);
      return;
    }
    if (preview) void submit(answers);
    else setStep("contacts");
  }

  // ---------- INTRO ----------
  if (step === "intro") {
    return (
      <Card previewLabel={previewLabel} rootRef={cardRef}>
        <div className="text-center">
          <span className="tag-pill">{scoringMode === "raw" ? t.intro.rawEyebrow : t.intro.eyebrow}</span>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            <span className="text-gradient">{title}</span>
          </h1>
          {description && (
            <p className="text-on-surface-variant mb-8 max-w-lg mx-auto leading-relaxed">{description}</p>
          )}
        </div>
        <p className="text-center text-sm text-on-surface-variant mb-6">
          {t.intro.metaQuestions}: {total}
          {timeLimit ? ` · ${timeLimit} ${t.intro.minutes}` : ""}
        </p>
        {!preview && <p className="text-center text-sm text-on-surface-variant mb-6">{t.intro.contactNotice}</p>}
        <button
          type="button"
          onClick={() => setStep("quiz")}
          disabled={total === 0}
          className="btn-primary shimmer w-full py-4 rounded-xl font-bold text-lg disabled:opacity-60"
        >
          {t.intro.startBtn}
        </button>
        {total === 0 && <p className="text-sm text-on-surface-variant mt-3">{t.intro.empty}</p>}
      </Card>
    );
  }

  if (step === "contacts") {
    return (
      <Card rootRef={cardRef}>
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-3">{t.contact.title}</h1>
          <p className="text-on-surface-variant">{t.contact.subtitle}</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submit(answers);
          }}
          onChange={() => setContactError("")}
          className="space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label={t.contact.nameLabel}
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              placeholder={t.contact.namePh}
              maxLength={120}
              required
            />
            <Field
              label={t.contact.phoneLabel}
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
              placeholder={t.contact.phonePh}
              type="tel"
              maxLength={40}
              required
            />
          </div>
          {contactFields.map((field) => (
            <label key={field.name} className="block text-sm font-semibold text-on-surface">
              <span className="block mb-2">{field.label}{field.required ? " *" : ` (${t.quiz.optional})`}</span>
              {field.options?.length ? (
                <select
                  value={contact[field.name] ?? ""}
                  onChange={(event) => setContact((previous) => ({ ...previous, [field.name]: event.target.value }))}
                  required={field.required}
                  className="w-full rounded-xl border border-border-subtle bg-surface-container-low px-4 py-3"
                >
                  <option value="">{t.contact.selectOption}</option>
                  {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              ) : (
                <input
                  type={field.name === "age" ? "number" : "text"}
                  min={field.name === "age" ? 1 : undefined}
                  max={field.name === "age" ? 120 : undefined}
                  maxLength={200}
                  value={contact[field.name] ?? ""}
                  onChange={(event) => setContact((previous) => ({ ...previous, [field.name]: event.target.value }))}
                  required={field.required}
                  className="w-full rounded-xl border border-border-subtle bg-surface-container-low px-4 py-3"
                />
              )}
            </label>
          ))}
          <label className="flex items-start gap-3 text-sm text-on-surface-variant pt-1">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              required
              className="mt-1 rounded text-primary focus:ring-primary"
            />
            {t.contact.consent}
          </label>
          {contactError && <p role="alert" className="text-error text-sm">{contactError}</p>}
          <button
            type="submit"
            className="btn-primary w-full py-4 rounded-xl font-bold text-lg mt-2"
          >
            {t.contact.submit}
          </button>
          <button
            type="button"
            onClick={() => setStep("quiz")}
            className="block mx-auto text-sm font-semibold text-primary"
          >
            {t.contact.back}
          </button>
        </form>
      </Card>
    );
  }

  // ---------- QUIZ ----------
  if (step === "quiz" && q) {
    return (
      <Card previewLabel={previewLabel} rootRef={cardRef}>
        <div className="mb-8">
          <div className="flex justify-between text-sm font-semibold text-on-surface-variant mb-2.5">
            <span>
              {t.quiz.question} {idx + 1} {t.quiz.of} {total}
            </span>
            <span className="number-gradient font-extrabold">{progress}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-surface-container-high overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div id={`question-${q.id}`} className="text-xl md:text-2xl font-bold text-on-surface mb-6 leading-snug">
          {q.contentHtml ? <RichContent html={q.contentHtml} /> : <h2 className="whitespace-pre-wrap">{q.text}</h2>}
        </div>
        <p className="text-sm text-on-surface-variant mb-4">
          {q.required ? t.quiz.required : t.quiz.optional}
          {q.type === "essay" && ` · ${t.quiz.essayNotice}`}
        </p>

        {q.type === "choice" ? <div role="group" aria-labelledby={`question-${q.id}`} className="space-y-3">
          {q.options.map((o) => {
            const active = chosen === o.id;
            return (
              <button
                key={o.id}
                type="button"
                aria-pressed={active}
                onClick={() => choose(o.id)}
                className={`group w-full text-left flex items-center gap-4 px-5 py-4 rounded-xl border-2 font-medium transition-all duration-200 ${
                  active
                    ? "border-primary bg-primary/5 text-primary shadow-premium"
                    : "border-border-subtle bg-surface hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-premium"
                }`}
              >
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    active
                      ? "border-primary bg-primary text-white"
                      : "border-border-subtle group-hover:border-primary/50"
                  }`}
                >
                  {active && <Icon name="check" className="text-base" />}
                </span>
                <div className="flex-1 min-w-0">
                  {o.contentHtml ? <RichContent html={o.contentHtml} /> : <span className="whitespace-pre-wrap">{o.text}</span>}
                </div>
              </button>
            );
          })}
        </div> : q.type === "essay" ? (
          <textarea
            key={q.id}
            aria-labelledby={`question-${q.id}`}
            aria-invalid={validationError}
            value={chosen ?? ""}
            onChange={(event) => {
              setAnswers((previous) => ({ ...previous, [q.id]: event.target.value }));
              setValidationError(false);
            }}
            rows={10}
            maxLength={20000}
            placeholder={t.quiz.answerPlaceholder}
            className="w-full rounded-xl border border-border-subtle bg-surface-container-low px-4 py-3 resize-y"
          />
        ) : (
          <input
            key={q.id}
            type="text"
            aria-labelledby={`question-${q.id}`}
            aria-invalid={validationError}
            value={chosen ?? ""}
            onChange={(event) => {
              setAnswers((previous) => ({ ...previous, [q.id]: event.target.value }));
              setValidationError(false);
            }}
            maxLength={2000}
            autoComplete="off"
            placeholder={t.quiz.answerPlaceholder}
            className="w-full rounded-xl border border-border-subtle bg-surface-container-low px-4 py-3"
          />
        )}
        {validationError && <p role="alert" className="mt-3 text-sm text-error">{t.quiz.answerRequired}</p>}

        <div className="mt-6 flex items-center justify-between gap-4">
        {idx > 0 && (
          <button
            type="button"
            onClick={() => {
              cancelAdvance();
              setValidationError(false);
              setIdx(idx - 1);
            }}
            className="inline-flex items-center gap-1 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
          >
            {t.quiz.back}
          </button>
        )}
          <button type="button" onClick={advance} className="btn-primary ml-auto px-6 py-3 rounded-xl font-bold">
            {idx + 1 === total ? (preview ? t.quiz.finish : t.quiz.toContacts) : !q.required && !chosen?.trim() ? t.quiz.skip : t.quiz.next}
          </button>
        </div>
      </Card>
    );
  }

  // ---------- LOADING ----------
  if (step === "loading") {
    return (
      <Card previewLabel={previewLabel} rootRef={cardRef}>
        <div className="py-16 text-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-on-surface-variant">{t.loading.text}</p>
        </div>
      </Card>
    );
  }

  // ---------- DONE ----------
  if (step === "done" && result) {
    return (
      <Card previewLabel={previewLabel} rootRef={cardRef}>
        <div className="text-center py-4">
          <div className="w-16 h-16 rounded-full bg-clever-green/10 text-clever-green flex items-center justify-center mx-auto mb-6 shadow-premium">
            <Icon name="check" className="text-3xl" />
          </div>
          <p className="text-on-surface-variant mb-4 text-sm uppercase tracking-wider font-semibold">{t.result.yourResult}</p>
          {result.level && result.total > 0 && <div className="inline-flex items-center justify-center card-premium card-ring rounded-2xl bg-surface-container-lowest px-10 py-5 mb-5">
            <div className="text-4xl md:text-5xl font-extrabold number-gradient leading-none">
              {result.level}
            </div>
          </div>}
          {result.total > 0 && <p className="text-on-surface-variant mb-8">
            {t.result.correctAnswers}{" "}
            <b className="text-lg"><CountUp value={result.score} className="number-gradient font-extrabold" /></b>{" "}
            {t.result.of} {result.total}
          </p>}
          {result.pendingReview > 0 && (
            <p role="status" className="rounded-xl border border-primary/20 bg-primary/5 p-4 mb-6 text-sm">
              {t.result.manualReview} {result.pendingReview}. {t.result.manualReviewNote}
            </p>
          )}
          <div className="glass-card rounded-xl p-5 text-sm text-on-surface-variant mb-8">
            {preview ? t.preview.resultNote : t.result.note}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {!preview && <a
              href={`${site.whatsapp.link}?text=${encodeURIComponent(
                `${t.result.waIntro}${title}${t.result.waResult}${result.level}`
              )}`}
              target="_blank"
              rel="noopener"
              className="btn-primary px-6 py-3 rounded-xl font-bold"
            >
              {t.result.waButton}
            </a>}
            <Link href="/" className="btn-outline px-6 py-3 rounded-xl font-bold bg-white">
              {t.result.home}
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  // ---------- ERROR ----------
  return (
    <Card previewLabel={previewLabel} rootRef={cardRef}>
      <div className="py-12 text-center">
        <p className="text-error font-semibold mb-4">
          {t.error.text}
        </p>
        <button
          onClick={() => submit(answers)}
          className="btn-primary px-6 py-3 rounded-xl font-bold"
        >
          {t.error.retry}
        </button>
        {!preview && <button onClick={() => setStep("contacts")} className="block mx-auto mt-4 text-sm text-primary font-semibold">
          {t.error.editContact}
        </button>}
      </div>
    </Card>
  );
}

function Card({
  children,
  previewLabel,
  rootRef,
}: {
  children: React.ReactNode;
  previewLabel?: string;
  rootRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={rootRef} className="max-w-2xl mx-auto card-premium card-ring rounded-2xl bg-white p-7 md:p-12 shadow-premium scroll-mt-28">
      {previewLabel && <p role="status" className="mb-6 rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm font-semibold">{previewLabel}</p>}
      {children}
    </div>
  );
}

function RichContent({ html }: { html: string }) {
  return <div
    className="break-words [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_p]:mb-3 [&_blockquote]:my-5 [&_blockquote]:text-base [&_blockquote]:font-normal [&_blockquote]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_table]:max-w-full [&_a]:underline"
    dangerouslySetInnerHTML={{ __html: html }}
  />;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-on-surface mb-2">
        {label}
      </span>
      <input
        type={type}
        required={required}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border-subtle bg-surface-container-low px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all"
      />
    </label>
  );
}
