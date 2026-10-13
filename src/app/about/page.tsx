import type { Metadata } from "next";
import type { ReactElement } from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingContacts";
import { LandingOverlays, LandingProvider } from "@/components/landing/LandingForms";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutJourney } from "@/components/about/AboutJourney";
import { AboutPartners, AboutValues } from "@/components/about/AboutValues";
import { AboutCenters, AboutCta } from "@/components/about/AboutContact";
import JsonLd from "@/components/JsonLd";
import { getServerLocale } from "@/lib/locale";
import { getPageContent } from "@/lib/page-content";
import { pageMetadata } from "@/lib/page-metadata";
import { pageJsonLd } from "@/lib/structured-data";
import "@/components/landing/landing.css";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("about", await getServerLocale());
}

export default async function AboutPage(): Promise<ReactElement> {
  const locale = await getServerLocale();
  const overrides = await getPageContent("about", locale);

  return (
    <div className="landing" lang={locale === "kz" ? "kk" : locale}>
      <JsonLd data={pageJsonLd("about", locale)} />
      <LandingProvider locale={locale} scope="about">
        <LandingHeader locale={locale} />
        <main id="landing-main">
          <AboutHero locale={locale} overrides={overrides} />
          <AboutJourney locale={locale} />
          <AboutValues locale={locale} />
          <AboutPartners locale={locale} />
          <AboutCenters locale={locale} />
          <AboutCta locale={locale} />
        </main>
        <LandingFooter locale={locale} />
        <LandingOverlays />
      </LandingProvider>
    </div>
  );
}
