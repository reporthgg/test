"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import CountUp from "@/components/ui/CountUp";
import { site } from "@/lib/site";
import { useLocale } from "@/i18n/useLocale";
import { getDictionary } from "@/i18n/dictionaries";
import { getTestsDict } from "@/i18n/pages/tests";
import type { TestSubmissionResult } from "@/lib/test-types";

export default function TestResult({
  title,
  result,
  heading,
  preview = false,
}: {
  title: string;
  result: TestSubmissionResult;
  heading?: ReactNode;
  preview?: boolean;
}) {
  const locale = useLocale();
  const t = getTestsDict(locale);
  const submissionText = getDictionary(locale).submission;

  return (
    <div className="text-center py-4">
      <div className="w-16 h-16 rounded-full bg-clever-green/10 text-clever-green flex items-center justify-center mx-auto mb-6 shadow-premium">
        <Icon name="check" className="text-3xl" />
      </div>
      {heading}
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
        {preview ? t.preview.resultNote : result.crmDelivered === true ? t.result.note : submissionText.deliveryUnconfirmed}
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
  );
}
