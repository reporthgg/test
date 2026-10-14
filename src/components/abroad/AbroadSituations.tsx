import Image from "next/image";
import type { ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { LeadButton } from "@/components/landing/LandingForms";
import { abroadSituationsContent } from "./abroad-sections-content";
import type { SituationIcon, SituationTone } from "./abroad-sections-content";
import styles from "./AbroadSituations.module.css";

const icons: Record<SituationIcon, { desktop: string; mobile: string; width: number; height: number }> = {
  book: { desktop: "/abroad/situations/book.svg", mobile: "/abroad/situations/book-mobile.svg", width: 36, height: 36 },
  notebook: { desktop: "/abroad/situations/notebook.svg", mobile: "/abroad/situations/notebook-mobile.svg", width: 40, height: 40 },
  rocket: { desktop: "/landing/programs/rocket.svg", mobile: "/landing/programs/rocket-mobile.svg", width: 40, height: 40 },
  close: { desktop: "/abroad/situations/close.svg", mobile: "/abroad/situations/close-mobile.svg", width: 36, height: 36 },
};

const arrows: Record<SituationTone, { desktop: string; mobile: string }> = {
  light: { desktop: "blue", mobile: "blue" },
  green: { desktop: "white", mobile: "white" },
  yellow: { desktop: "white", mobile: "cream" },
};

export function AbroadSituations({ locale }: { locale: Locale }): ReactElement {
  const t = abroadSituationsContent[locale];

  return (
    <section className={styles.situations} aria-labelledby="abroad-situations-title">
      <div className={`landing-container ${styles.inner}`}>
        <header className={styles.header}>
          <h2 className={`landing-title ${styles.title}`} id="abroad-situations-title">{t.title}</h2>
          <p className={styles.intro}>{t.intro}</p>
        </header>
        <ul className={styles.grid}>
          {t.cards.map((card) => {
            const icon = icons[card.icon];
            const arrow = arrows[card.tone];
            return (
              <li key={card.id} className={`${styles.card} ${styles[card.tone]}`} data-situation={card.id}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <span className={styles.icon} aria-hidden="true">
                  <picture>
                    <source media="(max-width: 767px)" srcSet={icon.mobile} />
                    <Image src={icon.desktop} alt="" width={icon.width} height={icon.height} />
                  </picture>
                </span>
                <LeadButton className={`${styles.link} tap-target`}>
                  <span>{card.cta}</span>
                  <picture>
                    <source media="(max-width: 767px)" srcSet={`/landing/programs/wave-arrow-${arrow.mobile}-mobile.svg`} />
                    <Image src={`/landing/programs/wave-arrow-${arrow.desktop}.svg`} alt="" width={55} height={15} />
                  </picture>
                </LeadButton>
              </li>
            );
          })}
        </ul>
        <span className={styles.sticker} aria-hidden="true">
          <Image src="/landing/programs/pink-sticker.png" alt="" width={220} height={220} sizes="(max-width: 767px) 149px, 220px" />
        </span>
      </div>
    </section>
  );
}
