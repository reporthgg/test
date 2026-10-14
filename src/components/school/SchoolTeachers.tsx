/* eslint-disable @next/next/no-img-element -- Сохраняем оригинальное кадрирование портретов Figma. */

import Image from "next/image";
import type { ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { LeadButton } from "@/components/landing/LandingForms";
import { experienceLabel, schoolTeachers, schoolTeachersContent } from "./school-teachers-content";
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
          {schoolTeachers.map(({ id, tone, profile }) => (
            <article key={id} className={styles.card}>
              <div className={`${styles.photo} ${styles[tone]}`}>
                <Image
                  className={profile.image.cover ? styles.cover : styles.portrait}
                  src={profile.image.src}
                  alt={profile.name[locale]}
                  width={profile.image.width}
                  height={profile.image.height}
                  sizes="(min-width: 768px) and (max-width: 1199px) 45vw, 300px"
                />
                {profile.office && (
                  <p className={styles.office}>
                    <span className={styles.officeIcon} aria-hidden="true" />
                    <span className={styles.screenReader}>{t.officeLabel} </span>
                    {t.offices[profile.office]}
                  </p>
                )}
              </div>
              <div className={styles.body}>
                <div>
                  <h3>
                    <LeadButton
                      kind="trial"
                      teacher={profile.name[locale]}
                      className={`${styles.teacherName} tap-target`}
                    >
                      <span className={styles.screenReader}>{t.bookWith} </span>
                      {profile.name[locale]}
                    </LeadButton>
                  </h3>
                  <p className={styles.subjects}>{profile.subjects[locale]}</p>
                </div>
                {(profile.experience !== undefined || profile.qualification) && (
                  <div className={styles.facts}>
                    {profile.experience !== undefined && (
                      <div className={styles.experience}>
                        <strong>{experienceLabel(locale, profile.experience, profile.experiencePlus === true, t.years)}</strong>
                        <span>{t.experience}</span>
                      </div>
                    )}
                    {profile.qualification && (
                      <span className={styles.qualification}>
                        <img src="/school/teacher-badge.svg" alt="" />
                        {profile.qualification}
                      </span>
                    )}
                    {profile.certificate && (
                      <div className={styles.certificateRow}>
                        <span className={`${styles.qualification} ${styles.certificate}`}>
                          <img src="/school/teacher-badge.svg" alt="" />
                          {profile.certificate[locale]}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
