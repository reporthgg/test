"use client";

/* eslint-disable @next/next/no-img-element -- Preserve the intrinsic dimensions of Figma SVG assets. */

import Image from "next/image";
import { useId, useRef, useState } from "react";
import type { CSSProperties, ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";
import { LeadButton } from "@/components/landing/LandingForms";
import {
  admissionLetters,
  storiesContent,
  studentStories,
  universityLogos,
} from "@/components/landing/stories-content";
import type { StudentStory, UniversityLogo } from "@/components/landing/stories-content";
import styles from "@/components/landing/LandingStories.module.css";

function StoryCard({ story, locale, additional }: { story: StudentStory; locale: Locale; additional: boolean }): ReactElement {
  const t = storiesContent[locale];
  return (
    <article className={`${styles.storyCard} ${additional ? styles.additional : ""}`} data-story={story.id}>
      <h3>{story.name[locale]}</h3>
      <div className={styles.badges}>
        {story.badges.map((badge, index) => (
          <span
            className={styles.badge}
            data-color={badge.color}
            key={index}
            style={{ "--badge-width": `${badge.width}px`, "--badge-mobile-width": `${badge.mobileWidth ?? badge.width}px` } as CSSProperties}
          >
            {badge.text[locale]}
            {badge.arrow && (
              <>
                <img src="/landing/stories/progress-arrow.svg" alt="" />
                C1
              </>
            )}
          </span>
        ))}
      </div>
      <a
        className={styles.portrait}
        href={story.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={story.readLabel?.[locale] ?? `${t.watch}: ${story.name[locale]}`}
      >
        <Image className={styles.studentImage} src={story.image} alt={story.name[locale]} width={800} height={1000} sizes="(max-width: 600px) 90vw, (max-width: 1024px) 42vw, 350px" />
        {story.id === "imangali" && (
          <>
            <img className={styles.retouchLeft} src="/landing/stories/imangali-retouch.svg" alt="" />
            <img className={styles.retouchLeftMobile} src="/landing/stories/imangali-retouch-mobile.svg" alt="" />
            <span className={styles.retouchRight} />
          </>
        )}
        {story.readLabel ? (
          <span className={styles.readStory}>{story.readLabel[locale]}</span>
        ) : (
          <span className={styles.play}>
            <img className={styles.playDesktop} src="/landing/stories/play.svg" alt="" />
            <img className={styles.playMobile} src="/landing/stories/play-mobile.svg" alt="" />
          </span>
        )}
        {story.caption && (
          <span className={styles.caption}>
            <span>
              {story.caption[locale].before}
              <strong>{story.caption[locale].strong}</strong>
              {story.caption[locale].after}
            </span>
          </span>
        )}
      </a>
    </article>
  );
}

export function StoriesCases({ locale }: { locale: Locale }): ReactElement {
  const t = storiesContent[locale];
  const [expanded, setExpanded] = useState(false);
  const gridId = useId();

  return (
    <section id="reviews" className={styles.cases} aria-labelledby="landing-stories-title">
      <div className="landing-container">
        <h2 id="landing-stories-title" className={styles.casesTitle}>
          <span>{t.dream}</span>{" "}
          <span>{t.into} <strong>{t.university}</strong></span>
        </h2>
        <div className={styles.storyGrid} id={gridId} data-expanded={expanded}>
          {studentStories.map((story, index) => (
            <StoryCard key={story.id} story={story} locale={locale} additional={index > 3} />
          ))}
          <article className={`${styles.storyCard} ${styles.yourStory}`}>
            <h3>{t.nextStory.split("\n").map((line, index) => <span key={index}>{index > 0 && " "}{line}</span>)}</h3>
            <LeadButton kind="trial" className={styles.trialButton}>{t.trial}</LeadButton>
          </article>
        </div>
        <Image className={styles.resultsSticker} src="/landing/stories/results-sticker.png" alt="" width={200} height={200} sizes="(max-width: 600px) 130px, 200px" />
        <div className={styles.beyondSticker}>
          <Image src="/landing/stories/think-beyond-sticker.png" alt="" width={270} height={270} sizes="270px" />
        </div>
        <a href={site.instagram} target="_blank" rel="noopener noreferrer" className={`${styles.moreButton} ${styles.desktopMore}`}>{t.more}</a>
        <button
          type="button"
          className={`${styles.moreButton} ${styles.mobileMore}`}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={gridId}
        >
          {expanded ? t.fewerCases : t.moreCases}
        </button>
      </div>
    </section>
  );
}

function logoLayout({ desktop, mobile }: UniversityLogo): CSSProperties {
  const [cell, x, y, width, height] = desktop;
  const [mobileCell, mobileX, mobileY, mobileWidth, mobileHeight] = mobile;
  return {
    "--logo-cell": `${cell}px`,
    "--logo-x": `${x}px`,
    "--logo-y": `${y}px`,
    "--logo-width": `${width}px`,
    "--logo-height": `${height}px`,
    "--logo-mobile-cell": `${mobileCell}px`,
    "--logo-mobile-x": `${mobileX}px`,
    "--logo-mobile-y": `${mobileY}px`,
    "--logo-mobile-width": `${mobileWidth}px`,
    "--logo-mobile-height": `${mobileHeight}px`,
  } as CSSProperties;
}

function LetterPreview({ letter, locale }: { letter: (typeof admissionLetters)[number]; locale: Locale }): ReactElement {
  const t = storiesContent[locale];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  const src = `/landing/stories/letter-${letter.id}.png`;

  return (
    <div className={styles.letterItem} data-letter={letter.id} style={{ "--mobile-order": letter.mobileOrder } as CSSProperties}>
      <button className={styles.letterPreview} type="button" onClick={() => dialogRef.current?.showModal()} aria-label={`${t.enlarge}: ${letter.university}`}>
        <Image src={src} alt={`${t.letter}: ${letter.university}`} width={600} height={800} sizes="(max-width: 600px) 320px, 295px" />
      </button>
      <dialog
        ref={dialogRef}
        className={styles.letterDialog}
        aria-labelledby={headingId}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className={styles.dialogContent}>
          <div className={styles.dialogHeader}>
            <h3 id={headingId}>{t.letter}: {letter.university}</h3>
            <button type="button" onClick={() => dialogRef.current?.close()}>{t.close}</button>
          </div>
          <Image src={src} alt={`${t.letter}: ${letter.university}`} width={1000} height={1350} sizes="(max-width: 800px) 90vw, 760px" />
        </div>
      </dialog>
    </div>
  );
}

export function StoriesLetters({ locale }: { locale: Locale }): ReactElement {
  const t = storiesContent[locale];
  const trackRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ start: true, end: false });
  const galleryId = useId();
  const universitiesId = useId();

  function scrollLetters(direction: number): void {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.firstElementChild?.getBoundingClientRect().width ?? track.clientWidth;
    track.scrollBy({ left: direction * (cardWidth + 20), behavior: "auto" });
  }

  return (
    <section id="admissions" className={styles.letters} data-locale={locale} aria-labelledby="landing-letters-title">
      <img className={styles.lettersLine} src="/landing/stories/letters-line.svg" alt="" />
      <div className={`landing-container ${styles.lettersContainer}`}>
        <h2 id="landing-letters-title" className={styles.lettersTitle}>
          <strong>{t.admissions}</strong>{" "}
          <span>{t.abroad}</span>{" "}
          <span>{t.universities}</span>
        </h2>
        <div className={styles.letterControls}>
          <button type="button" onClick={() => scrollLetters(-1)} disabled={position.start} aria-label={t.previous} aria-controls={galleryId}>
            <img src="/landing/stories/previous.svg" alt="" />
          </button>
          <button type="button" onClick={() => scrollLetters(1)} disabled={position.end} aria-label={t.next} aria-controls={galleryId}>
            <img src="/landing/stories/next.svg" alt="" />
          </button>
        </div>
        <div
          id={galleryId}
          className={styles.letterTrack}
          ref={trackRef}
          role="region"
          aria-label={t.gallery}
          tabIndex={0}
          onScroll={() => {
            const track = trackRef.current;
            if (track) setPosition({ start: track.scrollLeft <= 1, end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 1 });
          }}
        >
          {admissionLetters.map((letter) => <LetterPreview key={letter.id} letter={letter} locale={locale} />)}
        </div>
        <div className={styles.universities}>
          <div className={styles.universitiesHead}>
            <h3 className={styles.universitiesCaption} id={universitiesId}>{t.universityList}</h3>
            <p className={styles.universitiesStat}>{site.admissions[locale]}</p>
          </div>
          <div className={styles.universitiesViewport}>
            <ul className={styles.universitiesTrack} aria-labelledby={universitiesId}>
              {universityLogos.map((logo) => (
                <li key={logo.file} className={styles.universityLogo} style={logoLayout(logo)}>
                  <img
                    src={`/landing/stories/universities/${logo.file}`}
                    alt={logo.name}
                    width={Math.round(logo.desktop[3])}
                    height={Math.round(logo.desktop[4])}
                    loading="lazy"
                    decoding="async"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
