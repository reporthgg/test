/* eslint-disable @next/next/no-img-element -- Сохраняем оригинальное кадрирование портретов Figma. */

import Image from "next/image";
import type { ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { LeadButton } from "@/components/landing/LandingForms";
import { schoolTeachers, schoolTeachersContent } from "./school-teachers-content";
import styles from "./SchoolTeachers.module.css";

export default function SchoolTeachers({ locale }: { locale: Locale }): ReactElement {
  const t = schoolTeachersContent[locale];

  return (
    <section className={styles.section} aria-labelledby="school-teachers-title">
      <Image className={styles.sticker} src="/school/teaching-sticker.png" alt="" width={320} height={213} sizes="320px" />
      <div className={`landing-container ${styles.layout}`}>
        <header className={styles.header}>
          <h2 id="school-teachers-title" className="landing-title">
            {t.title[0]} <em>{t.title[1]}</em>
          </h2>
          <p>{t.description}</p>
        </header>
        <LeadButton kind="trial" className={styles.trial}>{t.trial}</LeadButton>
        <div className={styles.track} role="region" aria-label={t.listLabel} tabIndex={0}>
          {schoolTeachers.map((teacher) => (
            <article key={teacher.id} className={styles.card}>
              <div className={`${styles.photo} ${styles[teacher.tone]}`}>
                {teacher.image && (
                  <Image
                    className={styles[teacher.id]}
                    src={teacher.image}
                    alt={teacher.name[locale]}
                    width={teacher.id === "ayaulym" ? 1192 : 1274}
                    height={teacher.id === "ayaulym" ? 1319 : 1234}
                    sizes="(min-width: 768px) and (max-width: 1199px) 45vw, 300px"
                  />
                )}
              </div>
              <div className={styles.body}>
                <div>
                  <h3>
                    <LeadButton
                      kind="trial"
                      teacher={teacher.name[locale]}
                      className={styles.teacherName}
                    >
                      <span className={styles.screenReader}>{t.bookWith} </span>
                      {teacher.name[locale]}
                    </LeadButton>
                  </h3>
                  <p className={styles.subjects}>{teacher.subjects[locale]}</p>
                </div>
                <div className={styles.facts}>
                  <div className={styles.experience}>
                    <strong>{teacher.experience} {t.years}</strong>
                    <span>{t.experience}</span>
                  </div>
                  <span className={styles.qualification}>
                    <img src="/school/teacher-badge.svg" alt="" />
                    {teacher.qualification}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
