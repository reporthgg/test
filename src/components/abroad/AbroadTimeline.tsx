"use client";

import Image from "next/image";
import { useEffect, useEffectEvent, useId, useRef, useState } from "react";
import type { CSSProperties, ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { LeadButton } from "@/components/landing/LandingForms";
import { abroadTimelineContent } from "./abroad-sections-content";
import styles from "./AbroadTimeline.module.css";

const assetPath = "/abroad/timeline";

type CarouselPosition = {
  start: boolean;
  end: boolean;
  offset: number;
  scrollable: boolean;
};

const illustrations = [
  { name: "cap", width: 140, height: 62 },
  { name: "document", width: 72, height: 79.6503 },
  { name: "folder", width: 100, height: 100 },
  null,
  { name: "offer", width: 72, height: 79.6503 },
  { name: "plane", width: 137.59, height: 76.49 },
] as const;

function Illustration({ index }: { index: number }): ReactElement {
  const item = illustrations[index];
  if (!item) {
    return (
      <span className={`${styles.illustration} ${styles.envelope}`} aria-hidden="true">
        <span className={styles.envelopeLines}>
          <span />
          <span />
          <span />
        </span>
        <span className={styles.envelopeBack} />
        <Image className={styles.envelopeBody} src={`${assetPath}/envelope-body.svg`} alt="" width={70} height={45.5} />
        <Image className={styles.envelopeFlap} src={`${assetPath}/envelope-flap.svg`} alt="" width={66} height={27} />
      </span>
    );
  }
  return (
    <span className={`${styles.illustration} ${styles[item.name]}`} aria-hidden="true">
      <picture>
        <source media="(max-width: 767px)" srcSet={`${assetPath}/${item.name}-mobile.svg`} />
        <Image src={`${assetPath}/${item.name}.svg`} alt="" width={item.width} height={item.height} />
      </picture>
    </span>
  );
}

export function AbroadTimeline({ locale }: { locale: Locale }): ReactElement {
  const t = abroadTimelineContent[locale];
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const trackId = useId();
  const titleId = useId();
  const [position, setPosition] = useState<CarouselPosition>({ start: true, end: false, offset: 0, scrollable: true });

  function updatePosition(): void {
    const track = trackRef.current;
    if (!track || track.scrollWidth === 0) return;
    const maximum = Math.max(0, track.scrollWidth - track.clientWidth);
    const scroll = Math.max(0, Math.min(track.scrollLeft, maximum));
    const next = {
      start: scroll <= 1,
      end: scroll >= maximum - 1,
      offset: maximum > 0 ? scroll / maximum : 0,
      scrollable: maximum > 1,
    };
    setPosition((current) =>
      current.start === next.start &&
      current.end === next.end &&
      current.offset === next.offset &&
      current.scrollable === next.scrollable
        ? current
        : next,
    );
  }

  const onResize = useEffectEvent(updatePosition);

  useEffect(() => {
    const track = trackRef.current;
    const list = listRef.current;
    if (!track || !list) return;
    const observer = new ResizeObserver(() => onResize());
    observer.observe(track);
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  function move(direction: -1 | 1): void {
    const track = trackRef.current;
    const steps = stepRefs.current.filter((step): step is HTMLLIElement => step !== null);
    if (!track || steps.length === 0) return;
    const origin = steps[0].offsetLeft;
    const current = track.scrollLeft;
    const targets = steps.map((step) => step.offsetLeft - origin);
    const target =
      direction === 1
        ? targets.find((left) => left > current + 1) ?? track.scrollWidth
        : [...targets].reverse().find((left) => left < current - 1) ?? 0;
    track.scrollTo({
      left: target,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <section className={styles.timeline} aria-labelledby={titleId}>
      <div className="landing-container">
        <header className={styles.header}>
          <h2 className={`landing-title ${styles.title}`} id={titleId}>
            <span className={styles.titleMuted}>{t.title[0]}</span> <span>{t.title[1]}</span>
          </h2>
          <div className={styles.arrows}>
            <button
              type="button"
              className={styles.arrow}
              aria-controls={trackId}
              aria-label={t.previous}
              disabled={position.start}
              onClick={() => move(-1)}
            >
              <Image className={styles.arrowIdle} src="/camps/results/arrow-prev.svg" alt="" width={24} height={24} />
              <Image className={`${styles.arrowActive} ${styles.flipped}`} src={`${assetPath}/arrow-next.svg`} alt="" width={24} height={24} />
            </button>
            <button
              type="button"
              className={styles.arrow}
              aria-controls={trackId}
              aria-label={t.next}
              disabled={position.end}
              onClick={() => move(1)}
            >
              <Image className={`${styles.arrowIdle} ${styles.flipped}`} src="/camps/results/arrow-prev.svg" alt="" width={24} height={24} />
              <Image className={styles.arrowActive} src={`${assetPath}/arrow-next.svg`} alt="" width={24} height={24} />
            </button>
          </div>
        </header>
        <div
          className={styles.track}
          ref={trackRef}
          id={trackId}
          role="region"
          aria-label={t.gallery}
          tabIndex={position.scrollable ? 0 : -1}
          onScroll={updatePosition}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              move(event.key === "ArrowLeft" ? -1 : 1);
            }
          }}
        >
          <ol className={styles.steps} ref={listRef}>
            {t.steps.map((step, index) => (
              <li
                key={step.id}
                className={`${styles.step} ${index === 0 ? styles.first : index === t.steps.length - 1 ? styles.last : ""}`}
                ref={(node) => { stepRefs.current[index] = node; }}
              >
                <span className={styles.shape} aria-hidden="true" />
                <span className={styles.number} aria-hidden="true">{index + 1}</span>
                <div className={styles.copy}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                <Illustration index={index} />
              </li>
            ))}
          </ol>
        </div>
        <footer className={styles.footer}>
          <div
            className={styles.progress}
            role="progressbar"
            aria-label={t.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position.offset * 100)}
            style={{ "--progress": position.offset } as CSSProperties}
          >
            <span />
          </div>
          <LeadButton className={styles.cta}>
            <span>{t.cta}</span>
            <picture className={styles.ctaArrow}>
              <source media="(max-width: 767px)" srcSet={`${assetPath}/plan-arrow-mobile.svg`} />
              <Image src={`${assetPath}/plan-arrow.svg`} alt="" width={24} height={24} />
            </picture>
          </LeadButton>
        </footer>
      </div>
    </section>
  );
}
