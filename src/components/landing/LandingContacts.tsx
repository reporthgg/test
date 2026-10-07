/* eslint-disable @next/next/no-img-element -- Preserve the intrinsic dimensions of Figma SVG assets. */

import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { withLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";
import { contactsContent } from "@/components/landing/contacts-content";
import styles from "@/components/landing/LandingContacts.module.css";

export function LandingOffices({ locale }: { locale: Locale }): ReactElement {
  const t = contactsContent[locale];

  return (
      <section id="offices" className={styles.offices} aria-labelledby="landing-offices-title">
        <img className={styles.officesLine} src="/landing/contacts/offices-line.svg" alt="" />
        <img className={styles.officesLineMobile} src="/landing/contacts/offices-line-mobile.svg" alt="" />
        <div className="landing-container">
          <header className={styles.officesHeader}>
            <h2 className={`landing-title ${styles.officesTitle}`} id="landing-offices-title">
              GSC <em>{t.near}</em> {t.you}
            </h2>
            <p>{t.officesDescription}</p>
          </header>
          <div className={styles.officePicker}>
            <fieldset className={styles.cityPicker}>
              <legend className={styles.visuallyHidden}>{t.chooseCity}</legend>
              <label>
                <input type="radio" name={`landing-office-city-${locale}`} value="astana" defaultChecked />
                <span>{t.cities.Астана}</span>
              </label>
              <label>
                <input type="radio" name={`landing-office-city-${locale}`} value="almaty" />
                <span>{t.cities.Алматы}</span>
              </label>
            </fieldset>
            <div className={styles.officeGrid}>
              {site.offices.map((office) => (
                <article className={styles.officeCard} data-city={office.city === "Астана" ? "astana" : "almaty"} key={office.gis}>
                  <Image className={styles.mapImage} src={office.mapPreview} alt={`${t.mapPreview}: ${t.cities[office.city]}, ${t.addresses[office.address]}`} width={738} height={363} sizes="(max-width: 600px) 738px, (max-width: 1024px) 90vw, 610px" />
                  <div className={styles.officeAddress}>
                    <h3>{t.cities[office.city]}</h3>
                    <p>{t.addresses[office.address]}</p>
                  </div>
                  <span className={styles.gisBadge} aria-hidden="true">2GIS</span>
                  <a
                    href={office.gis}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.routeButton}
                    aria-label={`${t.route}: ${t.cities[office.city]}, ${t.addresses[office.address]}`}
                  >
                    <Image className={styles.gisIcon} src="/landing/contacts/2gis.png" alt="" width={25} height={25} />
                    {t.route}
                    <img className={styles.routeArrow} src="/landing/contacts/route-arrow.svg" alt="" />
                  </a>
                  <a className={styles.mapAttribution} href={office.gis} target="_blank" rel="noopener noreferrer">© 2GIS</a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}

export function LandingContacts({ locale }: { locale: Locale }): ReactElement {
  const t = contactsContent[locale];

  return (
    <div className={styles.contacts}>
      <LandingOffices locale={locale} />
      <section id="faq" className={styles.faq} aria-labelledby="landing-faq-title">
        <img className={styles.faqLine} src="/landing/contacts/faq-line.svg" alt="" />
        <img className={styles.faqLineMobile} src="/landing/contacts/faq-line-mobile.svg" alt="" />
        <div className={`landing-container ${styles.faqLayout}`}>
          <header className={styles.faqHeader}>
            <h2 className={`landing-title ${styles.faqTitle}`} id="landing-faq-title">
              {t.faqTitle} <em>{t.faqAccent}</em>
            </h2>
            <img className={styles.hashtag} src="/landing/contacts/hashtag.svg" alt="" />
            <img className={styles.hashtagMobile} src="/landing/contacts/hashtag-mobile.svg" alt="" />
          </header>
          <div className={styles.questions}>
            {t.faq.map((item, index) => (
              <details className={styles.question} key={item.question}>
                <summary>
                  <span data-question={index}>{item.question}</span>
                  <img className={styles.plus} src="/landing/contacts/faq-plus.svg" alt="" />
                  <img className={styles.plusMobile} src="/landing/contacts/faq-plus-mobile.svg" alt="" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function LandingFooter({ locale }: { locale: Locale }): ReactElement {
  const t = contactsContent[locale];
  const programs = [
    { label: t.links.school, href: "/school" },
    { label: t.links.ielts, href: "/exams" },
    { label: t.links.sat, href: "/exams" },
    { label: t.links.abroad, href: "/abroad" },
    { label: t.links.camps, href: "/camps" },
  ];
  const company = [
    { label: t.links.about, href: "/about" },
    { label: t.links.centers, href: "/#offices" },
    { label: t.links.reviews, href: "/#reviews" },
    { label: t.links.school, href: "/school" },
  ];
  const hours = site.workingHours.replace("Пн-Пт", t.weekdays).replace("Сб", t.saturday).split(" · ");

  return (
    <footer className={styles.footer} data-locale={locale}>
      <div className={`landing-container ${styles.footerGrid}`}>
        <div className={styles.brand}>
          <Link className={styles.logo} href={withLocale(locale, "/")} aria-label={site.name}>
            <Image src="/landing/contacts/logo-white.png" alt={site.name} width={218} height={218} sizes="218px" />
          </Link>
          <p><strong>{t.since}</strong> {t.brandDescription}</p>
          <div className={styles.socialLinks}>
            <a href={site.whatsapp.link} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <img src="/landing/contacts/whatsapp.svg" alt="" />
            </a>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src="/landing/contacts/instagram.svg" alt="" />
            </a>
          </div>
        </div>
        <nav className={styles.footerNav} aria-label={t.programs}>
          <h3>{t.programs}</h3>
          <ul>{programs.map((item) => <li key={item.label}><Link href={withLocale(locale, item.href)}>{item.label}</Link></li>)}</ul>
        </nav>
        <nav className={styles.footerNav} aria-label={t.company}>
          <h3>{t.company}</h3>
          <ul>{company.map((item) => <li key={item.label}><Link href={withLocale(locale, item.href)}>{item.label}</Link></li>)}</ul>
        </nav>
        <div className={styles.footerContacts}>
          <h3>{t.contacts}</h3>
          <address>
            <div><span>{t.callCenter}</span><a href={`tel:${site.phone.tel}`}>{site.phone.display}</a></div>
            <div><span>WhatsApp:</span><a href={site.whatsapp.link} target="_blank" rel="noopener noreferrer">{site.whatsapp.display}</a></div>
            <div><span>Email:</span><a href={`mailto:${site.email}`}>{site.email}</a></div>
            <div><span>{t.hours}</span><p>{hours.map((line) => <span key={line}>{line}</span>)}</p></div>
          </address>
        </div>
      </div>
      <div className={styles.footerDivider} aria-hidden="true">
        <img className={styles.footerLine} src="/landing/contacts/footer-line.svg" alt="" />
        <img className={styles.footerLineMobile} src="/landing/contacts/footer-line-mobile.svg" alt="" />
      </div>
      <div className={`landing-container ${styles.footerBottom}`}>
        <p>© 2026 {site.name}. {t.rights}</p>
        <div className={styles.legalText}><span>{t.privacy}</span><span>{t.offer}</span></div>
      </div>
    </footer>
  );
}

export default LandingContacts;
