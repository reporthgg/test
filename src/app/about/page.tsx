import type { Metadata } from "next";
import type { ReactElement } from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingContacts";
import { LandingOverlays, LandingProvider } from "@/components/landing/LandingForms";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutJourney } from "@/components/about/AboutJourney";
import { AboutPartners, AboutValues } from "@/components/about/AboutValues";
import { AboutCenters, AboutCta } from "@/components/about/AboutContact";
import { getServerLocale } from "@/lib/locale";
import { getPageContent } from "@/lib/page-content";
import "@/components/landing/landing.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const ov = await getPageContent("about", locale);
  return {
    title: ov.metaTitle ?? "О нас | GSC Study",
    description:
      ov.metaDescription ??
      "GSC Study: образование без границ с 2011 года. Более 15 000 студентов, центры в Алматы и Астане, поступление в вузы 25+ стран.",
  };
}

export default async function AboutPage(): Promise<ReactElement> {
  const locale = await getServerLocale();
  const overrides = await getPageContent("about", locale);

  return (
    <div className="landing" lang={locale === "kz" ? "kk" : locale}>
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
