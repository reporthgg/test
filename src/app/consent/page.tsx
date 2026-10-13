import type { Metadata } from "next";
import type { ReactElement } from "react";
import LegalPageView, { legalMetadata } from "@/components/legal/LegalPageView";
import { getServerLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  return legalMetadata("consent", await getServerLocale());
}

export default async function ConsentPage(): Promise<ReactElement> {
  return <LegalPageView locale={await getServerLocale()} page="consent" />;
}
