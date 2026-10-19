/* eslint-disable @next/next/no-img-element -- SVG variants keep their original Figma dimensions. */

import Image from "next/image";
import type { ReactElement, ReactNode, Ref } from "react";
import type { Locale } from "@/i18n/config";
import { formsContent } from "@/components/landing/forms-content";
import styles from "./SchoolTrial.module.css";

type SchoolTrialCardProps = {
  locale: Locale;
  headingId: string;
  headingRef?: Ref<HTMLHeadingElement>;
  children: ReactNode;
};

export default function SchoolTrialCard({
  locale,
  headingId,
  headingRef,
  children,
}: SchoolTrialCardProps): ReactElement {
  const t = formsContent[locale];
  const offer = t.offers.school;
  return (
    <div className={styles.card}>
      <div className={styles.offer}>
        <img className={`${styles.flags} ${styles.desktopAsset}`} src="/landing/forms/school-flags-desktop.svg" alt="" />
        <img className={`${styles.flags} ${styles.mobileAsset}`} src="/landing/forms/flags.svg" alt="" />
        <div className={styles.offerText}>
          <p className={styles.badge}>{t.offerBadge}</p>
          <h2 id={headingId} ref={headingRef} tabIndex={headingRef ? -1 : undefined}>
            {offer.title.join(" ")}
          </h2>
          <p>{offer.description}</p>
        </div>
        <ul>
          {t.offerSteps.map((step) => (
            <li key={step}>
              <img className={styles.desktopAsset} src="/landing/forms/school-step-check-desktop.svg" alt="" />
              <img className={styles.mobileAsset} src="/landing/forms/step-check.svg" alt="" />
              <span>{step}</span>
            </li>
          ))}
        </ul>
        <Image
          className={styles.sticker}
          src="/landing/forms/sticker-blue.png"
          alt=""
          width={339}
          height={339}
          sizes="(max-width: 767px) 153px, 339px"
        />
      </div>
      <div className={styles.panel}>{children}</div>
    </div>
  );
}
