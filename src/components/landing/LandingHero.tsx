"use client";

import { useEffect, useEffectEvent, useRef, useState, useSyncExternalStore, type ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { withLocale, type Locale } from "@/i18n/config";
import { LandingLeadForm, LeadButton } from "@/components/landing/LandingForms";
import HeroPhotographs from "./HeroPhotographs";
import { heroContent } from "./hero-content";
import styles from "./LandingHero.module.css";

const slideIds = ["education", "english", "abroad"] as const;

function subscribeMotion(callback: () => void): () => void {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function LandingHero({ locale }: { locale: Locale }): ReactElement {
  const text = heroContent[locale];
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion, () => true);
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const slide = text.slides[current];
  const advance = useEffectEvent(() => setCurrent((index) => (index + 1) % slideIds.length));

  useEffect(() => {
    if (paused || hovered || focused || reducedMotion) return;
    const timer = window.setInterval(advance, 6500);
    return () => window.clearInterval(timer);
  }, [paused, hovered, focused, reducedMotion]);

  function goTo(index: number): void {
    setPaused(true);
    setCurrent((index + slideIds.length) % slideIds.length);
  }

  return (
    <section
      className={`${styles.hero} ${styles[slideIds[current]]}`}
      data-locale={locale}
      aria-label={text.carousel}
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className={styles.scribble} aria-hidden="true" />
      <div
        className={`landing-container ${styles.stage}`}
        onTouchStart={(event) => {
          const touch = event.touches[0];
          touchRef.current = { x: touch.clientX, y: touch.clientY };
        }}
        onTouchEnd={(event) => {
          const start = touchRef.current;
          touchRef.current = null;
          if (!start) return;
          const touch = event.changedTouches[0];
          const dx = touch.clientX - start.x;
          const dy = touch.clientY - start.y;
          if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            goTo(current + (dx < 0 ? 1 : -1));
          }
        }}
        onTouchCancel={() => { touchRef.current = null; }}
      >
        <div className={styles.copy} aria-live={paused ? "polite" : "off"}>
          <h1 className={styles.title}>
            <span>{slide.title}</span>
            <span className={styles.accent}>{slide.accent}</span>
          </h1>
          <div className={styles.hashtag} aria-hidden="true" />
          <p className={styles.description}>{slide.description}</p>
          {current === 0 ? (
            <LeadButton kind="diagnostic" className={styles.circleButton}>
              <span>{slide.primary}</span>
              <span className={styles.buttonLine} aria-hidden="true" />
            </LeadButton>
          ) : (
            <div className={styles.actions}>
              {current === 1 ? (
                <Link href={withLocale(locale, "/tests")} className="landing-button">{slide.primary}</Link>
              ) : (
                <LeadButton kind="diagnostic" className="landing-button">{slide.primary}</LeadButton>
              )}
              <LeadButton kind="diagnostic" className={`landing-button ${styles.secondary}`}>
                {slide.secondary}
              </LeadButton>
            </div>
          )}
        </div>
        <div className={styles.controls} aria-label={text.carousel}>
          <div className={styles.dots}>
            {slideIds.map((id, index) => (
              <button
                key={id}
                type="button"
                aria-label={`${text.slide} ${index + 1}`}
                aria-current={current === index ? "true" : undefined}
                onClick={() => goTo(index)}
              ><span /></button>
            ))}
          </div>
          <button
            type="button"
            className={styles.pause}
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? text.play : text.pause}
            title={paused ? text.play : text.pause}
            aria-pressed={paused}
          >
            <span className={paused ? styles.playGlyph : styles.pauseGlyph} aria-hidden="true" />
          </button>
          <button type="button" className={styles.previous} onClick={() => goTo(current - 1)} aria-label={text.previous}>
            <Image src="/landing/hero/chevron-left.svg" width={24} height={24} alt="" />
          </button>
          <button type="button" className={styles.next} onClick={() => goTo(current + 1)} aria-label={text.next}>
            <Image src="/landing/hero/chevron-right.svg" width={24} height={24} alt="" />
          </button>
        </div>
        <div className={styles.form} id="consult">
          <div className={styles.desktopForm}>
            <LandingLeadForm variant="white" source="hero-form" />
          </div>
          <div className={styles.mobileForm}>
            <h2>{text.diagnosticTitle}</h2>
            <p>{text.diagnosticText}</p>
            <LeadButton kind="diagnostic" className={styles.diagnosticButton}>
              {text.diagnosticButton}
            </LeadButton>
          </div>
        </div>
        <div className={styles.partners}>
          <div className={styles.partner}>
            <span className={styles.flower} aria-hidden="true" />
            <picture>
              <source media="(max-width: 767px)" srcSet="/landing/hero/british-council-mobile.png" />
              <Image src="/landing/hero/british-council.png" width={112} height={32} alt="British Council" />
            </picture>
          </div>
          <div className={styles.partner}>
            <Image src="/landing/hero/icef.png" width={108} height={36} alt="ICEF" />
          </div>
          <div className={`${styles.partner} ${styles.since}`}>
            <span>{text.since}<br /><span>{text.year}</span></span>
            <span className={styles.star} aria-hidden="true" />
          </div>
        </div>
        <HeroPhotographs current={current} />
        <span className="sr-only">{slide.photoAlt}</span>
      </div>
    </section>
  );
}
