/* eslint-disable @next/next/no-img-element -- Figma SVG decorations keep their intrinsic dimensions. */

import Image from "next/image";
import type { ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";
import { campsTourContent, getTourCountdown, tourDates } from "./tour-faq-content";
import styles from "./CampsTour.module.css";

export function CampsTour({ locale }: { locale: Locale }): ReactElement {
  const t = campsTourContent[locale];
  // Страница рендерится на каждый запрос, поэтому отсчёт идёт от текущей даты.
  const countdown = getTourCountdown(locale, new Date());
  const whatsappHref = `${site.whatsapp.link}?text=${encodeURIComponent(t.whatsappMessage)}`;

  return (
    <section className={styles.tour} id="tour" aria-labelledby="camps-tour-title">
      <Image
        className={styles.photo}
        src="/camps/tour/shanghai.jpg"
        alt={t.photoAlt}
        width={2714}
        height={1859}
        sizes="(max-width: 767px) 948px, 100vw"
      />
      <span className={styles.sky} aria-hidden="true" />
      <span className={styles.shade} aria-hidden="true">
        <span className={styles.blur} />
        <span className={styles.blur} />
      </span>
      <div className={`landing-container ${styles.content}`}>
        <p className={styles.dates}>
          <time dateTime={tourDates.start}>{t.dates[0]}</time>
          {" - "}
          <time dateTime={tourDates.end}>{t.dates[1]}</time>
        </p>
        <h2 className={`landing-title ${styles.title}`} id="camps-tour-title">
          <span>{t.title[0]}</span> <span>{t.title[1]}</span>
        </h2>
        <p className={styles.text}>
          <span>{t.text[0]}</span> <span>{t.text[1]}</span>
        </p>
        {countdown && (
          <p className={styles.countdown}>
            <img className={styles.star} src="/landing/hero/star.svg" alt="" width={60} height={60} />
            <span>{countdown}</span>
            <img className={styles.flower} src="/camps/tour/flower.svg" alt="" width={45} height={45} />
          </p>
        )}
        <a
          className={styles.button}
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.buttonLabel}
        >
          <img src="/camps/tour/whatsapp.svg" alt="" width={30.3131} height={30.3131} />
          <span>{t.button}</span>
        </a>
      </div>
    </section>
  );
}
