import Image from "next/image";
import type { ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import type { PageOverride } from "@/lib/page-content";
import { getAboutDict } from "@/i18n/pages/about";
import { LeadButton } from "@/components/landing/LandingForms";
import { aboutContent } from "./about-content";
import styles from "./AboutHero.module.css";

const statTones = ["yellow", "blue", "light", "pink"] as const;

export function AboutHero({ locale, overrides }: { locale: Locale; overrides: PageOverride }): ReactElement {
  const t = getAboutDict(locale);
  const c = aboutContent[locale];

  return (
    <div className={styles.wrap} data-locale={locale}>
      <section className={styles.hero} aria-labelledby="about-title">
        <span className={styles.line} aria-hidden="true">
          <Image src="/landing/hero/yellow-line.svg" alt="" width={1276.5} height={793.948} />
        </span>
        <div className={`landing-container ${styles.row}`}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>{overrides.heroEyebrow ?? t.hero.eyebrow}</p>
            <h1 className={styles.title} id="about-title">
              {overrides.heroTitle ?? (
                <>
                  {c.heading.lines.map((line) => (
                    <span key={line}>{line} </span>
                  ))}
                  <span>
                    <strong>{c.heading.accent}</strong>
                    {c.heading.after ? ` ${c.heading.after}` : null}
                  </span>
                </>
              )}
            </h1>
            <p className={styles.description}>{overrides.heroSubtitle ?? t.hero.text}</p>
            <div className={styles.actions}>
              <LeadButton className={styles.primary}>
                {t.cta.button}
                <Image className={styles.primaryArrow} src="/abroad/hero/arrow.svg" alt="" width={20} height={20} />
              </LeadButton>
              <a className={styles.secondary} href="#journey">{t.hero.cta}</a>
            </div>
          </div>
          <div className={styles.collage}>
            <div className={styles.board}>
              <Image
                className={styles.arch}
                src="/school/hero/photo-2.png"
                alt={c.photoAlts.studying}
                width={532}
                height={660}
                sizes="(max-width: 767px) 45vw, 250px"
                loading="eager"
                fetchPriority="high"
              />
              <Image className={styles.pennant} src="/school/hero/pennant.svg" alt="" width={44} height={70} />
              <Image
                className={styles.lawn}
                src="/abroad/hero/lawn.png"
                alt={c.photoAlts.campus}
                width={577}
                height={614}
                sizes="(max-width: 767px) 52vw, 294px"
                loading="eager"
              />
              <span className={styles.portrait}>
                <Image
                  src="/exams/hero/student.jpg"
                  alt={c.photoAlts.student}
                  width={858}
                  height={1317}
                  sizes="(max-width: 767px) 52vw, 274px"
                />
              </span>
              <Image
                className={styles.tape}
                src="/landing/programs/gsc-sticker.png"
                alt=""
                width={4096}
                height={2731}
                sizes="(max-width: 767px) 90px, 160px"
              />
              <Image
                className={styles.keys}
                src="/school/test-sticker.png"
                alt=""
                width={4096}
                height={4096}
                sizes="(max-width: 767px) 80px, 150px"
              />
            </div>
          </div>
        </div>
      </section>
      <section className={styles.trust} aria-label={c.stats}>
        <ul className={`landing-container ${styles.stats}`}>
          {t.stats.map((stat, index) => (
            <li className={`${styles.stat} ${styles[statTones[index % statTones.length]]}`} key={stat.label}>
              <strong>{stat.value}</strong>
              <span>
                {stat.label}
                {stat.sub ? <small>{stat.sub}</small> : null}
              </span>
              {index === 0 ? <Image className={styles.star} src="/school/trust/star.svg" alt="" width={60} height={60} /> : null}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
