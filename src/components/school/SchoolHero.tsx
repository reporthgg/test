/* eslint-disable @next/next/no-img-element -- Оригинальные SVG и адаптивные изображения из Figma. */

import type { ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import type { PageOverride } from "@/lib/page-content";
import { LeadButton } from "@/components/landing/LandingForms";
import { schoolPageContent } from "./school-page-content";
import styles from "./SchoolHero.module.css";

export default function SchoolHero({
  locale,
  overrides,
}: {
  locale: Locale;
  overrides: PageOverride;
}): ReactElement {
  const t = schoolPageContent[locale];

  return (
    <section className={styles.hero} aria-labelledby="school-title" data-locale={locale}>
      <img className={styles.line} src="/school/hero/line.svg" alt="" />
      <div className={`landing-container ${styles.row}`}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>{overrides.heroEyebrow ?? t.eyebrow}</p>
          <h1 className={styles.title} id="school-title">
            {overrides.heroTitle ?? (
              <>
                <span>{t.heading[0]}</span>
                <span>{t.heading[1]}</span>
                <span>{t.heading[2]}<strong>{t.heading[3]}</strong></span>
              </>
            )}
          </h1>
          <p className={styles.description}>{overrides.heroSubtitle ?? t.description}</p>
          <div className={styles.actions}>
            <LeadButton kind="trial" className={styles.primary}>{t.trial}</LeadButton>
            <a className={styles.secondary} href="#school-tests">{t.levelTest}</a>
          </div>
          <ul className={styles.benefits}>
            {[t.smallGroups, t.format].map((label, index) => (
              <li key={label}>
                <span className={styles.benefitIcon}>
                  <img src={`/school/hero/benefit-${index + 1}.svg`} alt="" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.collage}>
          {[1, 2, 3].map((number, index) => (
            <picture className={styles[`photo${number}`]} key={number}>
              <source media="(max-width: 767px)" srcSet={`/school/hero/photo-${number}-mobile.png`} />
              <img
                src={`/school/hero/photo-${number}.png`}
                alt={t.photoAlts[index]}
                width={number === 1 ? 270 : 266}
                height={number === 1 ? 470 : number === 2 ? 330 : 230}
                fetchPriority={number === 1 ? "high" : undefined}
              />
            </picture>
          ))}
          <span className={styles.pennant}><img src="/school/hero/pennant.svg" alt="" /></span>
          <span className={styles.halfCircle}><img src="/school/hero/half-circle.svg" alt="" /></span>
          <span className={styles.speech} lang="en">Let’s talk!</span>
          <span className={styles.level}><span>A1</span><span aria-hidden="true">→</span>C1</span>
        </div>
      </div>
    </section>
  );
}

export function SchoolTrust({ locale }: { locale: Locale }): ReactElement {
  const t = schoolPageContent[locale];

  return (
    <section className={styles.trust} aria-label={t.partners}>
      <div className={`landing-container ${styles.trustRow}`}>
        <div className={styles.since}>
          <p>{t.since}<br /><span>{t.year}</span></p>
          <img src="/school/trust/star.svg" alt="" />
        </div>
        <div className={styles.students}><strong>15 000+</strong><span>{t.students}</span></div>
        <div className={styles.british}>
          <div className={styles.partnerLogo}>
            <span className={styles.britishCrop}><img src="/school/trust/british-council.png" alt="British Council" /></span>
            <span className={styles.flower}><img src="/school/trust/flower.svg" alt="" /></span>
          </div>
          <p><strong>British Council</strong><span>IELTS registration partner</span></p>
        </div>
        <div className={styles.quality}>
          <div className={styles.partnerLogo}>
            <span className={styles.qualityCrop}><img src="/school/trust/quality-english.png" alt="Quality English" /></span>
          </div>
          <p><strong>Quality English</strong><span>Associate School</span></p>
        </div>
      </div>
    </section>
  );
}
