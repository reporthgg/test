"use client";

import Image from "next/image";
import { useEffect, useEffectEvent, useId, useRef, useState } from "react";
import type { CSSProperties, ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { LeadButton } from "@/components/landing/LandingForms";
import { abroadStories, abroadStoriesContent } from "./abroad-stories-content";
import type { AbroadStory } from "./abroad-stories-content";
import styles from "./AbroadStories.module.css";

type CarouselPosition = { start: boolean; end: boolean; offset: number };

function cropStyle(story: AbroadStory): CSSProperties | undefined {
  if (!story.crop) return undefined;
  return {
    "--crop-width": story.crop.width,
    "--crop-height": story.crop.height,
    "--crop-left": story.crop.left,
    "--crop-top": story.crop.top,
  } as CSSProperties;
}

function StoryArrows(): ReactElement {
  return (
    <>
      <Image className={styles.storyArrowDesktop} src="/abroad/stories/story-arrow.svg" alt="" width={24} height={24} />
      <Image className={styles.storyArrowMobile} src="/abroad/stories/story-arrow-mobile.svg" alt="" width={18} height={18} />
    </>
  );
}

export function AbroadStories({ locale }: { locale: Locale }): ReactElement {
  const t = abroadStoriesContent[locale];
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
    const next = { start: scroll <= 1, end: scroll >= maximum - 1, offset: maximum > 0 ? scroll / maximum : 0 };
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
    <section className={styles.stories} aria-labelledby={titleId} data-locale={locale}>
      <div className={styles.sticker} aria-hidden="true">
        <Image src="/school/results/pink-sticker.png" alt="" width={266} height={271} sizes="(max-width: 767px) 152px, 266px" />
      </div>
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
              <Image className={styles.arrowIdle} src="/camps/results/arrow-prev.svg" alt="" width={24} height={24} />
              <Image className={`${styles.arrowActive} ${styles.flipped}`} src="/abroad/stories/arrow-next.svg" alt="" width={24} height={24} />
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
              <Image className={styles.arrowActive} src="/abroad/stories/arrow-next.svg" alt="" width={24} height={24} />
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
            {abroadStories.map((story, index) => (
              <li
                className={styles.card}
                data-crop={story.crop ? "" : undefined}
                style={cropStyle(story)}
                key={story.id}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
              >
                <Image
                  className={styles.photo}
                  src={story.image.src}
                  alt=""
                  width={story.image.width}
                  height={story.image.height}
                  sizes="(max-width: 767px) 290px, 354px"
                />
                <span className={styles.overlay} aria-hidden="true" />
                <span className={styles.university}>{story.university}</span>
                <div className={styles.info}>
                  <h3 className={styles.result}>{story.result[locale]}</h3>
                  <span className={styles.divider} aria-hidden="true" />
                  {story.href ? (
                    <a className={styles.storyLink} href={story.href} target="_blank" rel="noopener noreferrer">
                      <span>{story.label[locale]}</span>
                      <StoryArrows />
                    </a>
                  ) : (
                    <p className={styles.storyLink}>{story.label[locale]}</p>
                  )}
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
            style={{ "--progress": position.offset } as CSSProperties}
          >
            <span />
          </div>
          <div className={styles.cta}>
            <p>{t.chances}</p>
            <LeadButton className={styles.review}>
              {t.review}
              <Image className={styles.reviewArrowDesktop} src="/abroad/stories/story-arrow.svg" alt="" width={24} height={24} />
              <Image className={styles.reviewArrowMobile} src="/abroad/stories/cta-arrow-mobile.svg" alt="" width={19} height={19} />
            </LeadButton>
          </div>
        </footer>
      </div>
    </section>
  );
}
