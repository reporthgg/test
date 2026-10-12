import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThankYou from "@/components/test/ThankYou";
import Aurora from "@/components/ui/Aurora";

// Страница благодарности после отправки теста: её адрес используется для конверсий в Meta.
export const metadata: Metadata = {
  title: "Спасибо! | GSC Study",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-background bg-dots relative overflow-hidden">
        <Aurora intensity="subtle" />
        <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
          <ThankYou />
        </div>
      </main>
      <Footer />
    </>
  );
}
