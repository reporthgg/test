"use client";

import { useMemo, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { useLocale } from "@/i18n/useLocale";
import { withLocale } from "@/i18n/config";
import { getTestsDict } from "@/i18n/pages/tests";
import { parseStoredTestResult, readStoredTestResult } from "./test-result-storage";
import TestResult, { TestHero, TestStage } from "./TestResult";
import styles from "./TestFlow.module.css";

const noSubscription = () => () => {};

export default function ThankYou() {
  const locale = useLocale();
  const t = getTestsDict(locale);
  // На сервере sessionStorage нет: до гидратации показываем загрузку, а не общий текст.
  const raw = useSyncExternalStore(noSubscription, readStoredTestResult, () => undefined);
  const stored = useMemo(() => (raw === undefined ? undefined : parseStoredTestResult(raw)), [raw]);

  if (stored === undefined) {
    return <section className={`${styles.hero} ${styles.heroLast} ${styles.busy}`} aria-busy="true" />;
  }

  if (stored) {
    return (
      <>
        <TestHero
          title={t.thankYou.testTitle}
          tags={
            <ul className={styles.tags}>
              <li className={`${styles.tag} ${styles.tagBlue}`}>{stored.title}</li>
            </ul>
          }
        />
        <TestStage>
          <TestResult title={stored.title} result={stored.result} />
        </TestStage>
      </>
    );
  }

  return (
    <TestHero
      title={t.thankYou.title}
      last
      aside={
        <>
          <p className={styles.description}>{t.thankYou.text}</p>
          <div className={styles.actions}>
            <a href={site.whatsapp.link} target="_blank" rel="noopener" className={styles.whatsapp}>
              <Image src="/landing/forms/whatsapp.svg" alt="" width={24} height={24} />
              {t.result.waButton}
            </a>
            <Link href={withLocale(locale, "/")} className={styles.textButton}>
              {t.result.home}
            </Link>
          </div>
        </>
      }
    />
  );
}
