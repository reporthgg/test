import type { Metadata } from "next";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingHero from "@/components/landing/LandingHero";
import LandingPrograms from "@/components/landing/LandingPrograms";
import LandingStories from "@/components/landing/LandingStories";
import { LandingContacts, LandingFooter } from "@/components/landing/LandingContacts";
import { LandingProvider, LandingOverlays, TrialSection } from "@/components/landing/LandingForms";
import type { Locale } from "@/i18n/config";
import { getServerLocale } from "@/lib/locale";
import { getPageContent } from "@/lib/page-content";
import "@/components/landing/landing.css";

const homeMetadata: Record<Locale, { title: string; description: string }> = {
  ru: {
    title: "GSC Study: языковые курсы, IELTS и Digital SAT, поступление за рубеж | Казахстан",
    description: "GSC Study: образование без границ с 2011 года. Языковые курсы, подготовка к IELTS и Digital SAT, поступление в вузы Великобритании, Германии, Канады, ОАЭ и США. Офисы в Алматы и Астане.",
  },
  kz: {
    title: "GSC Study: тіл курстары, IELTS және Digital SAT, шетелде оқу | Қазақстан",
    description: "GSC Study: 2011 жылдан бері шекарасыз білім. Тіл курстары, IELTS және Digital SAT емтихандарына дайындық, шетелдік университеттерге түсу. Алматы мен Астанадағы орталықтар.",
  },
  en: {
    title: "GSC Study: language courses, IELTS, Digital SAT and study abroad | Kazakhstan",
    description: "Education without borders since 2011. Language courses, IELTS and Digital SAT preparation, and university admissions abroad. GSC Study centres in Almaty and Astana.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const ov = await getPageContent("home", locale);
  return {
    title: ov.metaTitle ?? homeMetadata[locale].title,
    description: ov.metaDescription ?? homeMetadata[locale].description,
  };
}

export default async function Home() {
  const locale = await getServerLocale();
  return (
    <div className="landing" lang={locale === "kz" ? "kk" : locale}>
      <LandingProvider locale={locale}>
        <LandingHeader locale={locale} />
        <main id="landing-main">
          <LandingHero locale={locale} />
          <LandingPrograms locale={locale} />
          <LandingStories locale={locale} />
          <LandingContacts locale={locale} />
          <TrialSection />
        </main>
        <LandingFooter locale={locale} />
        <LandingOverlays />
      </LandingProvider>
    </div>
  );
}
