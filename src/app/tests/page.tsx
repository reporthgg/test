import type { Metadata } from "next";
import type { ReactElement } from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingContacts";
import { LandingOverlays, LandingProvider } from "@/components/landing/LandingForms";
import { TestsHero } from "@/components/tests/TestsHero";
import { TestsList } from "@/components/tests/TestsList";
import JsonLd from "@/components/JsonLd";
import { getServerLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/page-metadata";
import { pageJsonLd } from "@/lib/structured-data";
import "@/components/landing/landing.css";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("tests", await getServerLocale());
}

export default async function TestsHubPage(): Promise<ReactElement> {
  const locale = await getServerLocale();

  return (
    <div className="landing" lang={locale === "kz" ? "kk" : locale}>
      <JsonLd data={pageJsonLd("tests", locale)} />
      <LandingProvider locale={locale} scope="tests">
        <LandingHeader locale={locale} />
        <main id="landing-main">
          <TestsHero locale={locale} />
          <TestsList locale={locale} />
        </main>
        <LandingFooter locale={locale} />
        <LandingOverlays />
      </LandingProvider>
    </div>
  );
}
