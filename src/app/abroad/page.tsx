import type { Metadata } from "next";
import type { ReactElement } from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingContacts";
import { LandingOverlays, LandingProvider } from "@/components/landing/LandingForms";
import { AbroadHero } from "@/components/abroad/AbroadHero";
import { AbroadStories } from "@/components/abroad/AbroadStories";
import { AbroadCountries } from "@/components/abroad/AbroadCountries";
import { AbroadSituations } from "@/components/abroad/AbroadSituations";
import { AbroadServices } from "@/components/abroad/AbroadServices";
import { AbroadTimeline } from "@/components/abroad/AbroadTimeline";
import { AbroadFaq } from "@/components/abroad/AbroadFaq";
import { getServerLocale } from "@/lib/locale";
import { getPageContent } from "@/lib/page-content";
import "@/components/landing/landing.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const ov = await getPageContent("abroad", locale);
  return {
    title:
      ov.metaTitle ??
      "Образование за рубежом: поступление в вузы 25+ стран | GSC Study",
    description:
      ov.metaDescription ??
      "Поступление в университеты Великобритании, Германии, Канады, ОАЭ и США. Подбор программы, документы, мотивационное письмо и сопровождение до зачисления. Foundation, Bachelor, Pre-Master.",
  };
}

export default async function AbroadPage(): Promise<ReactElement> {
  const locale = await getServerLocale();
  const overrides = await getPageContent("abroad", locale);

  return (
    <div className="landing" lang={locale === "kz" ? "kk" : locale}>
      <LandingProvider locale={locale} scope="abroad">
        <LandingHeader locale={locale} />
        <main id="landing-main">
          <AbroadHero locale={locale} overrides={overrides} />
          <AbroadStories locale={locale} />
          <AbroadCountries locale={locale} />
          <AbroadSituations locale={locale} />
          <AbroadServices locale={locale} />
          <AbroadTimeline locale={locale} />
          <AbroadFaq locale={locale} />
        </main>
        <LandingFooter locale={locale} />
        <LandingOverlays />
      </LandingProvider>
    </div>
  );
}
