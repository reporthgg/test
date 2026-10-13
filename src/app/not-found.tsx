import type { Metadata } from "next";
import type { ReactElement } from "react";
import Link from "next/link";
import LandingHeader from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingContacts";
import { LandingOverlays, LandingProvider } from "@/components/landing/LandingForms";
import { TestHero } from "@/components/test/TestResult";
import { withLocale } from "@/i18n/config";
import { getServerLocale } from "@/lib/locale";
import { hiddenRobots, htmlLang } from "@/lib/seo";
import { notFoundCopy } from "@/lib/seo-content";
import flowStyles from "@/components/test/TestFlow.module.css";
import "@/components/landing/landing.css";

export async function generateMetadata(): Promise<Metadata> {
  const { title, text } = notFoundCopy[await getServerLocale()];
  return { title, description: text, robots: hiddenRobots, openGraph: null, twitter: null };
}

export default async function NotFound(): Promise<ReactElement> {
  const locale = await getServerLocale();
  const t = notFoundCopy[locale];

  return (
    <div className={`landing ${flowStyles.shortPage}`} lang={htmlLang(locale)}>
      <LandingProvider locale={locale}>
        <LandingHeader locale={locale} />
        <main id="landing-main">
          <TestHero
            title={t.heading}
            last
            aside={
              <>
                <p className={flowStyles.description}>{t.text}</p>
                <div className={flowStyles.actions}>
                  <Link href={withLocale(locale, "/")} className="landing-button">
                    {t.home}
                  </Link>
                  <Link href={withLocale(locale, "/tests")} className={flowStyles.textButton}>
                    {t.tests}
                  </Link>
                </div>
              </>
            }
          />
        </main>
        <LandingFooter locale={locale} />
        <LandingOverlays />
      </LandingProvider>
    </div>
  );
}
