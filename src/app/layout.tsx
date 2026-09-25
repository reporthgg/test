import type { Metadata } from "next";
import "./globals.css";
import WhatsAppBubble from "@/components/WhatsAppBubble";
import StickyMobileCTA from "@/components/StickyMobileCTA";


// Manrope подключается самостоятельно через @font-face в globals.css
// (self-hosted, без обращения к Google Fonts — иначе сборка на хостинге без
// внешнего доступа падает с "fetch failed").
export const metadata: Metadata = {
  title:
    "GSC Study: языковые курсы, IELTS и Digital SAT, поступление за рубеж | Казахстан",
  description:
    "GSC Study: образование без границ с 2011 года. Языковые курсы, подготовка к IELTS и Digital SAT, поступление в вузы Великобритании, Германии, Канады, ОАЭ и США. Офисы в Алматы и Астане.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        <noscript>
          <style>{`.reveal-init{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <div className="fixed inset-0 z-[-1] dots-pattern pointer-events-none" />
        {children}
        <WhatsAppBubble />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
