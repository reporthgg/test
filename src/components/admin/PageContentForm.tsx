"use client";

import { useState, useTransition } from "react";
import { savePageContent } from "@/app/admin/(panel)/pages/actions";
import type { PageOverride } from "@/lib/page-content";

const LOCALES = ["ru", "kz", "en"] as const;
type LocaleKey = (typeof LOCALES)[number];

const LOCALE_LABELS: Record<LocaleKey, string> = {
  ru: "Русский",
  kz: "Қазақша",
  en: "English",
};

const PLACEHOLDER = "оставьте пустым для значения по умолчанию";

type FieldKey = keyof PageOverride;

export default function PageContentForm({
  slug,
  values,
}: {
  slug: string;
  values: Record<string, PageOverride>;
}) {
  const isHome = slug === "home";

  const [state, setState] = useState<Record<LocaleKey, PageOverride>>(() => {
    const init = {} as Record<LocaleKey, PageOverride>;
    for (const l of LOCALES) init[l] = { ...(values[l] ?? {}) };
    return init;
  });
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cls =
    "w-full rounded-lg border-border-subtle bg-surface-container-low px-3 py-2 focus:border-primary focus:ring-primary text-sm";

  function update(locale: LocaleKey, field: FieldKey, value: string) {
    setSaved(false);
    setState((prev) => ({
      ...prev,
      [locale]: { ...prev[locale], [field]: value },
    }));
  }

  function onSave() {
    setSaved(false);
    setError(null);
    startTransition(async () => {
      try {
        await savePageContent(slug, state);
        setSaved(true);
      } catch {
        setError("Не удалось сохранить. Попробуйте ещё раз.");
      }
    });
  }

  return (
    <div>
      <div className="grid lg:grid-cols-3 gap-6">
        {LOCALES.map((locale) => {
          const v = state[locale];
          return (
            <div
              key={locale}
              className="bg-white border border-border-subtle rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-primary mb-4">
                {LOCALE_LABELS[locale]}{" "}
                <span className="text-xs font-semibold text-on-surface-variant uppercase">
                  {locale}
                </span>
              </h3>

              {!isHome && (
                <div className="space-y-3 mb-4">
                  <label className="text-sm block">
                    <span className="block font-semibold mb-1">
                      Надпись (eyebrow)
                    </span>
                    <input
                      className={cls}
                      placeholder={PLACEHOLDER}
                      value={v.heroEyebrow ?? ""}
                      onChange={(e) =>
                        update(locale, "heroEyebrow", e.target.value)
                      }
                    />
                  </label>
                  <label className="text-sm block">
                    <span className="block font-semibold mb-1">
                      Заголовок героя
                    </span>
                    <input
                      className={cls}
                      placeholder={PLACEHOLDER}
                      value={v.heroTitle ?? ""}
                      onChange={(e) =>
                        update(locale, "heroTitle", e.target.value)
                      }
                    />
                  </label>
                  <label className="text-sm block">
                    <span className="block font-semibold mb-1">
                      Подзаголовок героя
                    </span>
                    <textarea
                      className={`${cls} resize-none`}
                      rows={3}
                      placeholder={PLACEHOLDER}
                      value={v.heroSubtitle ?? ""}
                      onChange={(e) =>
                        update(locale, "heroSubtitle", e.target.value)
                      }
                    />
                  </label>
                </div>
              )}

              {isHome && (
                <p className="text-xs text-on-surface-variant mb-4">
                  Для главной страницы редактируется только SEO. Текст героя
                  задаётся в слайдере.
                </p>
              )}

              <div className="space-y-3">
                <label className="text-sm block">
                  <span className="block font-semibold mb-1">
                    SEO title
                  </span>
                  <input
                    className={cls}
                    placeholder={PLACEHOLDER}
                    value={v.metaTitle ?? ""}
                    onChange={(e) => update(locale, "metaTitle", e.target.value)}
                  />
                </label>
                <label className="text-sm block">
                  <span className="block font-semibold mb-1">
                    SEO description
                  </span>
                  <textarea
                    className={`${cls} resize-none`}
                    rows={3}
                    placeholder={PLACEHOLDER}
                    value={v.metaDescription ?? ""}
                    onChange={(e) =>
                      update(locale, "metaDescription", e.target.value)
                    }
                  />
                </label>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 mt-6">
        <button
          type="button"
          onClick={onSave}
          disabled={pending}
          className="btn-primary px-6 py-2.5 rounded-lg font-semibold text-sm disabled:opacity-60"
        >
          {pending ? "Сохранение…" : "Сохранить"}
        </button>
        {saved && !pending && (
          <span className="text-clever-green text-sm font-semibold">
            Сохранено
          </span>
        )}
        {error && (
          <span className="text-error text-sm font-semibold">{error}</span>
        )}
      </div>
    </div>
  );
}
