import Image from "next/image";
import type { ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { getTestsDict } from "@/i18n/pages/tests";
import { testsContent } from "./tests-content";
import styles from "./TestsHero.module.css";

export function TestsHero({ locale }: { locale: Locale }): ReactElement | null {
  const t = testsContent[locale];
  const dict = getTestsDict(locale);

  return (
    <section className={styles.hero} aria-labelledby="tests-hero-title">
      <Image className={styles.line} src="/landing/hero/yellow-line.svg" alt="" width={747} height={465} loading="eager" />
      <div className={`landing-container ${styles.inner}`}>
        <h1 id="tests-hero-title" className={styles.title}>
          <span>{t.title[0]}</span> <span>{t.title[1]}</span>
        </h1>
        <p className={styles.subtitle}>{dict.hub.subtitle}</p>
      </div>
    </section>
  );
}
