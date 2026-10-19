"use client";

import { useId, type ReactElement, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { programsContent } from "@/components/landing/programs-content";
import { site } from "@/lib/site";
import { useLocale } from "@/i18n/useLocale";
import { withLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getTestsDict } from "@/i18n/pages/tests";
import type { TestSubmissionResult } from "@/lib/test-types";
import flow from "./TestFlow.module.css";
import styles from "./TestResult.module.css";

export function TestHero({
  title,
  back,
  tags,
  aside,
  last = false,
}: {
  title: string;
  back?: ReactNode;
  tags?: ReactNode;
  aside?: ReactNode;
  last?: boolean;
}): ReactElement {
  const titleId = useId();
  const words = title.trim().split(/\s+/u);
  const accent = words.length > 1 ? words.pop() : undefined;

  return (
    <section className={`${flow.hero} ${last ? flow.heroLast : ""} ${aside ? "" : flow.heroCompact}`} aria-labelledby={titleId}>
      <Image className={flow.line} src="/landing/hero/yellow-line.svg" alt="" width={747} height={465} loading="eager" />
      <div className={`landing-container ${flow.heroInner} ${aside ? "" : flow.heroSingle}`}>
        <div className={flow.heroMain}>
          {back}
          <h1 id={titleId} className={`landing-title ${flow.title}`}>
            {accent ? <>{words.join(" ")} <em>{accent}</em></> : title}
          </h1>
          {tags}
        </div>
        {aside && <div className={flow.heroAside}>{aside}</div>}
      </div>
    </section>
  );
}

export function TestStage({ children }: { children: ReactNode }): ReactElement {
  return (
    <section className={flow.stage}>
      <div className="landing-container">{children}</div>
    </section>
  );
}

function splitLevel(level: string): { main: string; note?: string } {
  const match = /^(.+?)\s*\(([^()]+)\)$/u.exec(level.trim());
  return match ? { main: match[1], note: match[2] } : { main: level.trim() };
}

export default function TestResult({
  title,
  result,
  preview = false,
}: {
  title: string;
  result: TestSubmissionResult;
  preview?: boolean;
}) {
  const locale = useLocale();
  const t = getTestsDict(locale);
  const submissionText = getDictionary(locale).submission;
  const common = programsContent[locale];
  const level = splitLevel(result.level);
  const share = result.total > 0 ? Math.min(100, Math.max(0, Math.round((result.score / result.total) * 100))) : 0;
  // Оффер «план до цели» показываем, когда заявка дошла до менеджера и уровень известен.
  const planOffer = !preview && result.crmDelivered === true && !!level.main && result.total > 0;

  return (
    <div className={styles.result}>
      <div className={styles.score}>
        <p className={styles.label}>{t.result.yourResult}</p>
        {result.level && result.total > 0 && (
          <p className={`${styles.level} ${level.main.length > 6 ? styles.levelLong : ""}`}>
            <span className={styles.levelMain}>{level.main}</span>
            {level.note && <span className={styles.levelNote}>{level.note}</span>}
          </p>
        )}
        {result.total === 0 && result.pendingReview > 0 && (
          <>
            <p className={styles.caption}>{t.result.manualReview}</p>
            <p className={styles.level}>
              <span className={styles.levelMain}>{result.pendingReview}</span>
            </p>
          </>
        )}
        {result.total > 0 && (
          <div className={styles.correct}>
            <p>
              <span>{t.result.correctAnswers}</span>
              <b>{result.score} <small>{t.result.of} {result.total}</small></b>
            </p>
            <div className={styles.bar}>
              <span style={{ width: `${share}%` }} />
            </div>
          </div>
        )}
      </div>
      <div className={styles.side}>
        {!preview && result.crmDelivered === true && (
          <Image className={styles.check} src="/landing/forms/success-check.svg" alt="" width={44} height={44} />
        )}
        {planOffer ? (
          <>
            <p className={styles.planTitle}>{t.result.planTitle.replace("{level}", level.main)}</p>
            <p className={styles.note}>{t.result.planText}</p>
          </>
        ) : (
          <p className={styles.note}>
            {preview ? t.preview.resultNote : result.crmDelivered === true ? t.result.note : submissionText.deliveryUnconfirmed}
          </p>
        )}
        {result.pendingReview > 0 && (
          <p role="status" className={styles.review}>
            {t.result.manualReview} <b>{result.pendingReview}</b>. {t.result.manualReviewNote}
          </p>
        )}
        <div className={styles.actions}>
          {!preview && <a
            href={`${site.whatsapp.link}?text=${encodeURIComponent(
              `${t.result.waIntro}${title}${t.result.waResult}${result.level}${planOffer ? t.result.waPlan : ""}`
            )}`}
            target="_blank"
            rel="noopener"
            className={flow.whatsapp}
          >
            <Image src="/landing/forms/whatsapp.svg" alt="" width={24} height={24} />
            {planOffer ? t.result.planButton : t.result.waButton}
          </a>}
          <Link href={withLocale(locale, "/tests")} className={styles.link}>
            {common.allTests}
            <Image src="/tests/arrow.svg" alt="" width={24} height={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}
