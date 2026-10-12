import type { Metadata } from "next";
import type { ReactElement } from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingContacts";
import { LandingOverlays, LandingProvider } from "@/components/landing/LandingForms";
import CampsHero from "@/components/camps/CampsHero";
import { CampsResults } from "@/components/camps/CampsResults";
import { CampsCatalog } from "@/components/camps/CampsCatalog";
import { CampsCare, CampsIncluded, CampsSchedule, CampsSteps } from "@/components/camps/CampsExperience";
import { CampsTour } from "@/components/camps/CampsTour";
import { CampsFaq } from "@/components/camps/CampsFaq";
import { getServerLocale } from "@/lib/locale";
import { getPageContent } from "@/lib/page-content";
import "@/components/landing/landing.css";

// Смены берутся из админки при каждом запросе.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const ov = await getPageContent("camps", locale);
  return {
    title:
      ov.metaTitle ??
      "Языковые лагеря за рубежом: лето 2026 для школьников | GSC Study",
    description:
      ov.metaDescription ??
      "Языковые лагеря за рубежом для школьников 12-17 лет. Уроки английского, экскурсии, проживание и сопровождающий от GSC Study.",
  };
}

export default async function CampsPage(): Promise<ReactElement> {
  const locale = await getServerLocale();

  return (
    <div className="landing" lang={locale === "kz" ? "kk" : locale}>
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
          <CampsFaq locale={locale} />
        </main>
        <LandingFooter locale={locale} />
        <LandingOverlays />
      </LandingProvider>
    </div>
  );
}
