"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { programsContent } from "@/components/landing/programs-content";
import { useLocale } from "@/i18n/useLocale";
import { withLocale } from "@/i18n/config";
import { getTestsDict } from "@/i18n/pages/tests";
import { trackMetaEvent } from "@/lib/meta-pixel";
import { leadTracking } from "@/lib/lead-tracking";
import ConsentText from "@/components/legal/ConsentText";
import type { TestContactField, TestQuestion, TestSubmissionResult } from "@/lib/test-types";
import { firstMissingAnswer, isQuestionAnswered } from "./test-runner-state";
import { isTestSubmissionResult, saveTestResult } from "./test-result-storage";
import TestResult, { TestHero, TestStage } from "./TestResult";
import styles from "./TestFlow.module.css";

type Props = {
  slug: string;
  title: string;
  description?: string | null;
  timeLimit?: number | null;
  questions: TestQuestion[];
  contactFields?: TestContactField[];
  preview?: boolean;
  scoringMode?: string;
  flag?: string;
};

type Step = "intro" | "quiz" | "contacts" | "loading" | "done" | "error";

const flags: Record<string, string> = {
  ielts: "/tests/flag-ielts.svg",
  sat: "/tests/flag-sat.svg",
  general: "/landing/programs/flag-general.svg",
  "kids-young": "/tests/flag-kids-young.svg",
  "kids-older": "/tests/flag-kids-older.svg",
};

export default function TestRunner({
  slug,
  title,
  description,
  timeLimit,
  questions,
  contactFields = [],
  preview = false,
  scoringMode = "level",
  flag = "general",
}: Props) {
  const locale = useLocale();
  const router = useRouter();
  const t = getTestsDict(locale);
  const common = programsContent[locale];
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
  const plural = new Intl.PluralRules(locale === "kz" ? "kk" : locale);
  const formOf = (count: number) => {
    const category = plural.select(count);
    return category === "one" || category === "few" ? category : "other";
  };
  const written = questions.filter((question) => question.type === "essay").length;
  const flagSrc = flags[flag] ?? flags.general;

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
          ...(preview ? {} : leadTracking()),
        }),
        signal: controller.signal,
      });
      const data: Partial<TestSubmissionResult> & { message?: unknown } = await res.json();
      if (!preview && res.status === 400) {
        setContactError(typeof data.message === "string" ? data.message : t.error.text);
        setStep("contacts");
        return;
      }
      if (!res.ok || !isTestSubmissionResult(data)) throw new Error();
      if (preview) {
        setResult(data);
        setStep("done");
        return;
      }
      // Заявка сохранена: результат показываем на странице благодарности, она нужна для конверсий Meta.
      saveTestResult({ title, result: data });
      trackMetaEvent("Lead");
      router.push(withLocale(locale, "/thankyou"));
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

  function hero(intro = false) {
    return (
      <TestHero
        title={title}
        last={intro}
        back={
          <Link className={styles.back} href={withLocale(locale, "/tests")}>
            <Image src="/landing/forms/chevron-blue-16.svg" alt="" width={16} height={16} />
            {common.allTests}
          </Link>
        }
        tags={
          <ul className={styles.tags}>
            <li className={`${styles.tag} ${styles.tagPink}`}>
              {scoringMode === "raw" ? t.intro.rawEyebrow : t.intro.eyebrow}
            </li>
            <li className={`${styles.tag} ${styles.tagBlue}`}>{`${total} ${common.questionForms[formOf(total)]}`}</li>
            {written > 0 && (
              <li className={`${styles.tag} ${styles.tagGreen}`}>
                {written === 1 ? common.singleWrittenTask : `${written} ${common.writtenForms[formOf(written)]}`}
              </li>
            )}
            <li className={styles.tag}>
              <Image src="/landing/programs/timer.svg" alt="" width={16} height={19} />
              {timeLimit ? `${timeLimit} ${common.minuteForms[formOf(timeLimit)]}` : common.noTimeLimit}
            </li>
          </ul>
        }
        aside={intro ? (
          <>
            {previewLabel && <p role="status" className={styles.preview}>{previewLabel}</p>}
            {description && <p className={styles.description}>{description}</p>}
            <button
              type="button"
              onClick={() => setStep("quiz")}
              disabled={total === 0}
              className={styles.start}
            >
              {t.intro.startBtn}
            </button>
            {!preview && <p className={styles.notice}>{t.intro.contactNotice}</p>}
            {total === 0 && <p className={styles.notice}>{t.intro.empty}</p>}
          </>
        ) : description ? <p className={styles.description}>{description}</p> : undefined}
      />
    );
  }

  function panel(children: React.ReactNode) {
    return (
      <>
        {hero()}
        <Card previewLabel={previewLabel} rootRef={cardRef} flag={flagSrc}>
          {children}
        </Card>
      </>
    );
  }

  // ---------- INTRO ----------
  if (step === "intro") {
    return hero(true);
  }

  if (step === "contacts") {
    return panel(
      <>
        <div className={styles.formHead}>
          <h2>{t.contact.title}</h2>
          <p>{t.contact.subtitle}</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submit(answers);
          }}
          onChange={() => setContactError("")}
          className={styles.form}
        >
          <div className={styles.pair}>
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
            <label key={field.name} className={styles.field}>
              <span>{field.label}{field.required ? " *" : ` (${t.quiz.optional})`}</span>
              {field.options?.length ? (
                <span className={styles.select}>
                  <select
                    value={contact[field.name] ?? ""}
                    onChange={(event) => setContact((previous) => ({ ...previous, [field.name]: event.target.value }))}
                    required={field.required}
                    className={styles.control}
                  >
                    <option value="">{t.contact.selectOption}</option>
                    {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </span>
              ) : (
                <input
                  type={field.name === "age" ? "number" : "text"}
                  min={field.name === "age" ? 1 : undefined}
                  max={field.name === "age" ? 120 : undefined}
                  maxLength={200}
                  value={contact[field.name] ?? ""}
                  onChange={(event) => setContact((previous) => ({ ...previous, [field.name]: event.target.value }))}
                  required={field.required}
                  className={styles.control}
                />
              )}
            </label>
          ))}
          <label className={styles.consent}>
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              required
            />
            <ConsentText locale={locale} />
          </label>
          {contactError && <p role="alert" className={styles.error}>{contactError}</p>}
          <button type="submit" className={styles.submit}>
            {t.contact.submit}
          </button>
          <button
            type="button"
            onClick={() => setStep("quiz")}
            className={styles.textButton}
          >
            {t.contact.back}
          </button>
        </form>
      </>
    );
  }

  // ---------- QUIZ ----------
  if (step === "quiz" && q) {
    return panel(
      <>
        <div className={styles.progressHead}>
          <span>
            {t.quiz.question} {idx + 1} {t.quiz.of} {total}
          </span>
          <span className={styles.percent}>{progress}%</span>
        </div>
        <div className={styles.progress}>
          <span style={{ width: `${progress}%` }} />
        </div>

        <div className={styles.question}>
          <span className={styles.number} aria-hidden="true">{String(idx + 1).padStart(2, "0")}</span>
          <div className={styles.questionBody}>
            <div id={`question-${q.id}`} className={styles.questionText}>
              {q.contentHtml ? <RichContent html={q.contentHtml} /> : <h2>{q.text}</h2>}
            </div>
            <p className={styles.hints}>
              <span>{q.required ? t.quiz.required : t.quiz.optional}</span>
              {q.type === "essay" && <span className={styles.hintEssay}>{t.quiz.essayNotice}</span>}
            </p>
          </div>
        </div>

        {q.type === "choice" ? <div role="group" aria-labelledby={`question-${q.id}`} className={styles.answers}>
          {q.options.map((o, optionIndex) => {
            const active = chosen === o.id;
            return (
              <button
                key={o.id}
                type="button"
                aria-pressed={active}
                onClick={() => choose(o.id)}
                className={`${styles.option} ${active ? styles.optionActive : ""}`}
              >
                <span className={styles.marker} aria-hidden="true">
                  {optionIndex < 26 ? String.fromCharCode(65 + optionIndex) : optionIndex + 1}
                </span>
                <div className={styles.optionText}>
                  {o.contentHtml ? <RichContent html={o.contentHtml} /> : <span>{o.text}</span>}
                </div>
              </button>
            );
          })}
        </div> : q.type === "essay" ? (
          <div className={styles.fieldIndent}>
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
              className={styles.answerField}
            />
          </div>
        ) : (
          <div className={styles.fieldIndent}>
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
              className={styles.answerField}
            />
          </div>
        )}
        {validationError && <p role="alert" className={`${styles.error} ${styles.answerError}`}>{t.quiz.answerRequired}</p>}

        <div className={styles.nav}>
        {idx > 0 && (
          <button
            type="button"
            onClick={() => {
              cancelAdvance();
              setValidationError(false);
              setIdx(idx - 1);
            }}
            className={styles.textButton}
          >
            {t.quiz.back}
          </button>
        )}
          <button type="button" onClick={advance} className={`landing-button ${styles.next}`}>
            {idx + 1 === total ? (preview ? t.quiz.finish : t.quiz.toContacts) : !q.required && !chosen?.trim() ? t.quiz.skip : t.quiz.next}
          </button>
        </div>
      </>
    );
  }

  // ---------- LOADING ----------
  if (step === "loading") {
    return panel(
      <div className={styles.state}>
        <h2 role="status">{t.loading.text}</h2>
      </div>
    );
  }

  // ---------- DONE (только предпросмотр, остальные уходят на /thankyou) ----------
  if (step === "done" && result) {
    return (
      <>
        {hero()}
        <TestStage>
          <div ref={cardRef} className={styles.anchor}>
            {previewLabel && <p role="status" className={styles.preview}>{previewLabel}</p>}
            <TestResult title={title} result={result} preview={preview} />
          </div>
        </TestStage>
      </>
    );
  }

  // ---------- ERROR ----------
  return panel(
    <div className={styles.state}>
      <h2 className={styles.stateError}>
        {t.error.text}
      </h2>
      <button
        type="button"
        onClick={() => submit(answers)}
        className="landing-button"
      >
        {t.error.retry}
      </button>
      {!preview && <button type="button" onClick={() => setStep("contacts")} className={styles.textButton}>
        {t.error.editContact}
      </button>}
    </div>
  );
}

function Card({
  children,
  previewLabel,
  rootRef,
  flag,
}: {
  children: React.ReactNode;
  previewLabel?: string;
  rootRef: React.RefObject<HTMLDivElement | null>;
  flag: string;
}) {
  return (
    <TestStage>
      <div ref={rootRef} className={styles.panel}>
        <Image className={styles.flag} src={flag} alt="" width={45} height={71} />
        {previewLabel && <p role="status" className={`${styles.preview} ${styles.panelPreview}`}>{previewLabel}</p>}
        {children}
      </div>
    </TestStage>
  );
}

function RichContent({ html }: { html: string }) {
  return <div
    className={styles.rich}
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
    <label className={styles.field}>
      <span>
        {label}
      </span>
      <input
        type={type}
        required={required}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.control}
      />
    </label>
  );
}
