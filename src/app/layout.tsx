import type { Metadata, Viewport } from "next";
import "./globals.css";
import WhatsAppBubble from "@/components/WhatsAppBubble";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import MetaPixel from "@/components/MetaPixel";
import { locales } from "@/i18n/config";
import { getServerLocale } from "@/lib/locale";
import { htmlLang, ogImage, ogLocales, siteUrl } from "@/lib/seo";
import { seoCopy } from "@/lib/seo-content";
import { site } from "@/lib/site";


// Manrope подключается самостоятельно через @font-face в globals.css
// (self-hosted, без обращения к Google Fonts — иначе сборка на хостинге без
// внешнего доступа падает с "fetch failed").
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const { title, description } = seoCopy.home[locale];
  const image = { ...ogImage, alt: site.name };
  return {
    metadataBase: new URL(siteUrl()),
    applicationName: site.name,
    title,
    description,
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      locale: ogLocales[locale],
      alternateLocale: locales.filter((item) => item !== locale).map((item) => ogLocales[item]),
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#135685",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getServerLocale();
  return (
    <html lang={htmlLang(locale)}>
      <body className="antialiased">
        <div className="fixed inset-0 z-[-1] dots-pattern pointer-events-none" />
        {children}
        <WhatsAppBubble />
        <StickyMobileCTA />
        <MetaPixel />
      </body>
    </html>
  );
}
