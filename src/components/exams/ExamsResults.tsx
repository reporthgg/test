"use client";

import Image from "next/image";
import { useEffect, useEffectEvent, useId, useRef, useState } from "react";
import type { CSSProperties, ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { LeadButton } from "@/components/landing/LandingForms";
import { examsResults, examsResultsContent } from "./exams-results-content";
import styles from "./ExamsResults.module.css";

type CarouselPosition = {
  start: boolean;
  end: boolean;
  offset: number;
};

function Arrow({ cta = false }: { cta?: boolean }): ReactElement {
  return (
    <>
      <Image className={`${styles.arrowIcon} ${styles.desktopIcon}`} src="/camps/results/trip-arrow.svg" alt="" width={24} height={24} />
      <Image
        className={`${styles.arrowIcon} ${styles.mobileIcon}`}
        src={cta ? "/exams/results/cta-arrow-mobile.svg" : "/camps/results/trip-arrow-mobile.svg"}
        alt=""
        width={cta ? 19 : 18}
        height={cta ? 19 : 18}
      />
    </>
  );
}

export function ExamsResults({ locale }: { locale: Locale }): ReactElement {
  const t = examsResultsContent[locale];
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const trackId = useId();
  const titleId = useId();
  const [position, setPosition] = useState<CarouselPosition>({ start: true, end: false, offset: 0 });

  function updatePosition(): void {
    const track = trackRef.current;
    if (!track || track.scrollWidth === 0) return;
    const maximum = Math.max(0, track.scrollWidth - track.clientWidth);
    const scroll = Math.max(0, Math.min(track.scrollLeft, maximum));
    const next = {
      start: scroll <= 1,
      end: scroll >= maximum - 1,
      offset: maximum > 0 ? scroll / maximum : 0,
    };
    setPosition((current) =>
      current.start === next.start && current.end === next.end && current.offset === next.offset ? current : next,
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
    const [first, second] = cardRefs.current;
    if (!track || !first) return;
    const step = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
    track.scrollBy({
      left: direction * step,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <section className={styles.results} aria-labelledby={titleId} data-locale={locale}>
      <div className={styles.sticker} aria-hidden="true">
        <Image src="/school/results/pink-sticker.png" alt="" width={266} height={271} sizes="(max-width: 767px) 152px, 266px" />
      </div>
      <div className="landing-container">
        <header className={styles.header}>
          <h2 className={`landing-title ${styles.title}`} id={titleId}>{t.title}</h2>
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
              <Image className={`${styles.arrowActive} ${styles.flipped}`} src="/camps/results/arrow-next.svg" alt="" width={24} height={24} />
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
              <Image className={styles.arrowActive} src="/camps/results/arrow-next.svg" alt="" width={24} height={24} />
            </button>
          </div>
        </header>
        <div
          className={styles.track}
          ref={trackRef}
          id={trackId}
          role="region"
          aria-label={t.gallery}
          tabIndex={0}
          onScroll={updatePosition}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              move(event.key === "ArrowLeft" ? -1 : 1);
            }
          }}
        >
          <ul className={styles.cards} ref={listRef}>
            {examsResults.map((item, index) => {
              const photo = (
                <Image
                  className={styles.photo}
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 279px, 340px"
                  style={item.position ? { objectPosition: item.position } : undefined}
                />
              );
              const name = item.name?.[locale];
              return (
                <li className={styles.card} data-result={item.id} key={item.id} ref={(node) => { cardRefs.current[index] = node; }}>
                  {item.href && name ? (
                    <a className={styles.media} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${t.watch}: ${name}`}>
                      {photo}
                    </a>
                  ) : (
                    <div className={styles.media}>{photo}</div>
                  )}
                  <div className={styles.overlay} />
                  <div className={styles.info}>
                    <h3 className={styles.score}>
                      <span className={styles.exam}>IELTS</span>
                      <span>{t.points(item.score)}</span>
                    </h3>
                    <span className={styles.divider} aria-hidden="true" />
                    <LeadButton kind="diagnostic" className={styles.want}>
                      <span>{t.want}</span>
                      <Arrow />
                    </LeadButton>
                  </div>
                </li>
              );
            })}
          </ul>
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
          <LeadButton kind="diagnostic" className={styles.join}>
            <span>{t.join}</span>
            <Arrow cta />
          </LeadButton>
        </footer>
      </div>
    </section>
  );
}
