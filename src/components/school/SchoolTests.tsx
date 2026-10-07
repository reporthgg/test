/* eslint-disable @next/next/no-img-element -- Оригинальные SVG сохраняют размеры из Figma. */

import Link from "next/link";
import Image from "next/image";
import type { ReactElement } from "react";
import { withLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { prisma } from "@/lib/prisma";
import { questionSummary, testPresentation } from "@/lib/test-presentation";
import { programsContent } from "@/components/landing/programs-content";
import { LeadButton } from "@/components/landing/LandingForms";
import { schoolTestsContent } from "./school-tests-content";
import styles from "./SchoolTests.module.css";

export default async function SchoolTests({ locale }: { locale: Locale }): Promise<ReactElement> {
  const t = schoolTestsContent[locale];
  const common = programsContent[locale];
  const tests = await prisma.test.findMany({
    where: { published: true, questions: { some: {} } },
    orderBy: { order: "asc" },
    select: {
      id: true,
      slug: true,
      title: true,
      kind: true,
      audience: true,
      timeLimit: true,
      questions: { select: { type: true } },
    },
  });
  const englishTests = tests.filter((test) => test.kind === "placement" || test.kind === "kids");
  const ieltsTests = tests.filter((test) => test.kind === "ielts");
  const allTestsHref = withLocale(locale, "/tests");

  return (
    <section id="school-tests" className={styles.section} aria-labelledby="school-tests-title">
      <Image className={styles.sticker} src="/school/test-sticker.png" alt="" width={276} height={276} sizes="276px" />
      <div className="landing-container">
        <div className={styles.panel}>
          <header className={styles.header}>
            <h2 className="landing-title" id="school-tests-title">
              {t.title[0]} <em>{t.title[1]}</em>
            </h2>
            <p>{t.intro}</p>
          </header>
          <div className={styles.cards}>
            {englishTests.length > 0 && (
              <article className={styles.english}>
                <div className={styles.cardTop}>
                  <span className={styles.free}>{t.free}</span>
                  <Link
                    className={styles.arrow}
                    href={englishTests.length === 1
                      ? withLocale(locale, `/test/${englishTests[0].slug}`)
                      : allTestsHref}
                    aria-label={englishTests.length === 1 ? `${common.startTest}: ${englishTests[0].title}` : common.allTests}
                  >
                    <img src="/school/test-arrow-white.svg" alt="" />
                  </Link>
                </div>
                <h3>{t.english}</h3>
                <p className={styles.description}>{t.englishDescription}</p>
                <p className={styles.choose}>{t.chooseTest}</p>
                <div className={styles.variants}>
                  {englishTests.map((test) => {
                    const presentation = testPresentation(test, locale);
                    const general = test.slug === "general-english" || test.slug === "tilda-general-english";
                    const age = presentation.age.replace(/[()]/gu, "") ||
                      (general ? "13+" : test.slug === "kids-english" ? `7-12 ${common.years}` : "");
                    return (
                      <Link
                        key={test.id}
                        href={withLocale(locale, `/test/${test.slug}`)}
                        className={`${styles.variant} ${general ? styles.general : ""}`}
                        aria-label={`${common.startTest}: ${test.title}${age ? ` (${age})` : ""}`}
                      >
                        <strong>{age || test.title}</strong>
                        {age && <span className={styles.variantTitle}>{test.title}</span>}
                        <span className={styles.questionCount}>{questionSummary(test, locale)}</span>
                        <span className={styles.duration}>
                          {test.timeLimit !== null ? `${test.timeLimit} ${common.minutes}` : common.noTimeLimit}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </article>
            )}
            {ieltsTests.map((test) => (
              <article className={styles.ielts} key={test.id}>
                <span className={styles.scoreDecoration} aria-hidden="true">8.0</span>
                <div className={styles.cardTop}>
                  <span className={styles.examBadge}>{t.exam}</span>
                  <Link
                    className={styles.arrowLight}
                    href={withLocale(locale, `/test/${test.slug}`)}
                    aria-label={`${common.startTest}: ${test.title}`}
                  >
                    <img src="/school/test-arrow-blue.svg" alt="" />
                  </Link>
                </div>
                <h3>{test.title}</h3>
                <p className={styles.description}>{t.examDescription}</p>
                <div className={styles.examMeta}>
                  <span className={styles.examQuestions}>{questionSummary(test, locale)}</span>
                  <span className={styles.examDuration}>
                    {test.timeLimit !== null ? `${test.timeLimit} ${common.minutes}` : common.noTimeLimit}
                  </span>
                </div>
                {test.questions.some((question) => question.type === "essay") && (
                  <p className={styles.note}>
                    <img src="/school/test-note.svg" alt="" />
                    <span>{t.writtenReview}</span>
                  </p>
                )}
              </article>
            ))}
          </div>
          {tests.length === 0 && (
            <div className={styles.empty}>
              <p>{common.testsEmpty}</p>
              <LeadButton kind="diagnostic">{common.consultationCta}</LeadButton>
            </div>
          )}
          <Link className={styles.allTests} href={allTestsHref}>{common.allTests}</Link>
        </div>
      </div>
    </section>
  );
}
