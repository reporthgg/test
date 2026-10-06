"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isLocale, locales, withLocale, type Locale } from "@/i18n/config";
import { site } from "@/lib/site";
import { useLandingActions } from "@/components/landing/LandingForms";
import { heroContent } from "./hero-content";
import styles from "./LandingHeader.module.css";

const languageLabels: Record<Locale, string> = { ru: "Рус", kz: "Қаз", en: "Eng" };
const destinations = ["/school", "/exams", "/abroad", "/camps", "/#offices"] as const;

export default function LandingHeader({ locale }: { locale: Locale }): ReactElement {
  const text = heroContent[locale];
  const router = useRouter();
  const { openLead } = useLandingActions();
  const markerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDialogElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;
    const observer = new IntersectionObserver(([entry]) => {
      setScrolled(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  function closeMenu(): void {
    menuRef.current?.close();
    setMenuOpen(false);
  }

  function consult(): void {
    closeMenu();
    openLead("diagnostic");
  }

  function changeLanguage(value: string): void {
    if (!isLocale(value)) return;
    closeMenu();
    router.push(withLocale(value, "/"));
  }

  const programLinks = [
    { label: text.nav[0], href: "/school" },
    { label: text.ielts, href: "/exams" },
    { label: "Digital SAT", href: "/exams" },
    { label: text.abroad, href: "/abroad" },
    { label: text.camps, href: "/camps" },
  ];
  const companyLinks = [
    { label: text.about, href: "/about" },
    { label: text.centers, href: "/#offices" },
    { label: text.reviews, href: "/#reviews" },
    { label: text.nav[0], href: "/school" },
  ];

  return (
    <>
      <div ref={markerRef} className={styles.marker} aria-hidden="true" />
      <a href="#landing-main" className={styles.skip}>{text.skip}</a>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          <Link href={withLocale(locale, "/")} className={styles.logo} aria-label="GSC Study">
            <Image src="/landing/hero/logo.png" width={114} height={46} alt="GSC Study" priority />
          </Link>
          <nav className={styles.desktopNav} aria-label={text.menu}>
            {destinations.map((href, index) => (
              <Link href={withLocale(locale, href)} key={href}>{text.nav[index]}</Link>
            ))}
            <select
              aria-label={text.language}
              className={styles.language}
              value={locale}
              onChange={(event) => changeLanguage(event.target.value)}
            >
              {locales.map((language) => (
                <option key={language} value={language}>{languageLabels[language]}</option>
              ))}
            </select>
          </nav>
          <button type="button" onClick={consult} className={styles.consult}>
            {text.consultation}
          </button>
          <button
            className={styles.menuButton}
            type="button"
            aria-label={text.menu}
            aria-expanded={menuOpen}
            aria-controls="landing-menu"
            onClick={() => {
              menuRef.current?.showModal();
              setMenuOpen(true);
            }}
          >
            <Image src="/landing/hero/menu.svg" width={40} height={40} alt="" />
          </button>
        </div>
      </header>
      <dialog
        id="landing-menu"
        ref={menuRef}
        className={styles.menu}
        aria-label={text.menu}
        onClose={() => setMenuOpen(false)}
        onCancel={() => setMenuOpen(false)}
      >
        <div className={styles.menuTop}>
          <Link href={withLocale(locale, "/")} onClick={closeMenu}>
            <Image src="/landing/hero/logo.png" width={94} height={38} alt="GSC Study" />
          </Link>
          <button type="button" onClick={consult} className={styles.menuConsult}>
            {text.consultation}
          </button>
          <button type="button" className={styles.menuButton} onClick={closeMenu} aria-label={text.close}>
            <Image src="/landing/hero/close.png" width={40} height={40} alt="" />
          </button>
        </div>
        <div className={styles.menuColumns}>
          <nav aria-label={text.programs}>
            <h2>{text.programs}</h2>
            {programLinks.map((link) => (
              <Link href={withLocale(locale, link.href)} key={link.label} onClick={closeMenu}>
                {link.label}
              </Link>
            ))}
          </nav>
          <nav aria-label={text.company}>
            <h2>{text.company}</h2>
            {companyLinks.map((link) => (
              <Link href={withLocale(locale, link.href)} key={link.href} onClick={closeMenu}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className={styles.menuLanguage} aria-label={text.language}>
          {locales.map((language) => (
            <button
              type="button"
              key={language}
              onClick={() => changeLanguage(language)}
              aria-pressed={language === locale}
            >
              {languageLabels[language]}
            </button>
          ))}
        </div>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.contacts}>
          <h2>{text.contacts}</h2>
          <div className={styles.contactGrid}>
            <div><span>{text.callCenter}</span><a href={`tel:${site.phone.tel}`}>{site.phone.display}</a></div>
            <div><span>WhatsApp:</span><a href={site.whatsapp.link} target="_blank" rel="noreferrer">{site.whatsapp.display}</a></div>
            <div><span>Email:</span><a href={`mailto:${site.email}`}>{site.email}</a></div>
            <div><span>{text.hours}</span><strong>{text.weekdays}<br />{text.saturday}</strong></div>
          </div>
          <div className={styles.socials}>
            <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Image src="/landing/hero/instagram.svg" width={25} height={25} alt="" />
            </a>
            <a href={site.whatsapp.link} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <Image src="/landing/hero/whatsapp.svg" width={25} height={25} alt="" />
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
