import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Directions from "@/components/Directions";
import Tests from "@/components/Tests";
import Steps from "@/components/Steps";
import Reviews from "@/components/Reviews";
import Offices from "@/components/Offices";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TrustStrip from "@/components/TrustStrip";
import { getServerLocale } from "@/lib/locale";
import { getPageContent } from "@/lib/page-content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const ov = await getPageContent("home", locale);
  return {
    title:
      ov.metaTitle ??
      "GSC Study: языковые курсы, IELTS и Digital SAT, поступление за рубеж | Казахстан",
    description:
      ov.metaDescription ??
      "GSC Study: образование без границ с 2011 года. Языковые курсы, подготовка к IELTS и Digital SAT, поступление в вузы Великобритании, Германии, Канады, ОАЭ и США. Офисы в Алматы и Астане.",
  };
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-20 relative z-10">
        <Hero />
        <TrustStrip />
        <Reveal>
          <Directions />
        </Reveal>
        <Reveal>
          <Tests />
        </Reveal>
        <Reveal>
          <Steps />
        </Reveal>
        <Reveal>
          <Reviews />
        </Reveal>
        <Reveal>
          <Offices />
        </Reveal>
        <Reveal>
          <Faq />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
