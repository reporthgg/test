import Image from "next/image";
import type { CSSProperties, ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { LeadButton } from "@/components/landing/LandingForms";
import { abroadCountries, abroadCountriesContent, abroadDiscussFlags } from "./abroad-countries-content";
import styles from "./AbroadCountries.module.css";

type DiscussFlag = { id: string; src: string; left: number; top: number; size: number };

function flagStyle(flag: DiscussFlag): CSSProperties {
  return { left: `${flag.left}px`, top: `${flag.top}px`, width: `${flag.size}px`, height: `${flag.size}px` };
}

function DiscussFlags({ flags, className }: { flags: readonly DiscussFlag[]; className: string }): ReactElement {
  return (
    <span className={className} aria-hidden="true">
      {flags.map((flag) => (
        <Image
          key={flag.id}
          src={flag.src}
          alt=""
          width={Math.round(flag.size)}
          height={Math.round(flag.size)}
          unoptimized
          style={flagStyle(flag)}
        />
      ))}
    </span>
  );
}

export function AbroadCountries({ locale }: { locale: Locale }): ReactElement {
  const t = abroadCountriesContent[locale];

  return (
    <section className={styles.countries} aria-labelledby="abroad-countries-title" data-locale={locale}>
      <div className={styles.beyondSticker} aria-hidden="true">
        <Image src="/landing/stories/think-beyond-sticker.png" alt="" width={270} height={270} sizes="262px" />
      </div>
      <div className={`landing-container ${styles.container}`}>
        <h2 className={styles.title} id="abroad-countries-title">
          <span>{t.title[0]}</span> <span>{t.title[1]}</span>
        </h2>
        <div className={styles.gridWrap}>
          <ul className={styles.grid}>
            {abroadCountries.map((country) => (
              <li className={styles.card} key={country.id}>
                <div className={styles.photo}>
                  <Image
                    src={country.image.src}
                    alt={country.image.alt[locale]}
                    fill
                    sizes="(max-width: 767px) calc(100vw - 63px), (max-width: 1199px) 50vw, 359px"
                  />
                </div>
                <h3 className={styles.name}>{country.name[locale]}</h3>
                <ul className={styles.badges}>
                  {country.badges.map((badge) => (
                    <li className={styles.badge} data-color={badge.color} key={badge.text.en}>
                      {badge.text[locale]}
                    </li>
                  ))}
                </ul>
                <Image
                  className={styles.flag}
                  src={country.flag.src}
                  alt=""
                  width={92}
                  height={92}
                  unoptimized
                  style={{ right: `${country.flag.right}px`, top: `${country.flag.top}px` }}
                />
              </li>
            ))}
          </ul>
          <LeadButton className={styles.discuss}>
            <span className={styles.discussLabel}>{t.discuss}</span>
            <Image className={styles.wave} src="/abroad/countries/wave.svg" alt="" width={140} height={59} />
            <DiscussFlags flags={abroadDiscussFlags.desktop} className={styles.discussFlags} />
            <DiscussFlags flags={abroadDiscussFlags.mobile} className={styles.discussFlagsMobile} />
          </LeadButton>
        </div>
      </div>
      <Image className={styles.keysSticker} src="/school/test-sticker.png" alt="" width={230} height={230} sizes="(max-width: 767px) 169px, 230px" />
    </section>
  );
}
