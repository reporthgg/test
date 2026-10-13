"use client";

import { useState, useSyncExternalStore, type ReactElement } from "react";
import { withLocale, type Locale } from "@/i18n/config";
import { cookieNoticeContent } from "./legal-content";
import styles from "./CookieNotice.module.css";

const STORAGE_KEY = "gsc-cookie-notice";

function subscribe(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function wasDismissed(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export default function CookieNotice({ locale }: { locale: Locale }): ReactElement | null {
  const stored = useSyncExternalStore(subscribe, wasDismissed, () => true);
  const [dismissed, setDismissed] = useState(false);
  if (stored || dismissed) return null;
  const t = cookieNoticeContent[locale];

  function dismiss(): void {
    setDismissed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      return;
    }
  }

  return (
    <section className={styles.notice} aria-label={t.label}>
      <p>
        {t.text} <a href={withLocale(locale, "/privacy")}>{t.link}</a>.
      </p>
      <button type="button" onClick={dismiss}>{t.accept}</button>
    </section>
  );
}
