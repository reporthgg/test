/* eslint-disable @next/next/no-img-element -- Оригинальная иконка WhatsApp из Figma. */

import type { ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";
import styles from "./SchoolWhatsApp.module.css";

const content: Record<Locale, { question: string; action: string; label: string }> = {
  ru: { question: "Есть вопросы? Ментор на связи.", action: "Перейти в WhatsApp", label: "Связаться с нами в WhatsApp" },
  en: { question: "Any questions? Your mentor is here.", action: "Open WhatsApp", label: "Contact us on WhatsApp" },
  kz: { question: "Сұрақтарыңыз бар ма? Ментор байланыста.", action: "WhatsApp-қа өту", label: "Бізбен WhatsApp арқылы байланысу" },
};

export default function SchoolWhatsApp({ locale }: { locale: Locale }): ReactElement {
  const t = content[locale];

  return (
    <>
      <div id="school-whatsapp-panel" popover="auto" className={styles.panel}>
        <p>{t.question}</p>
        <a href={site.whatsapp.link} target="_blank" rel="noopener noreferrer">{t.action}</a>
      </div>
      <button
        className={styles.trigger}
        type="button"
        popoverTarget="school-whatsapp-panel"
        popoverTargetAction="toggle"
        aria-label={t.label}
      >
        <img src="/landing/forms/whatsapp.svg" alt="" />
      </button>
    </>
  );
}
