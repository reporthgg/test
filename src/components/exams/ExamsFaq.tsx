import Image from "next/image";
import type { ReactElement } from "react";
import { LeadButton } from "@/components/landing/LandingForms";
import type { Locale } from "@/i18n/config";
import { examsFaqContent } from "./exams-sections-content";
import styles from "./ExamsFaq.module.css";

export function ExamsFaq({ locale }: { locale: Locale }): ReactElement {
  const t = examsFaqContent[locale];

  return (
    <section className={styles.faq} id="faq" aria-labelledby="exams-faq-title">
      <Image className={styles.line} src="/school/contacts/faq-line.svg" alt="" width={728.887} height={427.609} />
      <Image className={styles.lineMobile} src="/landing/contacts/offices-line-mobile.svg" alt="" width={682.961} height={460.155} />
      <div className={`landing-container ${styles.layout}`}>
        <header className={styles.header}>
          <h2 className={`landing-title ${styles.title}`} id="exams-faq-title">
            <span>{t.title[0]}</span> <span>{t.title[1]}</span> <em>{t.title[2]}</em>
          </h2>
          <Image className={styles.hashtag} src="/school/contacts/hashtag.svg" alt="" width={100.012} height={109.966} />
          <LeadButton className={styles.consultation}>
            <span className={styles.consultationText}>
              {t.consultation.map((line) => <span key={line}>{line}</span>)}
            </span>
            <Image className={styles.consultationArrow} src="/landing/programs/consultation-arrow.svg" alt="" width={155} height={65.0009} />
            <Image className={styles.consultationArrowMobile} src="/exams/faq/consultation-arrow-mobile.svg" alt="" width={100.08} height={41.9698} />
          </LeadButton>
        </header>
        <div className={styles.questions}>
          {t.items.map((item, index) => (
            <details className={styles.question} key={item.id} open={index === 0}>
              <summary>
                <span>{item.question}</span>
                <span className={styles.icons} aria-hidden="true">
                  <Image className={styles.openDesktop} src="/school/contacts/faq-open.svg" alt="" width={40.0039} height={40.0039} />
                  <Image className={styles.closeDesktop} src="/school/contacts/faq-close.svg" alt="" width={40.0039} height={40.0039} />
                  <Image className={styles.openMobile} src="/school/contacts/faq-open-mobile.svg" alt="" width={20.002} height={20.002} />
                  <Image className={styles.closeMobile} src="/school/contacts/faq-close-mobile.svg" alt="" width={20.002} height={20.002} />
                </span>
              </summary>
              <div className={styles.answer}>
                <p>{item.answer}</p>
                {item.action && (
                  <LeadButton className={styles.action}>
                    {t.action}{" "}<span aria-hidden="true">→</span>
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
