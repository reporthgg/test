/* eslint-disable @next/next/no-img-element -- SVG decorations retain their intrinsic Figma dimensions. */

import type { ReactElement } from "react";
import { LeadButton } from "@/components/landing/LandingForms";
import type { Locale } from "@/i18n/config";
import { campsFaqContent } from "./tour-faq-content";
import styles from "./CampsFaq.module.css";

// Figma 334:2613 и 409:2582: линия, решётка и иконки те же, что в вопросах школы и главной.
export function CampsFaq({ locale }: { locale: Locale }): ReactElement {
  const t = campsFaqContent[locale];

  return (
    <section className={styles.faq} id="faq" aria-labelledby="camps-faq-title">
      <img className={styles.line} src="/school/contacts/faq-line.svg" alt="" width={728.887} height={427.609} loading="lazy" />
      <img className={styles.lineMobile} src="/landing/contacts/offices-line-mobile.svg" alt="" width={682.961} height={460.155} loading="lazy" />
      <div className={`landing-container ${styles.layout}`}>
        <header className={styles.header}>
          <h2 className={`landing-title ${styles.title}`} id="camps-faq-title">
            <span>{t.title[0]}</span> <span>{t.title[1]}</span> <em>{t.title[2]}</em>
          </h2>
          <img className={styles.hashtag} src="/school/contacts/hashtag.svg" alt="" width={100.012} height={109.966} loading="lazy" />
          <img className={styles.hashtagMobile} src="/school/contacts/hashtag-mobile.svg" alt="" width={50.0062} height={54.983} loading="lazy" />
        </header>
        <div className={styles.questions}>
          {t.items.map((item, index) => (
            <details className={styles.question} key={item.id} open={index === 0}>
              <summary>
                <span>{item.question}</span>
                <span className={styles.icons} aria-hidden="true">
                  <img className={styles.openDesktop} src="/school/contacts/faq-open.svg" alt="" />
                  <img className={styles.closeDesktop} src="/school/contacts/faq-close.svg" alt="" />
                  <img className={styles.openMobile} src="/school/contacts/faq-open-mobile.svg" alt="" />
                  <img className={styles.closeMobile} src="/school/contacts/faq-close-mobile.svg" alt="" />
                </span>
              </summary>
              <div className={styles.answer}>
                <p>{item.answer}</p>
                {item.action && (
                  <LeadButton className={styles.action}>
                    {t.action}{" "}<span aria-hidden="true">→</span>
                  </LeadButton>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
