/* eslint-disable @next/next/no-img-element -- Preserve the original Figma SVG dimensions. */

import Image from "next/image";
import type { ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import {
  bookingSteps,
  careItems,
  experienceContent,
  includedItems,
  scheduleItems,
} from "./experience-content";
import styles from "./CampsExperience.module.css";

const assetPath = "/camps/experience";
const carePhotos = [
  { desktop: "camp-carnival.png", mobile: "students-mobile.png" },
  { desktop: "disneyland-memory.png", mobile: "city-mobile.png" },
  { desktop: "camp-student-story.png", mobile: "paris-mobile.png" },
] as const;

export function CampsIncluded({ locale }: { locale: Locale }): ReactElement {
  const t = experienceContent[locale];

  return (
    <section className={styles.included} id="included" aria-labelledby="camps-included-title">
      <div className="landing-container">
        <div className={styles.includedHeader}>
          <h2 id="camps-included-title" className={styles.includedTitle}>
            <span>{t.holidays}</span>
            <strong>all inclusive</strong>
          </h2>
          <p className={styles.includedIntro}>{t.includedIntro}</p>
        </div>
        <ul className={styles.includedGrid}>
          {includedItems.map((item) => (
            <li className={styles.includedCard} key={item.id}>
              <picture className={styles.includedIllustration}>
                <source media="(max-width: 767px)" srcSet={`${assetPath}/${item.id}-mobile.png`} />
                <Image
                  src={`${assetPath}/${item.id}.png`}
                  alt=""
                  width={106}
                  height={67}
                  unoptimized
                />
              </picture>
              <div>
                <h3>{item.title[locale]}</h3>
                <p>{item.description[locale]}</p>
              </div>
            </li>
          ))}
        </ul>
        <a href="#consult" className={styles.estimateButton}>
          <span>{t.estimate.map((line) => <span key={line}>{line}</span>)}</span>
          <img src="/landing/programs/consultation-arrow.svg" alt="" width={155} height={65.0009} />
        </a>
      </div>
      <div className={styles.beyondSticker} aria-hidden="true">
        <Image
          src="/landing/stories/think-beyond-sticker.png"
          alt=""
          width={262}
          height={270}
          sizes="262px"
        />
      </div>
      <Image
        className={styles.includedMobileSticker}
        src="/landing/stories/results-sticker.png"
        alt=""
        width={130}
        height={130}
        sizes="130px"
      />
    </section>
  );
}

export function CampsSchedule({ locale }: { locale: Locale }): ReactElement {
  const t = experienceContent[locale];

  return (
    <section className={styles.schedule} id="schedule" aria-labelledby="camps-schedule-title">
      <h2 id="camps-schedule-title" className={`landing-title ${styles.scheduleTitle}`}>
        {t.scheduleTitle[0]} <span>{t.scheduleTitle[1]}</span>
      </h2>
      <ol className={styles.scheduleList}>
        {scheduleItems.map((item) => (
          <li className={`${styles.scheduleRow} ${styles[item.id]}`} key={item.id}>
            <div className={`landing-container ${styles.scheduleInner}`}>
              {item.notch && (
                <span className={styles.scheduleNotch} aria-hidden="true">
                  <img
                    className={styles.desktopAsset}
                    src={`${assetPath}/notch-${item.notch}.svg`}
                    alt=""
                    width={34}
                    height={15.3431}
                  />
                  <img
                    className={styles.mobileAsset}
                    src={`${assetPath}/notch-${item.notch}-mobile.svg`}
                    alt=""
                    width={28}
                    height={12.3431}
                  />
                </span>
              )}
              <span className={styles.scheduleIcon} aria-hidden="true">
                <img
                  className={styles.desktopAsset}
                  src={`${assetPath}/schedule-${item.id}.svg`}
                  alt=""
                  width={item.id === "bedtime" ? 96 : 100}
                  height={item.id === "bedtime" ? 96 : 100}
                />
                <img
                  className={styles.mobileAsset}
                  src={`${assetPath}/schedule-${item.id}-mobile.svg`}
                  alt=""
                  width={item.id === "bedtime" ? 38.4 : 40}
                  height={item.id === "bedtime" ? 38.4 : 40}
                />
              </span>
              <div className={styles.scheduleCopy}>
                <div className={styles.scheduleHeading}>
                  <h3>
                    {item.mobileTitle ? (
                      <>
                        <span className={styles.desktopAsset}>{item.title[locale]}</span>
                        <span className={styles.mobileAsset}>{item.mobileTitle[locale]}</span>
                      </>
                    ) : item.title[locale]}
                  </h3>
                  <span className={styles.mobileTime}>
                    <span className={styles.timeDivider} aria-hidden="true">
                      <img
                        src={`${assetPath}/time-divider-${item.id === "bedtime" ? "dark" : "white"}.svg`}
                        alt=""
                        width={18}
                        height={2}
                      />
                    </span>
                    {item.time}
                  </span>
                </div>
                <p>{item.description[locale]}</p>
              </div>
              <span className={styles.desktopTime}>{item.time}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CampsCare({ locale }: { locale: Locale }): ReactElement {
  const t = experienceContent[locale];

  return (
    <section className={styles.care} id="care" aria-labelledby="camps-care-title">
      <div className="landing-container">
        <h2 id="camps-care-title" className={`landing-title ${styles.careTitle}`}>
          {t.careTitle.map((line) => <span key={line}>{line}</span>)}
        </h2>
        <ol className={styles.careGrid}>
          {careItems.map((item, index) => (
            <li key={item.color} className={styles.carePoint}>
              <span className={styles.careNumber} aria-hidden="true">
                <img src={`${assetPath}/marker-${item.color}.svg`} alt="" width={18} height={26} />
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{item.title[locale]}</h3>
              <p>{item.description[locale]}</p>
            </li>
          ))}
        </ol>
        <div className={styles.carePhotos}>
          {carePhotos.map((photo, index) => (
            <figure className={styles.carePhoto} key={photo.desktop}>
              <Image
                className={styles.photoDesktop}
                src={`${assetPath}/${photo.desktop}`}
                alt={t.photos[index]}
                fill
                sizes="(max-width: 767px) 1px, (max-width: 1304px) 30vw, 397px"
              />
              <Image
                className={styles.photoMobile}
                src={`${assetPath}/${photo.mobile}`}
                alt={t.mobilePhotos[index]}
                fill
                sizes="(max-width: 767px) calc((100vw - 44px) / 2), 1px"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CampsSteps({ locale }: { locale: Locale }): ReactElement {
  const t = experienceContent[locale];

  return (
    <section className={styles.steps} id="booking-steps" aria-labelledby="camps-steps-title">
      <div className={`landing-container ${styles.stepsPanel}`}>
        <h2 id="camps-steps-title" className={`landing-title ${styles.stepsTitle}`}>
          <span>{t.stepsTitle[0]}</span>
          <strong>{t.stepsTitle[1]}</strong>
        </h2>
        <ol className={styles.stepsGrid}>
          {bookingSteps.map((step, index) => (
            <li className={styles.stepCard} key={index}>
              <span className={styles.stepNumber} aria-hidden="true">{index + 1}</span>
              <div>
                <h3>{step.title[locale]}</h3>
                <p>{step.description[locale]}</p>
              </div>
            </li>
          ))}
          <li className={styles.planCell}>
            <a href="#consult" className={styles.planButton}>
              <span>{t.plan}</span>
              <img className={styles.desktopAsset} src={`${assetPath}/plan-arrow.svg`} alt="" width={33.9961} height={33.9961} />
              <img className={styles.mobileAsset} src={`${assetPath}/plan-arrow-mobile.svg`} alt="" width={20} height={20} />
            </a>
          </li>
        </ol>
      </div>
      <Image
        className={styles.keysSticker}
        src="/landing/forms/sticker-pink.png"
        alt=""
        width={275}
        height={275}
        sizes="(max-width: 767px) 173px, 275px"
      />
    </section>
  );
}
