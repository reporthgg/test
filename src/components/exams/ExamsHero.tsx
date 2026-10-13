import Image from "next/image";
import type { CSSProperties, ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import type { PageOverride } from "@/lib/page-content";
import {
  amirMobileBorder,
  examsHeroContent,
  portraitBorder,
  studentMobileBorder,
  universityBorder,
  type BorderPatch,
} from "./exams-hero-content";
import styles from "./ExamsHero.module.css";

function Border({ patches, mask, mobile = false }: { patches: readonly BorderPatch[]; mask: string; mobile?: boolean }): ReactElement {
  const length = (value: number): string => (mobile ? `${value}px` : `calc(${value} * var(--u))`);
  return (
    <span className={styles.border} style={{ maskImage: `url("${mask}")` }}>
      {patches.map(([color, left, top, width, height], index) => (
        <span
          key={index}
          style={{
            left: length(left),
            top: length(top),
            width: length(width),
            height: length(height),
            backgroundColor: `var(--frame-${color})`,
          } as CSSProperties}
        />
      ))}
    </span>
  );
}

function Photo({ src, sizes, className }: { src: string; sizes: string; className?: string }): ReactElement {
  return (
    <span className={`${styles.media} ${className ?? ""}`}>
      <span className={styles.crop}>
        <Image src={src} alt="" fill sizes={sizes} className={styles.image} />
      </span>
    </span>
  );
}

function Score({ value, className }: { value: string; className: string }): ReactElement {
  return (
    <>
      <span className={`${styles.score} ${className}`}>{value}</span>
      <span className={`${styles.ielts} ${className}`}>
        <Image src="/exams/hero/ielts-badge.svg" alt="" width={114.465} height={34.812} />
      </span>
    </>
  );
}

function Ribbon({ className }: { className: string }): ReactElement {
  return (
    <>
      <Image className={`${styles.ribbon} ${className}`} src="/camps/hero/desktop-badge.svg" alt="" width={68.5857} height={116.059} />
      <span className={`${styles.brand} ${className}`}>
        <Image src="/camps/hero/brand-mark.png" alt="" width={4096} height={4096} sizes="104px" />
      </span>
    </>
  );
}

export function ExamsHero({ locale, overrides }: { locale: Locale; overrides: PageOverride }): ReactElement {
  const t = examsHeroContent[locale];
  const customTitle = overrides.heroTitle;

  return (
    <section className={styles.hero} aria-labelledby="exams-hero-title" data-locale={locale}>
      <span className={styles.scribble} aria-hidden="true" />
      <div className={`landing-container ${styles.stage}`}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>{overrides.heroEyebrow ?? t.eyebrow}</p>
          <div className={styles.heading} data-custom={customTitle || overrides.heroSubtitle ? "true" : undefined}>
            <h1 className={styles.title} id="exams-hero-title">
              {customTitle ?? (
                <>
                  <span>{t.title[0]}</span> <span>{t.title[1]}</span>
                </>
              )}
            </h1>
            <p className={styles.description}>{overrides.heroSubtitle ?? t.description}</p>
          </div>
          <a className={styles.cta} href="#tests">{t.cta}</a>
          <div className={styles.visual} aria-hidden="true">
            <div className={styles.desktopPhotos}>
              <div className={`${styles.photo} ${styles.student}`}>
                <div className={`${styles.frame} ${styles.portrait} ${styles.studentFrame}`}>
                  <Photo src="/exams/hero/student.jpg" sizes="(max-width: 1199px) 40vw, 430px" className={styles.studentMedia} />
                  <Border patches={portraitBorder} mask="/camps/hero/desktop-portrait-mask.svg" />
                  <Ribbon className={styles.studentRibbon} />
                  <Score value="7.5" className={styles.studentScore} />
                </div>
              </div>
              <div className={`${styles.photo} ${styles.university}`}>
                <div className={`${styles.frame} ${styles.universityFrame}`}>
                  <Photo src="/exams/hero/university.jpg" sizes="(max-width: 1199px) 50vw, 590px" />
                  <Border patches={universityBorder} mask="/exams/hero/university-mask.svg" />
                </div>
              </div>
              <div className={`${styles.photo} ${styles.amir}`}>
                <div className={`${styles.frame} ${styles.portrait} ${styles.amirFrame}`}>
                  <Photo src="/exams/hero/amir.jpg" sizes="(max-width: 1199px) 42vw, 446px" className={styles.amirMedia} />
                  <Border patches={portraitBorder} mask="/camps/hero/desktop-portrait-mask.svg" />
                  <Score value="8.0" className={styles.amirScore} />
                </div>
              </div>
            </div>
            <div className={styles.mobilePhotos}>
              <div className={`${styles.photo} ${styles.studentMobile}`}>
                <div className={`${styles.frame} ${styles.studentMobileFrame}`}>
                  <Photo src="/exams/hero/student.jpg" sizes="171px" />
                  <Ribbon className={styles.studentMobileRibbon} />
                  <Border patches={studentMobileBorder} mask="/exams/hero/student-mask-mobile.svg" mobile />
                  <Score value="7.5" className={styles.studentMobileScore} />
                </div>
              </div>
              <div className={`${styles.photo} ${styles.amirMobile}`}>
                <div className={`${styles.frame} ${styles.amirMobileFrame}`}>
                  <Photo src="/exams/hero/amir.jpg" sizes="182px" />
                  <Ribbon className={styles.amirMobileRibbon} />
                  <Border patches={amirMobileBorder} mask="/exams/hero/amir-mask-mobile.svg" mobile />
                  <Score value="8.0" className={styles.amirMobileScore} />
                </div>
              </div>
            </div>
          </div>
          <span className={styles.srOnly}>{t.photos}</span>
        </div>
      </div>
      <div className={styles.trust}>
        <ul className={`landing-container ${styles.trustList}`} aria-label={t.trust}>
          <li className={styles.icef}>
            <span className={styles.logoCard}>
              <Image src="/landing/hero/icef.png" alt="ICEF" width={108} height={36} />
            </span>
          </li>
          <li className={styles.ets}>
            <span className={styles.logoCard}>
              <Image src="/exams/hero/ets.png" alt="ETS" width={74} height={50} />
            </span>
          </li>
          <li className={styles.britishCouncil}>
            <span className={styles.logoCard}>
              <span className={styles.flower}>
                <Image src="/camps/tour/flower.svg" alt="" width={45} height={45} />
              </span>
              <span className={styles.britishCrop}>
                <Image src="/school/trust/british-council.png" alt="" width={690} height={362} sizes="166px" />
              </span>
            </span>
            <p><strong>British Council</strong><span lang="en">{t.britishCouncilCaption}</span></p>
          </li>
          <li className={styles.average}>
            <span className={`${styles.logoCard} ${styles.ieltsCard}`}>
              <Image src="/exams/hero/ielts.svg" alt="IELTS" width={68} height={21} />
            </span>
            <p><strong>{t.average}</strong><span>{t.averageCaption}</span></p>
          </li>
        </ul>
      </div>
    </section>
  );
}
