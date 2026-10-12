"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { site } from "@/lib/site";
import { useLocale } from "@/i18n/useLocale";
import { getDictionary } from "@/i18n/dictionaries";
import { getTestsDict } from "@/i18n/pages/tests";
import { parseStoredTestResult, readStoredTestResult } from "./test-result-storage";
import TestResult from "./TestResult";

const noSubscription = () => () => {};

export default function ThankYou() {
  const locale = useLocale();
  const t = getTestsDict(locale);
  // На сервере sessionStorage нет: до гидратации показываем загрузку, а не общий текст.
  const raw = useSyncExternalStore(noSubscription, readStoredTestResult, () => undefined);
  const stored = useMemo(() => (raw === undefined ? undefined : parseStoredTestResult(raw)), [raw]);

  return (
    <div className="max-w-2xl mx-auto card-premium card-ring rounded-2xl bg-white p-7 md:p-12 shadow-premium">
      {stored === undefined ? (
        <div className="py-16 text-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
        </div>
      ) : stored ? (
        <TestResult
          title={stored.title}
          result={stored.result}
          heading={<h1 className="text-3xl md:text-4xl font-extrabold mb-6"><span className="text-gradient">{t.thankYou.testTitle}</span></h1>}
        />
      ) : (
        <div className="text-center py-4">
          <div className="w-16 h-16 rounded-full bg-clever-green/10 text-clever-green flex items-center justify-center mx-auto mb-6 shadow-premium">
            <Icon name="check" className="text-3xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4"><span className="text-gradient">{t.thankYou.title}</span></h1>
          <p className="text-on-surface-variant mb-8 max-w-lg mx-auto leading-relaxed">{t.thankYou.text}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={site.whatsapp.link} target="_blank" rel="noopener" className="btn-primary px-6 py-3 rounded-xl font-bold">
              {getDictionary(locale).actions.writeWhatsApp}
            </a>
            <Link href="/" className="btn-outline px-6 py-3 rounded-xl font-bold bg-white">
              {t.result.home}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
