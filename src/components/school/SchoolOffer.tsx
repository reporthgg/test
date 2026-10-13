import Image from "next/image";
import type { ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { LeadButton } from "@/components/landing/LandingForms";
import { schoolOfferContent, schoolOfferCourse } from "./school-offer-content";
import styles from "./SchoolOffer.module.css";

export default function SchoolOffer({ locale }: { locale: Locale }): ReactElement {
  const t = schoolOfferContent[locale];

  return (
    <section id="general-english" className={styles.section} aria-labelledby="school-offer-title">
      <div className="landing-container">
        <div className={styles.card}>
          <div className={styles.offer}>
            <div>
              <h2 id="school-offer-title" className={`landing-title ${styles.title}`}>
                {t.title[0]} <em>{t.title[1]}</em>
              </h2>
              <p className={styles.tagline}>{t.tagline}</p>
            </div>
            <p className={styles.price}>
              <strong>{t.price.amount}</strong>
              <span>{t.price.period}</span>
            </p>
          </div>
          <div className={styles.panel}>
            <div>
              <h3>{t.includedTitle}</h3>
              <ul className={styles.list}>
                {t.included.map((item) => (
                  <li key={item}>
                    <Image src="/school/teacher-badge.svg" alt="" width={16} height={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.result}>
              <h3>{t.resultTitle}</h3>
              <p>{t.result}</p>
            </div>
            <LeadButton kind="trial" course={schoolOfferCourse} className={styles.cta}>
              {t.cta}
            </LeadButton>
          </div>
        </div>
      </div>
    </section>
  );
}
