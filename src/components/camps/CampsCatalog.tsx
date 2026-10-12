/* eslint-disable @next/next/no-img-element -- Admin uploads under /uploads and external photos are not optimized by next/image. */

import Image from "next/image";
import type { ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { getCampsDict } from "@/i18n/pages/camps";
import { prisma } from "@/lib/prisma";
import { LeadButton } from "@/components/landing/LandingForms";
import styles from "./CampsCatalog.module.css";

type CatalogContent = {
  title: readonly [string, string];
  signup: string;
  /** Plural forms that differ from camps.seatsSuffix (which covers the remaining counts). */
  seats: Partial<Record<Intl.LDMLPluralRule, string>>;
};

const catalogContent: Record<Locale, CatalogContent> = {
  ru: { title: ["Ближайшие", "смены"], signup: "Записаться", seats: { one: "место", few: "места" } },
  kz: { title: ["Жақын", "ауысымдар"], signup: "Жазылу", seats: {} },
  en: { title: ["Upcoming", "sessions"], signup: "Sign up", seats: { one: "place" } },
};

const accents = ["pink", "blue", "green", "yellow"] as const;

type PhotoSource = { src: string; optimized: boolean };

function photoSource(value: string | null): PhotoSource | null {
  const src = value?.trim();
  if (!src) return null;
  if (src.startsWith("/") && !src.startsWith("//")) return { src, optimized: !src.startsWith("/uploads/") };
  if (src.startsWith("https://")) return { src, optimized: false };
  return null;
}

function seatsLabel(count: number, locale: Locale, suffix: string): string {
  const rule = new Intl.PluralRules(locale === "kz" ? "kk" : locale).select(count);
  return `${count} ${catalogContent[locale].seats[rule] ?? suffix}`;
}

async function loadCamps() {
  try {
    return await prisma.camp.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      select: {
        id: true,
        city: true,
        country: true,
        dates: true,
        ageRange: true,
        housing: true,
        seats: true,
        summary: true,
        image: true,
      },
    });
  } catch (error) {
    console.error("Camps catalog: failed to load camps", error);
    return [];
  }
}

export async function CampsCatalog({ locale }: { locale: Locale }): Promise<ReactElement | null> {
  const camps = await loadCamps();
  if (camps.length === 0) return null;

  const t = catalogContent[locale];
  const dict = getCampsDict(locale).camps;

  return (
    <section className={styles.catalog} id="sessions" aria-labelledby="camps-sessions-title">
      <div className="landing-container">
        <div className={styles.header}>
          <h2 id="camps-sessions-title" className={`landing-title ${styles.title}`}>
            {t.title[0]} <strong>{t.title[1]}</strong>
          </h2>
          <p className={styles.intro}>{dict.text}</p>
        </div>
        <ul className={styles.grid}>
          {camps.map((camp, index) => {
            const photo = photoSource(camp.image);
            const facts = [
              [dict.labels.dates, camp.dates],
              [dict.labels.age, camp.ageRange],
              [dict.labels.housing, camp.housing],
            ].filter((fact): fact is [string, string] => Boolean(fact[1]?.trim()));

            return (
              <li className={styles.card} data-accent={accents[index % accents.length]} key={camp.id}>
                <div className={styles.media}>
                  {photo?.optimized && (
                    <Image
                      className={styles.image}
                      src={photo.src}
                      alt=""
                      fill
                      sizes="(max-width: 767px) calc(100vw - 44px), (max-width: 1199px) calc(50vw - 60px), 236px"
                    />
                  )}
                  {photo && !photo.optimized && (
                    <img className={styles.image} src={photo.src} alt="" width={472} height={688} loading="lazy" decoding="async" />
                  )}
                  {camp.seats != null && camp.seats > 0 && (
                    <span className={styles.seats}>{seatsLabel(camp.seats, locale, dict.seatsSuffix)}</span>
                  )}
                </div>
                <div className={styles.body}>
                  <h3 className={styles.city}>{camp.city}</h3>
                  <p className={styles.country}>{camp.country}</p>
                  {facts.length > 0 && (
                    <dl className={styles.facts}>
                      {facts.map(([label, value]) => (
                        <div className={styles.fact} key={label}>
                          <dt>{label}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {camp.summary?.trim() && <p className={styles.summary}>{camp.summary.trim()}</p>}
                  <div className={styles.action}>
                    <LeadButton camp={camp.city} className={`landing-button ${styles.signup}`}>
                      {t.signup}
                      <span className={styles.srOnly}>: {camp.city}</span>
                    </LeadButton>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default CampsCatalog;
