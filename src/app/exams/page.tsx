import type { Metadata } from "next";
import type { ReactElement } from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingContacts";
import { OfficesSection } from "@/components/landing/OfficesSection";
import { LandingOverlays, LandingProvider } from "@/components/landing/LandingForms";
import { ExamsHero } from "@/components/exams/ExamsHero";
import { ExamsResults } from "@/components/exams/ExamsResults";
import { ExamsTests } from "@/components/exams/ExamsTests";
import { ExamsChoice } from "@/components/exams/ExamsChoice";
import { ExamsOffer } from "@/components/exams/ExamsOffer";
import { ExamsSteps } from "@/components/exams/ExamsSteps";
import { ExamsFaq } from "@/components/exams/ExamsFaq";
import JsonLd from "@/components/JsonLd";
import { getServerLocale } from "@/lib/locale";
import { getPageContent } from "@/lib/page-content";
import { pageMetadata } from "@/lib/page-metadata";
import { pageJsonLd } from "@/lib/structured-data";
import "@/components/landing/landing.css";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("exams", await getServerLocale());
}

export default async function ExamsPage(): Promise<ReactElement> {
  const locale = await getServerLocale();
  const overrides = await getPageContent("exams", locale);

  return (
    <div className="landing" lang={locale === "kz" ? "kk" : locale}>
      <JsonLd data={pageJsonLd("exams", locale)} />
      <LandingProvider locale={locale} scope="exams">
        <LandingHeader locale={locale} />
        <main id="landing-main">
          <ExamsHero locale={locale} overrides={overrides} />
          <ExamsResults locale={locale} />
          <ExamsTests locale={locale} />
          <ExamsChoice locale={locale} />
          <ExamsOffer locale={locale} />
          <ExamsSteps locale={locale} />
          <OfficesSection locale={locale} layer={1} />
          <ExamsFaq locale={locale} />
        </main>
        <LandingFooter locale={locale} />
        <LandingOverlays />
      </LandingProvider>
    </div>
  );
}
