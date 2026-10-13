import Image from "next/image";
import type { ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { getAboutDict } from "@/i18n/pages/about";
import { aboutContent, splitTitle } from "./about-content";
import styles from "./AboutValues.module.css";

const tones = ["light", "blue", "green", "yellow"] as const;

const partners = [
  { src: "/brand/icef.png", width: 264, height: 320, name: "ICEF Accredited", caption: "Trusted Agency #1478", logo: "icef" },
  { src: "/brand/bc-ielts.png", width: 900, height: 241, name: "British Council", caption: "IELTS Registration Centre", logo: "british" },
  { src: "/school/trust/quality-english.png", width: 288, height: 146, name: "Quality English", caption: "Associate School", logo: "quality" },
] as const;

export function AboutValues({ locale }: { locale: Locale }): ReactElement {
  const t = getAboutDict(locale);
  const [first, rest] = splitTitle(t.values.title);

  return (
    <section className={styles.values} aria-labelledby="about-values-title">
      <div className={`landing-container ${styles.inner}`}>
        <header className={styles.header}>
          <h2 className={`landing-title ${styles.title}`} id="about-values-title">
            {first} <em>{rest}</em>
          </h2>
          <p className={styles.intro}>{t.values.subtitle}</p>
        </header>
        <div className={styles.board}>
          <ul className={styles.grid}>
            {t.values.items.map((item, index) => (
              <li className={`${styles.card} ${styles[tones[index % tones.length]]}`} key={item.title}>
                <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
          <Image
            className={styles.sticker}
            src="/school/results/pink-sticker.png"
            alt=""
            width={4096}
            height={4096}
            sizes="(max-width: 767px) 130px, 210px"
          />
        </div>
      </div>
    </section>
  );
}

export function AboutPartners({ locale }: { locale: Locale }): ReactElement {
  const t = getAboutDict(locale);
  const c = aboutContent[locale];
  const [first, rest] = splitTitle(t.partners.title);

  return (
    <section className={styles.partners} aria-labelledby="about-partners-title">
      <div className={`landing-container ${styles.partnersRow}`}>
        <header className={styles.partnersHeader}>
          <h2 className={`landing-title ${styles.partnersTitle}`} id="about-partners-title">
            <span>{first}</span> <em>{rest}</em>
          </h2>
          <p>{t.partners.text}</p>
        </header>
        <ul className={styles.logos} aria-label={c.partnersList}>
          {partners.map((partner) => (
            <li className={styles.partner} key={partner.name}>
              <span className={styles.logo} data-logo={partner.logo}>
                <Image src={partner.src} alt="" width={partner.width} height={partner.height} sizes="220px" />
              </span>
              <p>
                <strong>{partner.name}</strong>
                <span>{partner.caption}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
