"use client";

import { useState } from "react";
import type { ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { LeadButton } from "@/components/landing/LandingForms";
import { useLocale } from "@/i18n/useLocale";
import { getSchoolDict } from "@/i18n/pages/school";
import { schoolProgramArtwork, schoolProgramsContent } from "./school-programs-content";
import styles from "./SchoolPrograms.module.css";

export default function SchoolPrograms({ locale }: { locale?: Locale }): ReactElement {
  const currentLocale = useLocale();
  const resolvedLocale = locale ?? currentLocale;
  const existing = getSchoolDict(resolvedLocale);
  const t = schoolProgramsContent[resolvedLocale];
  const [active, setActive] = useState<string>("all");
  const programs = schoolProgramArtwork.map((artwork, index) => {
    const course = existing.courses[artwork.courseIndex];
    return {
      ...artwork,
      name: course.title,
      category: course.cat,
      badge: course.rows[artwork.badgeRow][1],
      description: t.descriptions[index],
    };
  });
  const shown = programs.filter((program) => active === "all" || program.category === active);

  return (
    <section id="programs-sec" className={styles.section} aria-labelledby="school-programs-title">
      <div className="landing-container">
        <header className={styles.header}>
          <h2 id="school-programs-title" className="landing-title">
            {t.title[0]} <em>{t.title[1]}</em>
          </h2>
          <div className={styles.filters} role="group" aria-label={t.filterLabel}>
            {existing.filters.map((filter) => (
              <button
                type="button"
                key={filter.key}
                aria-pressed={active === filter.key}
                aria-controls="school-programs-grid"
                onClick={() => setActive(filter.key)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </header>
        <p className={styles.screenReader} role="status">{t.countLabel} {shown.length}</p>
        <div className={styles.grid} id="school-programs-grid">
          {shown.map((program) => (
            <article key={program.id} className={`${styles.card} ${styles[program.tone]}`}>
              <h3>{program.name}</h3>
              <p className={styles.description}>{program.description}</p>
              <div className={styles.illustration}>
                <picture data-program={program.id}>
                  <source media="(max-width: 767px)" srcSet={`/school/program-${program.id}-mobile.png`} />
                  <img
                    src={`/school/program-${program.id}.${program.extension}`}
                    alt=""
                    loading="lazy"
                  />
                </picture>
              </div>
              <div className={styles.meta}>
                <span className={styles.badge}>{program.badge}</span>
                <p className={styles.price}>{t.price}</p>
              </div>
              <LeadButton
                kind="trial"
                course={program.name}
                className={styles.trial}
              >
                {t.trial}
              </LeadButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
