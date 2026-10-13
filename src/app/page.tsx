import type { Metadata } from "next";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingHero from "@/components/landing/LandingHero";
import LandingPrograms from "@/components/landing/LandingPrograms";
import LandingStories from "@/components/landing/LandingStories";
import { LandingContacts, LandingFooter } from "@/components/landing/LandingContacts";
import { LandingProvider, LandingOverlays, TrialSection } from "@/components/landing/LandingForms";
import JsonLd from "@/components/JsonLd";
import { getServerLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/page-metadata";
import { pageJsonLd } from "@/lib/structured-data";
import "@/components/landing/landing.css";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("home", await getServerLocale());
}

export default async function Home() {
  const locale = await getServerLocale();
  return (
    <div className="landing" lang={locale === "kz" ? "kk" : locale}>
      <JsonLd data={pageJsonLd("home", locale)} />
      <LandingProvider locale={locale}>
        <LandingHeader locale={locale} />
        <main id="landing-main">
          <LandingHero locale={locale} />
          <LandingPrograms locale={locale} />
          <LandingStories locale={locale} />
          <LandingContacts locale={locale} />
          <TrialSection />
        </main>
        <LandingFooter locale={locale} />
        <LandingOverlays />
      </LandingProvider>
    </div>
  );
}
