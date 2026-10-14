import Image from "next/image";
import type { ReactElement } from "react";
import { LeadButton } from "@/components/landing/LandingForms";
import type { Locale } from "@/i18n/config";
import { examsChoiceContent } from "./exams-sections-content";
import styles from "./ExamsChoice.module.css";

const logos = {
  ielts: { width: 92.39, height: 28.0984 },
  sat: { width: 72.2653, height: 48.1769 },
} as const;

export function ExamsChoice({ locale }: { locale: Locale }): ReactElement {
  const t = examsChoiceContent[locale];

  return (
    <section className={styles.choice} id="exam-choice" aria-labelledby="exams-choice-title">
      <div className="landing-container">
        <div className={styles.head}>
          <h2 id="exams-choice-title" className={`landing-title ${styles.title}`}>{t.title}</h2>
          <div className={styles.aside}>
            <p className={styles.text}>
              <span>{t.text[0]}</span> <span>{t.text[1]}</span>
            </p>
            <LeadButton className={styles.cta}>{t.cta}</LeadButton>
          </div>
        </div>
        <ul className={styles.cards}>
          {t.cards.map((card) => (
            <li className={`${styles.card} ${styles[card.id]}`} key={card.id}>
              <h3 className={styles.logo}>
                <span className={styles.mark}>
                  <picture>
                    <source media="(max-width: 767px)" srcSet={`/exams/choice/${card.id}-mobile.svg`} />
                    <Image
                      src={`/exams/choice/${card.id}.svg`}
                      alt={card.logo}
                      width={logos[card.id].width}
                      height={logos[card.id].height}
                    />
                  </picture>
                </span>
              </h3>
              <Image
                className={styles.flag}
                src={`/exams/choice/flag-${card.id}.svg`}
                alt=""
                width={45}
                height={71.4257}
              />
              <ul className={styles.chips}>
                {card.chips.map((chip) => <li key={chip}>{chip}</li>)}
              </ul>
              <p className={styles.description}>{card.text}</p>
              <LeadButton className={`${styles.action} tap-target`} course={card.course}>
                <span>
                  {t.action}
                  <span className="sr-only">{`: ${card.course}`}</span>
                </span>
                <Image src="/exams/choice/arrow.svg" alt="" width={24} height={24} />
              </LeadButton>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
