import type { Metadata } from "next";
import type { ReactElement } from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingContacts";
import { LandingOverlays, LandingProvider } from "@/components/landing/LandingForms";
import ThankYou from "@/components/test/ThankYou";
import { getServerLocale } from "@/lib/locale";
import { hiddenRobots } from "@/lib/seo";
import { thankYouSeoCopy } from "@/lib/seo-content";
import flowStyles from "@/components/test/TestFlow.module.css";
import "@/components/landing/landing.css";

// Страница благодарности после отправки теста: её адрес используется для конверсий в Meta.
export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = thankYouSeoCopy[await getServerLocale()];
  return {
    title,
    description,
    robots: hiddenRobots,
    openGraph: null,
    twitter: null,
  };
}

export default async function ThankYouPage(): Promise<ReactElement> {
  const locale = await getServerLocale();

  return (
    <div className={`landing ${flowStyles.shortPage}`} lang={locale === "kz" ? "kk" : locale}>
      <LandingProvider locale={locale} scope="tests">
        <LandingHeader locale={locale} />
        <main id="landing-main">
          <ThankYou />
        </main>
        <LandingFooter locale={locale} />
        <LandingOverlays />
      </LandingProvider>
    </div>
  );
}
