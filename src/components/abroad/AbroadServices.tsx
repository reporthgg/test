import Image from "next/image";
import type { ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { LeadButton } from "@/components/landing/LandingForms";
import { abroadServicesContent } from "./abroad-sections-content";
import styles from "./AbroadServices.module.css";

export function AbroadServices({ locale }: { locale: Locale }): ReactElement {
  const t = abroadServicesContent[locale];

  return (
    <section className={styles.services} aria-labelledby="abroad-services-title">
      <div className={`landing-container ${styles.layout}`}>
        <div className={styles.intro}>
          <h2 className={styles.title} id="abroad-services-title">
            {t.title[0]} <span>{t.title[1]}</span>
          </h2>
          <LeadButton className={styles.button}>
            <span>{t.cta}</span>
            <Image className={styles.buttonArrow} src="/abroad/services/arrow.svg" alt="" width={20} height={20} />
          </LeadButton>
        </div>
        <ul className={styles.list} aria-label={t.listLabel}>
          {t.items.map((item) => (
            <li key={item.id} className={styles.item}>
              <div className={styles.copy}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <Image className={styles.icon} src={`/abroad/services/${item.icon}.svg`} alt="" width={100} height={100} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
