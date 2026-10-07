/* eslint-disable @next/next/no-img-element -- SVG decorations retain their intrinsic Figma dimensions. */

import type { ReactElement } from "react";
import { LandingOffices } from "@/components/landing/LandingContacts";
import { LeadButton } from "@/components/landing/LandingForms";
import type { Locale } from "@/i18n/config";
import { getSchoolContactsContent } from "./school-contacts-content";
import styles from "./SchoolContacts.module.css";

export function SchoolContacts({ locale }: { locale: Locale }): ReactElement {
  const t = getSchoolContactsContent(locale);

  return (
    <div className={styles.contacts}>
      <section className={styles.faq} id="faq" aria-labelledby="school-faq-title">
        <img className={styles.line} src="/school/contacts/faq-line.svg" alt="" />
        <div className={`landing-container ${styles.layout}`}>
          <header className={styles.header}>
            <h2 className={`landing-title ${styles.title}`} id="school-faq-title">
              <span>{t.title[0]}</span>
              <span>{t.title[1]}</span>
              <em>{t.title[2]}</em>
            </h2>
            <img className={styles.hashtag} src="/school/contacts/hashtag.svg" alt="" />
            <img className={styles.hashtagMobile} src="/school/contacts/hashtag-mobile.svg" alt="" />
          </header>
          <div className={styles.questions}>
            {t.faq.map((item, index) => (
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
                  {item.trial && (
                    <LeadButton kind="trial" className={styles.trial}>
                      {t.trial} <span aria-hidden="true">→</span>
                    </LeadButton>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <div className={styles.offices}>
        <LandingOffices locale={locale} />
      </div>
    </div>
  );
}
