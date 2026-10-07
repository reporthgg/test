/* eslint-disable @next/next/no-img-element -- Оригинальные фотографии, ретушь и SVG из Figma. */

import Image from "next/image";
import type { ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { schoolTeachingContent } from "./school-teaching-content";
import styles from "./SchoolTeaching.module.css";

export default function SchoolTeaching({ locale }: { locale: Locale }): ReactElement {
  const t = schoolTeachingContent[locale];

  return (
    <section className={styles.section} aria-labelledby="school-teaching-title">
      <div className={`landing-container ${styles.layout}`}>
        <div className={styles.content}>
          <h2 className="landing-title" id="school-teaching-title">
            {t.title[0]} <em>{t.title[1]}</em><br />{t.title[2]}
          </h2>
          <p className={styles.description}>{t.description}</p>
          <ol className={styles.points}>
            {t.points.map((point, index) => (
              <li key={point.title}>
                <span className={styles.pointNumber} aria-hidden="true">
                  <img src={`/school/teaching-marker-${index + 1}.svg`} alt="" />
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </li>
            ))}
          </ol>
        </div>
        <ul className={styles.formats}>
          <li><span><img src="/school/teaching-group.svg" alt="" /></span>{t.group}</li>
          <li><span><img src="/school/teaching-location.svg" alt="" /></span>{t.location}</li>
        </ul>
        <div className={styles.photos}>
          <div className={styles.students}>
            <Image className={styles.studentsPhoto} src="/school/teaching-students.jpg" alt={t.photoAlts[0]} width={2730} height={4096} sizes="(max-width: 767px) 75vw, 500px" />
            <img className={styles.retouch} src="/school/teaching-retouch.png" alt="" loading="lazy" />
          </div>
          <div className={styles.teacher}>
            <Image src="/school/teaching-teacher.png" alt={t.photoAlts[1]} width={940} height={1672} sizes="300px" />
          </div>
          <div className={styles.child}>
            <Image src="/school/teaching-child.jpg" alt={t.photoAlts[2]} width={4096} height={2731} sizes="(max-width: 767px) 100vw, 700px" />
          </div>
        </div>
      </div>
    </section>
  );
}
