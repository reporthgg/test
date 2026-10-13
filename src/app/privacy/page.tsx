import type { Metadata } from "next";
import type { ReactElement } from "react";
import LegalPageView, { legalMetadata } from "@/components/legal/LegalPageView";
import { getServerLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  return legalMetadata("privacy", await getServerLocale());
}

export default async function PrivacyPage(): Promise<ReactElement> {
  return <LegalPageView locale={await getServerLocale()} page="privacy" />;
}
