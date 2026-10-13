"use client";

import Image from "next/image";
import { useEffect, useEffectEvent, useId, useRef, useState } from "react";
import type { CSSProperties, ReactElement } from "react";
import { LeadButton } from "@/components/landing/LandingForms";
import type { Locale } from "@/i18n/config";
import { examsStepsContent } from "./exams-sections-content";
import styles from "./ExamsSteps.module.css";

type CarouselPosition = {
  start: boolean;
  end: boolean;
  offset: number;
  scrollable: boolean;
};

type Decoration = {
  id: string;
  src: string;
  width: number;
  height: number;
  mobile?: boolean;
};

const shapes = {
  first: { desktop: [365.514, 404], mobile: [288.613, 358] },
  middle: { desktop: [394.087, 404], mobile: [285.286, 358] },
  last: { desktop: [394.497, 404], mobile: [285.673, 358] },
} as const;

const decorations: readonly (readonly Decoration[])[] = [
  [
    { id: "cap", src: "cap", width: 140, height: 62 },
    { id: "capMobile", src: "cap-mobile", width: 97, height: 42.9572, mobile: true },
  ],
  [
    { id: "document", src: "document", width: 72, height: 79.6503 },
    { id: "documentMobile", src: "document-mobile", width: 55.6158, height: 61.5251, mobile: true },
  ],
  [
    { id: "pencil", src: "pencil", width: 105.995, height: 11.739 },
    { id: "pencilMobile", src: "pencil-mobile", width: 90.3065, height: 10.0018, mobile: true },
  ],
  [
    { id: "progressDocument", src: "document", width: 72, height: 79.6503 },
    { id: "arrowShort", src: "growth-arrow-short", width: 36, height: 17.8979 },
    { id: "arrowLong", src: "growth-arrow-long", width: 39, height: 19.6299 },
    { id: "growthMobile", src: "growth-mobile", width: 61.7639, height: 98, mobile: true },
  ],
  [
    { id: "check", src: "check", width: 72, height: 79.6503 },
    { id: "checkMobile", src: "check-mobile", width: 56, height: 61.9502, mobile: true },
  ],
];

function shapeFor(index: number, count: number): keyof typeof shapes {
  if (index === 0) return "first";
  return index === count - 1 ? "last" : "middle";
}

export function ExamsSteps({ locale }: { locale: Locale }): ReactElement {
  const t = examsStepsContent[locale];
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const trackId = useId();
  const [position, setPosition] = useState<CarouselPosition>({
    start: true,
    end: false,
    offset: 0,
    scrollable: true,
  });

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
    if (!track) return;
    const cards = cardRefs.current.filter((card): card is HTMLLIElement => card !== null);
    const current = track.scrollLeft;
    const target = direction > 0
      ? cards.find((card) => card.offsetLeft > current + 1)
      : cards.findLast((card) => card.offsetLeft < current - 1);
    track.scrollTo({
      left: target ? target.offsetLeft : direction > 0 ? track.scrollWidth : 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <section className={styles.steps} id="exam-steps" aria-labelledby="exams-steps-title">
      <div className="landing-container">
        <div className={styles.head}>
          <h2 className={`landing-title ${styles.title}`} id="exams-steps-title">
            <span>{t.title[0]}</span> <strong>{t.title[1]}</strong>
          </h2>
          <div className={styles.arrows}>
            <button type="button" className={styles.previous} aria-controls={trackId} aria-label={t.previous} disabled={position.start} onClick={() => move(-1)}>
              <Image src="/school/results/arrow-prev.svg" alt="" width={24} height={24} />
            </button>
            <button type="button" className={styles.next} aria-controls={trackId} aria-label={t.next} disabled={position.end} onClick={() => move(1)}>
              <Image src="/exams/steps/arrow-next.svg" alt="" width={24} height={24} />
            </button>
          </div>
        </div>
        <div
          className={styles.track}
          ref={trackRef}
          id={trackId}
          role="region"
          aria-label={t.region}
          tabIndex={position.scrollable ? 0 : undefined}
          onScroll={updatePosition}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              move(event.key === "ArrowLeft" ? -1 : 1);
            }
          }}
        >
          <ol className={styles.list} ref={listRef}>
            {t.steps.map((step, index) => {
              const shape = shapeFor(index, t.steps.length);
              const [width, height] = shapes[shape].desktop;
              const [mobileWidth, mobileHeight] = shapes[shape].mobile;
              return (
                <li
                  className={`${styles.card} ${styles[shape]}`}
                  key={step.title}
                  ref={(node) => { cardRefs.current[index] = node; }}
                >
                  <Image className={styles.shape} src={`/exams/steps/card-${shape}.svg`} alt="" width={width} height={height} />
                  <span className={styles.shapeMobile} aria-hidden="true">
                    <Image src={`/exams/steps/card-${shape}-mobile.svg`} alt="" width={mobileWidth} height={mobileHeight} />
                  </span>
                  {decorations[index]?.map((item) => (
                    <span
                      className={`${styles.decoration} ${styles[item.id]} ${item.mobile ? styles.mobileOnly : styles.desktopOnly}`}
                      key={item.id}
                      aria-hidden="true"
                    >
                      <Image src={`/exams/steps/${item.src}.svg`} alt="" width={item.width} height={item.height} />
                    </span>
                  ))}
                  <span className={styles.number} aria-hidden="true">{index + 1}</span>
                  <div className={styles.copy}>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
        <div className={styles.footer}>
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
            <Image className={styles.desktopOnly} src="/camps/results/trip-arrow.svg" alt="" width={24} height={24} />
            <Image className={styles.mobileOnly} src="/exams/steps/arrow-mobile.svg" alt="" width={19} height={19} />
          </LeadButton>
        </div>
      </div>
    </section>
  );
}
