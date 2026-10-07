"use client";

/* eslint-disable @next/next/no-img-element -- SVG icons retain their intrinsic Figma dimensions. */

import Image from "next/image";
import { useEffect, useEffectEvent, useId, useRef, useState } from "react";
import type { ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";
import { schoolResults, schoolResultsContent } from "./school-results-content";
import styles from "./SchoolResults.module.css";

type CarouselPosition = {
  start: boolean;
  end: boolean;
  offset: number;
  visible: number;
};

export function SchoolResults({ locale }: { locale: Locale }): ReactElement {
  const t = schoolResultsContent[locale];
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const trackId = useId();
  const titleId = useId();
  const [position, setPosition] = useState<CarouselPosition>({
    start: true,
    end: false,
    offset: 0,
    visible: 1 / schoolResults.length,
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
      visible: Math.min(1, track.clientWidth / track.scrollWidth),
    };
    setPosition((current) =>
      current.start === next.start &&
      current.end === next.end &&
      current.offset === next.offset &&
      current.visible === next.visible
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
    for (const card of cardRefs.current) {
      if (card) observer.observe(card);
    }
    return () => observer.disconnect();
  }, []);

  function move(direction: -1 | 1): void {
    const track = trackRef.current;
    const first = cardRefs.current[0];
    const second = cardRefs.current[1];
    if (!track || !first) return;
    const step = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
    track.scrollBy({
      left: direction * step,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <section className={styles.results} id="results" aria-labelledby={titleId} data-locale={locale}>
      <Image
        className={styles.resultsSticker}
        src="/school/results/results-sticker.png"
        alt=""
        width={311}
        height={311}
        sizes="(max-width: 767px) 173px, 311px"
      />
      <div className={styles.pinkSticker} aria-hidden="true">
        <Image src="/school/results/pink-sticker.png" alt="" width={266} height={271} sizes="(max-width: 767px) 152px, 266px" />
      </div>
      <div className="landing-container">
        <header className={styles.header}>
          <h2 className={`landing-title ${styles.title}`} id={titleId}>
            <span>{t.your} <em>{t.results}</em></span>
            <span>{t.speak}</span>
          </h2>
          <div className={styles.arrows}>
            <button type="button" className={styles.previous} aria-controls={trackId} aria-label={t.previous} disabled={position.start} onClick={() => move(-1)}>
              <img src="/school/results/arrow-prev.svg" alt="" />
            </button>
            <button type="button" className={styles.next} aria-controls={trackId} aria-label={t.next} disabled={position.end} onClick={() => move(1)}>
              <img src="/school/results/arrow-next.svg" alt="" />
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
            {schoolResults.map((item, index) => (
              <li className={styles.card} data-person={item.id} data-color={item.color} key={item.id} ref={(node) => { cardRefs.current[index] = node; }}>
                <Image className={styles.portrait} src={item.image} alt="" width={340} height={500} sizes="(max-width: 767px) 325px, 411px" />
                <div className={styles.overlay} />
                {item.action === "video" ? (
                  <a className={styles.play} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${t.watch}: ${item.name[locale]}`}>
                    <img className={styles.playDesktop} src="/school/results/play.svg" alt="" />
                    <img className={styles.playMobile} src="/school/results/play-mobile.svg" alt="" />
                  </a>
                ) : (
                  <a className={styles.readStory} href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.readLabel?.[locale]}
                  </a>
                )}
                <div className={styles.info}>
                  <p className={styles.result}>{item.result}</p>
                  <p className={styles.detail}>{item.detail[locale]}</p>
                  <div className={styles.person}>
                    <h3>{item.name[locale]}</h3>
                    <p>{item.program[locale]}</p>
                  </div>
                </div>
              </li>
            ))}
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
          >
            <span style={{ width: `${position.visible * 100}%`, left: `${position.offset * (1 - position.visible) * 100}%` }} />
          </div>
          <div className={styles.instagram}>
            <p>{t.description}</p>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">
              <img src="/school/results/instagram.svg" alt="" />
              {t.more}
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
