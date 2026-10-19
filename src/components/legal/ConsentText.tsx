import type { ReactElement } from "react";
import { withLocale, type Locale } from "@/i18n/config";
import { consentLabel } from "./legal-content";

export default function ConsentText({ locale, className }: { locale: Locale; className?: string }): ReactElement {
  const [before, consent, middle, privacy, after] = consentLabel[locale];
  return (
    <span className={className}>
      {before}
      <a className="consent-link" href={withLocale(locale, "/consent")} target="_blank" rel="noopener">{consent}</a>
      {middle}
      <a className="consent-link" href={withLocale(locale, "/privacy")} target="_blank" rel="noopener">{privacy}</a>
      {after}
    </span>
  );
}
