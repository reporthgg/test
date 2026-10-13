import type { Metadata } from "next";
import type { ReactElement } from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingContacts";
import { LandingOverlays, LandingProvider } from "@/components/landing/LandingForms";
import { ExamsHero } from "@/components/exams/ExamsHero";
import { ExamsResults } from "@/components/exams/ExamsResults";
import { ExamsTests } from "@/components/exams/ExamsTests";
import { ExamsChoice } from "@/components/exams/ExamsChoice";
import { ExamsSteps } from "@/components/exams/ExamsSteps";
import { ExamsFaq } from "@/components/exams/ExamsFaq";
import { getServerLocale } from "@/lib/locale";
import { getPageContent } from "@/lib/page-content";
import "@/components/landing/landing.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const ov = await getPageContent("exams", locale);
  return {
    title:
      ov.metaTitle ??
      "Подготовка к IELTS и Digital SAT на нужный балл | GSC Study",
    description:
      ov.metaDescription ??
      "Подготовка к IELTS (Academic и General Training) и Digital SAT: диагностика, план до целевого балла, тренировка по секциям и пробные тесты. Средний балл IELTS 7.0+.",
  };
}

export default async function ExamsPage(): Promise<ReactElement> {
  const locale = await getServerLocale();
  const overrides = await getPageContent("exams", locale);

  return (
    <div className="landing" lang={locale === "kz" ? "kk" : locale}>
      <LandingProvider locale={locale} scope="exams">
        <LandingHeader locale={locale} />
        <main id="landing-main">
          <ExamsHero locale={locale} overrides={overrides} />
          <ExamsResults locale={locale} />
          <ExamsTests locale={locale} />
          <ExamsChoice locale={locale} />
          <ExamsSteps locale={locale} />
          <ExamsFaq locale={locale} />
        </main>
        <LandingFooter locale={locale} />
        <LandingOverlays />
      </LandingProvider>
    </div>
  );
}
