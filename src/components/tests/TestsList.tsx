import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { LeadButton } from "@/components/landing/LandingForms";
import { programsContent } from "@/components/landing/programs-content";
import { withLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { getTestsDict } from "@/i18n/pages/tests";
import { prisma } from "@/lib/prisma";
import { questionSummary, testPresentation } from "@/lib/test-presentation";
import { testsContent } from "./tests-content";
import styles from "./TestsList.module.css";

const flags: Record<string, string> = {
  ielts: "/tests/flag-ielts.svg",
  sat: "/tests/flag-sat.svg",
  general: "/landing/programs/flag-general.svg",
  "kids-young": "/tests/flag-kids-young.svg",
  "kids-older": "/tests/flag-kids-older.svg",
};

function TestMedia({ kind }: { kind: string }): ReactElement {
  if (kind === "ielts") {
    return (
      <span className={styles.ielts}>
        <Image src="/tests/ielts-logo.svg" alt="" width={84} height={26} />
      </span>
    );
  }
  if (kind === "sat") {
    return (
      <span className={styles.sat}>
        <Image src="/tests/sat-logo.svg" alt="" width={72} height={48} />
      </span>
    );
  }
  if (kind === "kids-young") {
    return <Image className={styles.kids} src="/tests/kids-illustration.svg" alt="" width={135} height={81} />;
  }
  if (kind === "kids-older") {
    return (
      <span className={styles.teen}>
        <Image className={styles.headphones} src="/tests/teen-headphones.svg" alt="" width={66} height={58} />
        <span className={styles.phone}>
          <span />
          <span />
          <span />
          <span />
          <span />
        </span>
        <Image className={styles.sparkle} src="/tests/teen-sparkle.svg" alt="" width={11} height={11} />
      </span>
    );
  }
  return (
    <span className={styles.general}>
      <span className={styles.bubbleFirst}>
        <Image src="/tests/general-bubble-1.svg" alt="" width={82} height={65} />
      </span>
      <span className={styles.bubbleSecond}>
        <Image src="/tests/general-bubble-2.svg" alt="" width={63} height={50} />
      </span>
    </span>
  );
}

export async function TestsList({ locale }: { locale: Locale }): Promise<ReactElement | null> {
  const t = testsContent[locale];
  const common = programsContent[locale];
  const start = getTestsDict(locale).hub.start;
  const rules = new Intl.PluralRules(locale === "kz" ? "kk" : locale);
  const tests = await prisma.test.findMany({
    where: { published: true, questions: { some: {} } },
    orderBy: { order: "asc" },
    select: {
      id: true,
      slug: true,
      title: true,
      kind: true,
      audience: true,
      description: true,
      timeLimit: true,
      questions: { select: { type: true } },
    },
  });

  return (
    <section className={styles.section} aria-label={t.listLabel}>
      <div className="landing-container">
        {tests.length > 0 ? (
          <ul className={styles.grid}>
            {tests.map((test) => {
              const { flag } = testPresentation(test, locale);
              const category = rules.select(test.questions.length);
              const form = category === "one" || category === "few" ? category : "other";
              const description = locale === "ru" && test.description
                ? test.description.trim().replace(/\.$/u, "")
                : questionSummary(test, locale, { countSingleWritten: false });
              return (
                <li key={test.id} className={`${styles.card} ${test.title.length > 20 ? styles.long : ""}`}>
                  <Image className={styles.flag} src={flags[flag] ?? flags.general} alt="" width={45} height={71} />
                  <div className={styles.media} aria-hidden="true">
                    <TestMedia kind={flag} />
                  </div>
                  <div className={styles.info}>
                    <div className={styles.heading}>
                      <h2 className={styles.name}>{test.title}</h2>
                      <span className={styles.chip}>{`${test.questions.length} ${common.questionForms[form]}`}</span>
                    </div>
                    <p className={styles.description}>{description}</p>
                  </div>
                  <Link
                    className={styles.link}
                    href={withLocale(locale, `/test/${test.slug}`)}
                    aria-label={`${start}: ${test.title}`}
                  >
                    {start}
                    <Image className={styles.arrow} src="/tests/arrow.svg" alt="" width={24} height={24} />
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={styles.empty}>
            <p>{common.testsEmpty}</p>
            <LeadButton kind="diagnostic" className="landing-button">{common.consultationCta}</LeadButton>
          </div>
        )}
      </div>
    </section>
  );
}
