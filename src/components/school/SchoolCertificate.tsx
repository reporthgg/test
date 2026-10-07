/* eslint-disable @next/next/no-img-element -- Иконки Figma сохраняют исходные размеры. */

import Image from "next/image";
import type { ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { schoolPageContent } from "./school-page-content";
import styles from "./SchoolCertificate.module.css";

export default function SchoolCertificate({ locale }: { locale: Locale }): ReactElement {
  const t = schoolPageContent[locale];

  return (
    <section className={styles.section} aria-labelledby="school-certificate-title">
      <div className={`landing-container ${styles.layout}`}>
        <header className={styles.heading}>
          <h2 className="landing-title" id="school-certificate-title">
            {t.certificateTitle}<br />{t.certificateResult} <em>{t.certificateAccent}</em>
          </h2>
          <p>{t.certificateDescription}</p>
        </header>
        <div className={styles.illustration}>
          <Image
            src="/school/certificate/illustration.png"
            alt={t.certificateAlt}
            width={600}
            height={560}
            sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1200px) 46vw, 600px"
          />
        </div>
        <div className={styles.scale}>
          <p>{t.cefr}</p>
          <ol>
            {["A1", "A2", "B1", "B2", "C1", "C2"].map((level) => (
              <li key={level} data-level={level}>{level}</li>
            ))}
          </ol>
        </div>
        <ol className={styles.steps}>
          {t.certificateSteps.map((label, index) => (
            <li key={label}>
              <img src={`/school/certificate/step-${index + 1}.svg`} alt="" />
              <span>{label}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
