import type { ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { StoriesCases, StoriesLetters } from "@/components/landing/StoriesGallery";

export function LandingStories({ locale }: { locale: Locale }): ReactElement {
  return (
    <>
      <StoriesCases locale={locale} />
      <StoriesLetters locale={locale} />
    </>
  );
}

export default LandingStories;
