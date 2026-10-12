"use client";

/* eslint-disable @next/next/no-img-element -- SVG icons keep their intrinsic Figma dimensions. */

import Image from "next/image";
import { useEffect, useEffectEvent, useId, useRef, useState } from "react";
import type { CSSProperties, ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { LeadButton } from "@/components/landing/LandingForms";
import { campsInstagram, campsResults, campsResultsContent } from "./results-content";
import styles from "./CampsResults.module.css";

const assetPath = "/camps/results";

type CarouselPosition = {
  start: boolean;
  end: boolean;
  offset: number;
};

export function CampsResults({ locale }: { locale: Locale }): ReactElement {
  const t = campsResultsContent[locale];
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
    <section className={styles.results} id="results" aria-labelledby={titleId} data-locale={locale}>
      <div className={styles.pinkSticker} aria-hidden="true">
        <Image src="/school/results/pink-sticker.png" alt="" width={266} height={271} sizes="(max-width: 767px) 152px, 266px" />
      </div>
      <Image
        className={styles.resultsSticker}
        src="/landing/stories/results-sticker.png"
        alt=""
        width={173}
        height={173}
        sizes="173px"
      />
      <div className="landing-container">
        <header className={styles.header}>
          <h2 className={`landing-title ${styles.title}`} id={titleId}>
            <span>{t.title[0]}</span> <span className={styles.titleMuted}>{t.title[1]}</span>
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
              <img className={styles.arrowIdle} src={`${assetPath}/arrow-prev.svg`} alt="" width={24} height={24} />
              <img className={`${styles.arrowActive} ${styles.flipped}`} src={`${assetPath}/arrow-next.svg`} alt="" width={24} height={24} />
            </button>
            <button
              type="button"
              className={styles.arrow}
              aria-controls={trackId}
              aria-label={t.next}
              disabled={position.end}
              onClick={() => move(1)}
            >
              <img className={`${styles.arrowIdle} ${styles.flipped}`} src={`${assetPath}/arrow-prev.svg`} alt="" width={24} height={24} />
              <img className={styles.arrowActive} src={`${assetPath}/arrow-next.svg`} alt="" width={24} height={24} />
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
            {campsResults.map((item, index) => {
              const city = item.city[locale];
              const photo = (
                <Image className={styles.photo} src={item.image} alt="" fill sizes="(max-width: 767px) 279px, 340px" />
              );
              return (
                <li className={styles.card} data-trip={item.id} key={item.id} ref={(node) => { cardRefs.current[index] = node; }}>
                  {item.href ? (
                    <a
                      className={styles.media}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t.watch}: ${city}`}
                    >
                      {photo}
                      <span className={styles.play}>
                        <img className={styles.playDesktop} src={`${assetPath}/play.svg`} alt="" width={26} height={28} />
                        <img className={styles.playMobile} src={`${assetPath}/play-mobile.svg`} alt="" width={21.32} height={22.96} />
                      </span>
                    </a>
                  ) : (
                    <div className={styles.media}>{photo}</div>
                  )}
                  <div className={styles.overlay} />
                  <div className={styles.info}>
                    <h3 className={styles.city}>{city}</h3>
                    <span className={styles.divider} aria-hidden="true" />
                    <LeadButton camp={item.city.ru} className={styles.tripButton}>
                      <span>
                        {t.trip}
                        <span className={styles.srOnly}>: {city}</span>
                      </span>
                      <img className={`${styles.tripArrow} ${styles.tripArrowDesktop}`} src={`${assetPath}/trip-arrow.svg`} alt="" width={24} height={24} />
                      <img className={`${styles.tripArrow} ${styles.tripArrowMobile}`} src={`${assetPath}/trip-arrow-mobile.svg`} alt="" width={18} height={18} />
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
          <div className={styles.instagram}>
            <p>
              <span>{t.description[0]}</span> <span>{t.description[1]}</span>
            </p>
            <a href={campsInstagram} target="_blank" rel="noopener noreferrer">
              <img src={`${assetPath}/instagram.svg`} alt="" width={22} height={22} />
              {t.more}
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default CampsResults;
