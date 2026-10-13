import type { Metadata } from "next";
import type { ReactElement } from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingContacts";
import {
  LandingOverlays,
  LandingProvider,
  SchoolTrialSection,
  TrialSection,
} from "@/components/landing/LandingForms";
import SchoolHero, { SchoolTrust } from "@/components/school/SchoolHero";
import { SchoolResults } from "@/components/school/SchoolResults";
import SchoolPrograms from "@/components/school/SchoolPrograms";
import SchoolOffer from "@/components/school/SchoolOffer";
import SchoolTests from "@/components/school/SchoolTests";
import SchoolTeaching from "@/components/school/SchoolTeaching";
import SchoolTeachers from "@/components/school/SchoolTeachers";
import SchoolCertificate from "@/components/school/SchoolCertificate";
import { SchoolContacts } from "@/components/school/SchoolContacts";
import SchoolWhatsApp from "@/components/school/SchoolWhatsApp";
import JsonLd from "@/components/JsonLd";
import { getServerLocale } from "@/lib/locale";
import { getPageContent } from "@/lib/page-content";
import { pageMetadata } from "@/lib/page-metadata";
import { pageJsonLd } from "@/lib/structured-data";
import "@/components/landing/landing.css";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("school", await getServerLocale());
}

export default async function SchoolPage(): Promise<ReactElement> {
  const locale = await getServerLocale();
  const overrides = await getPageContent("school", locale);

  return (
    <div className="landing" lang={locale === "kz" ? "kk" : locale}>
      <JsonLd data={pageJsonLd("school", locale)} />
      <LandingProvider locale={locale} scope="school">
        <LandingHeader locale={locale} />
        <main id="landing-main">
          <SchoolHero locale={locale} overrides={overrides} />
          <SchoolTrust locale={locale} />
          <SchoolResults locale={locale} />
          <SchoolPrograms locale={locale} />
          <SchoolOffer locale={locale} />
          <SchoolTests locale={locale} />
          <SchoolTeaching locale={locale} />
          <SchoolTeachers locale={locale} />
          <SchoolCertificate locale={locale} />
          <SchoolTrialSection />
          <SchoolContacts locale={locale} />
          <TrialSection />
        </main>
        <LandingFooter locale={locale} />
        <LandingOverlays showWhatsapp={false} />
        <SchoolWhatsApp locale={locale} />
      </LandingProvider>
    </div>
  );
}
