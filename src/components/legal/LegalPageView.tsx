import type { Metadata } from "next";
import type { ReactElement } from "react";
import Link from "next/link";
import LandingHeader from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingContacts";
import { LandingOverlays, LandingProvider } from "@/components/landing/LandingForms";
import { TestHero } from "@/components/test/TestResult";
import { withLocale, type Locale } from "@/i18n/config";
import { buildPageMetadata, htmlLang } from "@/lib/seo";
import { legalChrome, legalDocuments, type LegalPage } from "./legal-content";
import flowStyles from "@/components/test/TestFlow.module.css";
import styles from "./LegalPageView.module.css";
import "@/components/landing/landing.css";

export function legalMetadata(page: LegalPage, locale: Locale): Metadata {
  const t = legalChrome[locale];
  return buildPageMetadata({
    locale,
    path: `/${page}`,
    title: `${t.titles[page]} | GSC Study`,
    description: t.descriptions[page],
    index: locale === "ru",
  });
}

export default function LegalPageView({ locale, page }: { locale: Locale; page: LegalPage }): ReactElement {
  const t = legalChrome[locale];
  const document = legalDocuments[page];
  const other: LegalPage = page === "privacy" ? "consent" : "privacy";

  return (
    <div className={`landing ${flowStyles.shortPage} ${styles.page}`} lang={htmlLang(locale)}>
      <LandingProvider locale={locale}>
        <LandingHeader locale={locale} />
        <main id="landing-main">
          <TestHero title={t.titles[page]} aside={<p className={flowStyles.description}>{t.edition}</p>} />
          <section className={flowStyles.stage} aria-label={t.titles[page]}>
            <div className="landing-container">
              <article className={`${flowStyles.panel} ${styles.document}`} lang="ru">
                {t.note && <p className={styles.note} lang={htmlLang(locale)}>{t.note}</p>}
                {locale !== "ru" && <p className={styles.documentTitle}>{document.title}</p>}
                {document.intro && <p className={styles.intro}>{document.intro}</p>}
                {document.sections.map((section) => (
                  <section key={section.title}>
                    <h2>{section.title}</h2>
                    {section.blocks.map((block, index) => typeof block === "string"
                      ? <p key={index}>{block}</p>
                      : <ul key={index}>{block.map((item) => <li key={item}>{item}</li>)}</ul>)}
                  </section>
                ))}
                <p className={styles.related} lang={htmlLang(locale)}>
                  {t.related} <Link href={withLocale(locale, `/${other}`)}>{t.titles[other]}</Link>
                </p>
              </article>
            </div>
          </section>
        </main>
        <LandingFooter locale={locale} />
        <LandingOverlays />
      </LandingProvider>
    </div>
  );
}
