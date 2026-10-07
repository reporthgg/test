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
import SchoolTests from "@/components/school/SchoolTests";
import SchoolTeaching from "@/components/school/SchoolTeaching";
import SchoolTeachers from "@/components/school/SchoolTeachers";
import SchoolCertificate from "@/components/school/SchoolCertificate";
import { SchoolContacts } from "@/components/school/SchoolContacts";
import SchoolWhatsApp from "@/components/school/SchoolWhatsApp";
import { getServerLocale } from "@/lib/locale";
import { getPageContent } from "@/lib/page-content";
import "@/components/landing/landing.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const overrides = await getPageContent("school", locale);
  return {
    title: overrides.metaTitle ??
      "Языковая школа: курсы английского A1-C2 в Алматы и Астане | GSC Study",
    description: overrides.metaDescription ??
      "Курсы английского языка от A1 до C2: общий, академический, деловой и детский. Группы до восьми человек, индивидуальные занятия и онлайн. Тест уровня и пробный урок бесплатно.",
  };
}

export default async function SchoolPage(): Promise<ReactElement> {
  const locale = await getServerLocale();
  const overrides = await getPageContent("school", locale);

  return (
    <div className="landing" lang={locale === "kz" ? "kk" : locale}>
      <LandingProvider locale={locale} scope="school">
        <LandingHeader locale={locale} />
        <main id="landing-main">
          <SchoolHero locale={locale} overrides={overrides} />
          <SchoolTrust locale={locale} />
          <SchoolResults locale={locale} />
          <SchoolPrograms locale={locale} />
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
