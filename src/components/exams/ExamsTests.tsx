import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { withLocale, type Locale } from "@/i18n/config";
import { prisma } from "@/lib/prisma";
import { questionSummary, testPresentation } from "@/lib/test-presentation";
import { programsContent } from "@/components/landing/programs-content";
import { LeadButton } from "@/components/landing/LandingForms";
import { examTestKinds, examsTestsContent } from "./exams-tests-content";
import styles from "./ExamsTests.module.css";

export async function ExamsTests({ locale }: { locale: Locale }): Promise<ReactElement | null> {
  const t = examsTestsContent[locale];
  const common = programsContent[locale];
  const published = await prisma.test.findMany({
    where: { published: true, audience: "adults", kind: { in: [...examTestKinds] }, questions: { some: {} } },
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
  const tests = examTestKinds.flatMap((kind) => published.filter((test) => test.kind === kind).slice(0, 1));
  const plural = new Intl.PluralRules(locale === "kz" ? "kk" : locale);
  const duration = (minutes: number | null): string => {
    if (minutes === null) return common.noTimeLimit;
    const category = plural.select(minutes);
    return `${minutes} ${common.minuteForms[category === "one" || category === "few" ? category : "other"]}`;
  };

  return (
    <section id="tests" className={styles.section} aria-labelledby="exams-tests-title">
      <div className="landing-container">
        <div className={styles.panel}>
          <header className={styles.header}>
            <h2 className={`landing-title ${styles.title}`} id="exams-tests-title">
              <span>{t.title.first}</span> <span>{t.title.second}<em>{t.title.accent}</em>{t.title.after}</span>
            </h2>
            <p>{t.intro}</p>
          </header>
          {tests.length > 0 ? (
            <ul className={styles.cards}>
              {tests.map((test) => {
                const english = test.kind === "placement";
                const title = english ? t.english : testPresentation(test, locale).title;
                return (
                  <li key={test.id} className={english ? styles.english : styles.exam}>
                    <div className={styles.cardTop}>
                      <span className={styles.badge}>{duration(test.timeLimit)}</span>
                      <Link
                        className={styles.arrow}
                        href={withLocale(locale, `/test/${test.slug}`)}
                        aria-label={`${common.startTest}: ${title}`}
                      >
                        <Image
                          src={english ? "/school/test-arrow-white.svg" : "/school/test-arrow-blue.svg"}
                          alt=""
                          width={24}
                          height={24}
                        />
                      </Link>
                    </div>
                    <h3>{title}</h3>
                    <p className={styles.description}>{english ? t.englishDescription : t.examDescription}</p>
                    <span className={styles.chip}>{questionSummary(test, locale, { countSingleWritten: false })}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className={styles.empty}>
              <p>{common.testsEmpty}</p>
              <LeadButton kind="diagnostic">{common.consultationCta}</LeadButton>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
