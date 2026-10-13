import Image, { getImageProps } from "next/image";
import type { ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import type { PageOverride } from "@/lib/page-content";
import { LeadButton } from "@/components/landing/LandingForms";
import { abroadHeroContent, abroadHeroPhotos } from "./abroad-hero-content";
import type { AbroadHeroPhoto } from "./abroad-hero-content";
import styles from "./AbroadHero.module.css";

function HeroPhoto({ photo, alt, first }: { photo: AbroadHeroPhoto; alt: string; first: boolean }): ReactElement {
  const common = { alt, loading: "eager" as const, fetchPriority: first ? ("high" as const) : undefined };
  const desktop = getImageProps({ ...common, src: photo.desktop.src, width: 289, height: 307 }).props;
  const mobileHeight = Math.round((171 * photo.mobile.height) / photo.mobile.width);
  const mobile = getImageProps({ ...common, src: photo.mobile.src, width: 171, height: mobileHeight }).props;

  return (
    <picture className={styles.photo} data-photo={photo.id}>
      <source media="(max-width: 767px)" srcSet={mobile.srcSet} width={171} height={mobileHeight} />
      <img {...desktop} alt={alt} />
    </picture>
  );
}

export function AbroadHero({ locale, overrides }: { locale: Locale; overrides: PageOverride }): ReactElement {
  const t = abroadHeroContent[locale];

  return (
    <div className={styles.wrap} data-locale={locale}>
      <section className={styles.hero} aria-labelledby="abroad-title">
        <span className={styles.line} aria-hidden="true">
          <Image src="/landing/hero/yellow-line.svg" alt="" width={1275} height={794} />
        </span>
        <div className={`landing-container ${styles.content}`}>
          <p className={styles.eyebrow}>{overrides.heroEyebrow ?? t.eyebrow}</p>
          <div className={styles.head}>
            <h1 className={styles.title} id="abroad-title">
              {overrides.heroTitle ?? (
                <>
                  <span>{t.heading.first}</span>{" "}
                  <span>
                    {t.heading.before}
                    <strong>{t.heading.accent}</strong>
                    {t.heading.after}
                  </span>
                </>
              )}
            </h1>
            <p className={styles.description}>{overrides.heroSubtitle ?? t.description}</p>
          </div>
          <LeadButton className={styles.consult}>
            {t.consultation}
            <Image className={styles.consultArrow} src="/abroad/hero/arrow.svg" alt="" width={20} height={20} />
          </LeadButton>
          <div className={styles.collage}>
            {abroadHeroPhotos.map((photo, index) => (
              <HeroPhoto key={photo.id} photo={photo} alt={t.photoAlts[photo.id]} first={index === 0} />
            ))}
            <div className={styles.books} data-photo="books">
              <span className={styles.booksFrame}>
                <Image
                  className={styles.booksImage}
                  src="/abroad/hero/books.jpg"
                  alt={t.photoAlts.books}
                  width={290}
                  height={519}
                  loading="eager"
                />
              </span>
              <Image className={styles.halfCircle} src="/abroad/hero/half-circle.svg" alt="" width={78} height={34} />
            </div>
            <Image className={styles.pennant} src="/abroad/hero/pennant.svg" alt="" width={44} height={70} />
            <span className={styles.speech} lang="en" aria-hidden="true">Let’s talk!</span>
            <span className={styles.level} aria-hidden="true">
              <span>A1</span>
              <span>→</span>
              C1
            </span>
          </div>
        </div>
      </section>
      <section className={styles.trust} aria-label={t.trust}>
        <div className={`landing-container ${styles.trustRow}`}>
          <div className={styles.stats}>
            <div className={styles.since}>
              <p>
                {t.since[0]}
                <br />
                <span>{t.since[1]}</span>
              </p>
              <Image className={styles.sinceStar} src="/school/trust/star.svg" alt="" width={60} height={60} />
              <Image className={styles.sinceStarMobile} src="/landing/hero/mobile-star.svg" alt="" width={42} height={42} />
            </div>
            <p className={styles.students}>
              <strong>{"15 000+"}</strong>
              <span>{t.students}</span>
            </p>
          </div>
          <span className={styles.divider} aria-hidden="true" />
          <div className={styles.quality}>
            <span className={styles.partnerLogo}>
              <span className={styles.qualityCrop}>
                <Image src="/school/trust/quality-english.png" alt="Quality English" width={288} height={146} />
              </span>
            </span>
            <p>
              <strong>Quality English</strong>
              <span>Associate School</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
