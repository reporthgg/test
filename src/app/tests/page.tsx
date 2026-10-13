import type { Metadata } from "next";
import type { ReactElement } from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingContacts";
import { LandingOverlays, LandingProvider } from "@/components/landing/LandingForms";
import { TestsHero } from "@/components/tests/TestsHero";
import { TestsList } from "@/components/tests/TestsList";
import { getServerLocale } from "@/lib/locale";
import "@/components/landing/landing.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Онлайн-тесты уровня: English, IELTS, SAT | GSC Study",
  description:
    "Бесплатные онлайн-тесты по английскому для взрослых и детей, IELTS и SAT. Письменные задания проверяет преподаватель.",
};

export default async function TestsHubPage(): Promise<ReactElement> {
  const locale = await getServerLocale();

  return (
    <div className="landing" lang={locale === "kz" ? "kk" : locale}>
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
