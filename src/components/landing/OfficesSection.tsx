import type { ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { LandingOffices } from "@/components/landing/LandingContacts";
import styles from "./OfficesSection.module.css";

export function OfficesSection({
  locale,
  layer,
  mobileOverlap,
}: {
  locale: Locale;
  layer: number;
  mobileOverlap?: 36;
}): ReactElement {
  return (
    <div className={styles.section} style={{ zIndex: layer }} data-overlap={mobileOverlap}>
      <LandingOffices locale={locale} />
    </div>
  );
}
