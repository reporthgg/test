import Image from "next/image";
import type { ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { getAboutDict } from "@/i18n/pages/about";
import { aboutContent, splitTitle } from "./about-content";
import type { AboutContent } from "./about-content";
import styles from "./AboutJourney.module.css";

type ChapterPhoto = {
  src: string;
  width: number;
  height: number;
  alt: keyof AboutContent["photoAlts"];
  tone: "pink" | "yellow" | "green";
};

const photos: readonly ChapterPhoto[] = [
  { src: "/exams/hero/university.jpg", width: 1024, height: 683, alt: "university", tone: "pink" },
  { src: "/school/hero/photo-3.png", width: 532, height: 460, alt: "consultation", tone: "yellow" },
  { src: "/school/teaching-teacher.png", width: 940, height: 1672, alt: "teacher", tone: "green" },
];

export function AboutJourney({ locale }: { locale: Locale }): ReactElement {
  const t = getAboutDict(locale);
  const c = aboutContent[locale];
  const [first, rest] = splitTitle(t.journey.title);
  const paragraphs = [t.journey.p1, t.journey.p2, t.journey.p3];

  return (
    <section className={styles.journey} id="journey" aria-labelledby="about-journey-title">
      <Image className={styles.line} src="/landing/contacts/faq-line.svg" alt="" width={728.887} height={427.609} />
      <div className={`landing-container ${styles.inner}`}>
        <header className={styles.header}>
          <h2 className={`landing-title ${styles.title}`} id="about-journey-title">
            {first} <em>{rest}</em>
          </h2>
          <Image className={styles.hashtag} src="/landing/contacts/hashtag.svg" alt="" width={100.012} height={109.966} />
        </header>
        <ol className={styles.chapters}>
          {paragraphs.map((text, index) => {
            const photo = photos[index];
            return (
              <li className={styles.chapter} key={c.chapters[index]}>
                <span className={`${styles.photo} ${styles[photo.tone]}`} data-photo={photo.alt}>
                  <Image
                    src={photo.src}
                    alt={c.photoAlts[photo.alt]}
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 767px) 100vw, (max-width: 1199px) 280px, 400px"
                  />
                </span>
                <div className={styles.meta}>
                  <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className={styles.chip}>{c.chapters[index]}</h3>
                </div>
                <p>{text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
