import type { Metadata } from "next";
import type { ReactElement } from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingContacts";
import { OfficesSection } from "@/components/landing/OfficesSection";
import { LandingOverlays, LandingProvider } from "@/components/landing/LandingForms";
import CampsHero from "@/components/camps/CampsHero";
import { CampsResults } from "@/components/camps/CampsResults";
import { CampsCatalog } from "@/components/camps/CampsCatalog";
import { CampsCare, CampsIncluded, CampsSchedule, CampsSteps } from "@/components/camps/CampsExperience";
import { CampsTour } from "@/components/camps/CampsTour";
import { CampsFaq } from "@/components/camps/CampsFaq";
import JsonLd from "@/components/JsonLd";
import { getServerLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/page-metadata";
import { pageJsonLd } from "@/lib/structured-data";
import "@/components/landing/landing.css";

// Смены берутся из админки при каждом запросе.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("camps", await getServerLocale());
}

export default async function CampsPage(): Promise<ReactElement> {
  const locale = await getServerLocale();

  return (
    <div className="landing" lang={locale === "kz" ? "kk" : locale}>
      <JsonLd data={pageJsonLd("camps", locale)} />
      <LandingProvider locale={locale} scope="camps">
        <LandingHeader locale={locale} />
        <main id="landing-main">
          <CampsHero locale={locale} />
          <CampsResults locale={locale} />
          <CampsCatalog locale={locale} />
          <CampsIncluded locale={locale} />
          <CampsSchedule locale={locale} />
          <CampsCare locale={locale} />
          <CampsSteps locale={locale} />
          <CampsTour locale={locale} />
          <OfficesSection locale={locale} layer={0} mobileOverlap={36} />
          <CampsFaq locale={locale} />
        </main>
        <LandingFooter locale={locale} />
        <LandingOverlays />
      </LandingProvider>
    </div>
  );
}
