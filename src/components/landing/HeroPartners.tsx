import type { ReactElement } from "react";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { heroContent } from "./hero-content";
import styles from "./HeroPartners.module.css";

const partners = [
  { id: "british-council", image: "/landing/hero/british-council.png", width: 112, height: 32, name: "British Council" },
  { id: "icef", image: "/landing/hero/icef.png", width: 108, height: 36, name: "ICEF" },
  { id: "since" },
  { id: "ielts", image: "/landing/hero/ielts.png", width: 100, height: 49, name: "IELTS Registration Centre" },
  { id: "ets", image: "/landing/hero/ets.png", width: 85, height: 58, name: "ETS" },
] as const;

export default function HeroPartners({ locale, paused }: { locale: Locale; paused: boolean }): ReactElement {
  const text = heroContent[locale];

  return (
    <div className={styles.partners} data-paused={paused} data-locale={locale} role="group" aria-label={text.partners}>
      <div className={styles.track}>
        {[false, true].map((duplicate) => (
          <div key={String(duplicate)} className={styles.group} aria-hidden={duplicate || undefined}>
            {partners.map((partner) => (
              <div key={partner.id} className={`${styles.partner} ${partner.id === "since" ? styles.since : ""}`} data-partner={partner.id}>
                {partner.id === "since" ? (
                  <>
                    <span>{text.since}<br /><span>{text.year}</span></span>
                    <span className={styles.star} aria-hidden="true" />
                  </>
                ) : (
                  <>
                    {partner.id === "british-council" && <span className={styles.flower} aria-hidden="true" />}
                    <picture>
                      {partner.id === "british-council" && <source media="(max-width: 767px)" srcSet="/landing/hero/british-council-mobile.png" />}
                      <Image
                        src={partner.image}
                        width={partner.width}
                        height={partner.height}
                        style={{ aspectRatio: `${partner.width} / ${partner.height}`, objectFit: "cover" }}
                        loading="eager"
                        alt={duplicate ? "" : partner.name}
                      />
                    </picture>
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
