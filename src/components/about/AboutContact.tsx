import Image from "next/image";
import type { ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { getAboutDict } from "@/i18n/pages/about";
import { LandingOffices } from "@/components/landing/LandingContacts";
import { LeadButton } from "@/components/landing/LandingForms";
import { aboutContent, splitTitle } from "./about-content";
import styles from "./AboutContact.module.css";

export function AboutCenters({ locale }: { locale: Locale }): ReactElement {
  return (
    <div className={styles.centers}>
      <LandingOffices locale={locale} />
    </div>
  );
}

export function AboutCta({ locale }: { locale: Locale }): ReactElement {
  const t = getAboutDict(locale);
  const c = aboutContent[locale];
  const [first, rest] = splitTitle(t.cta.title);

  return (
    <section className={styles.cta} aria-labelledby="about-cta-title">
      <span className={styles.line} aria-hidden="true">
        <Image src="/landing/hero/yellow-line.svg" alt="" width={1276.5} height={793.948} />
      </span>
      <div className={`landing-container ${styles.layout}`}>
        <div className={styles.copy}>
          <h2 className={`landing-title ${styles.title}`} id="about-cta-title">
            <span>{first}</span> <em>{rest}</em>
          </h2>
          <p className={styles.text}>{t.cta.text}</p>
          <Image className={styles.hashtag} src="/landing/contacts/hashtag.svg" alt="" width={100.012} height={109.966} />
        </div>
        <div className={styles.visual}>
          <Image
            className={styles.photo}
            src="/abroad/hero/students.png"
            alt={c.photoAlts.students}
            width={577}
            height={614}
            sizes="(max-width: 767px) 70vw, 420px"
          />
          <LeadButton className={styles.sticker}>
            <span className={styles.stickerLabel}>{t.cta.button}</span>
            <Image className={styles.stickerArrow} src="/landing/programs/consultation-arrow.svg" alt="" width={155} height={65} />
          </LeadButton>
        </div>
      </div>
    </section>
  );
}
