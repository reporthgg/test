import Image from "next/image";
import type { ReactElement } from "react";
import { LeadButton } from "@/components/landing/LandingForms";
import type { Locale } from "@/i18n/config";
import { examsOfferContent, examsOfferCourse } from "./exams-offer-content";
import styles from "./ExamsOffer.module.css";

export function ExamsOffer({ locale }: { locale: Locale }): ReactElement {
  const t = examsOfferContent[locale];

  return (
    <section className={styles.section} id="ielts-preparation" aria-labelledby="exams-offer-title">
      <div className="landing-container">
        <div className={styles.card}>
          <div className={styles.intro}>
            <h2 id="exams-offer-title" className={`landing-title ${styles.title}`}>
              {t.title[0]} <em>{t.title[1]}</em>
            </h2>
            <p className={styles.subtitle}>{t.subtitle}</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.statLabel}>{t.stat.label}</p>
            <p className={styles.statValue}>
              <strong>{t.stat.value}</strong> <span>{t.stat.unit}</span>
            </p>
          </div>
          <ul className={styles.points}>
            {t.points.map((point) => (
              <li key={point}>
                <Image src="/landing/forms/school-step-check-desktop.svg" alt="" width={28} height={28} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <LeadButton kind="diagnostic" course={examsOfferCourse} className={styles.cta}>
            {t.cta}
          </LeadButton>
        </div>
      </div>
    </section>
  );
}
