"use client";

import { useState, useTransition } from "react";
import Icon from "@/components/Icon";

type Values = {
  bitrixWebhookUrl: string;
  contactPhone: string;
  contactWhatsapp: string;
  notifyEmail: string;
  contactEmail: string;
};

export default function SettingsForm({
  values,
  hasWebhook,
  saveAction,
  testAction,
}: {
  values: Values;
  hasWebhook: boolean;
  saveAction: (formData: FormData) => Promise<void>;
  testAction: () => Promise<{ ok: boolean; reason?: string }>;
}) {
  const [saved, setSaved] = useState(false);
  const [testResult, setTestResult] = useState<
    { ok: boolean; reason?: string } | null
  >(null);
  const [isTesting, startTest] = useTransition();

  const cls =
    "w-full rounded-lg border-border-subtle bg-surface-container-low px-3 py-2 focus:border-primary focus:ring-primary text-sm";

  const runTest = () => {
    setTestResult(null);
    startTest(async () => {
      const res = await testAction();
      setTestResult(res);
    });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Интеграция Bitrix24 */}
      <form
        action={async (fd) => {
          setSaved(false);
          await saveAction(fd);
          setSaved(true);
        }}
        className="bg-white border border-border-subtle rounded-xl p-6 space-y-6"
      >
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-primary">Интеграция Bitrix24</h3>
          <label className="text-sm block">
            <span className="block font-semibold mb-1">
              Входящий вебхук (crm.lead.add)
            </span>
            <input
              name="bitrixWebhookUrl"
              type="text"
              defaultValue={values.bitrixWebhookUrl}
              className={cls}
              placeholder="https://your.bitrix24.ru/rest/1/xxxxxxxx/"
              autoComplete="off"
              spellCheck={false}
            />
            <span className="block text-xs text-on-surface-variant mt-1.5">
              Заявки с сайта отправляются на этот URL. Если поле пустое, сайт
              использует переменную окружения{" "}
              <code className="font-mono text-on-surface">BITRIX_WEBHOOK_URL</code>
              . URL содержит секретный ключ. Не передавайте его третьим лицам.
            </span>
          </label>
        </section>

        {/* Контакты */}
        <section className="space-y-3 border-t border-border-subtle pt-6">
          <h3 className="text-lg font-bold text-primary">Контакты</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="text-sm">
              <span className="block font-semibold mb-1">Контактный телефон</span>
              <input
                name="contactPhone"
                type="text"
                defaultValue={values.contactPhone}
                className={cls}
                placeholder="+7 700 000 00 00"
              />
            </label>
            <label className="text-sm">
              <span className="block font-semibold mb-1">WhatsApp</span>
              <input
                name="contactWhatsapp"
                type="text"
                defaultValue={values.contactWhatsapp}
                className={cls}
                placeholder="+7 700 000 00 00"
              />
            </label>
            <label className="text-sm">
              <span className="block font-semibold mb-1">
                Email для заявок (уведомления)
              </span>
              <input
                name="notifyEmail"
                type="email"
                defaultValue={values.notifyEmail}
                className={cls}
                placeholder="lead@gscenter.kz"
              />
            </label>
            <label className="text-sm">
              <span className="block font-semibold mb-1">Публичный email</span>
              <input
                name="contactEmail"
                type="email"
                defaultValue={values.contactEmail}
                className={cls}
                placeholder="info@gscenter.kz"
              />
            </label>
          </div>
        </section>

        <div className="flex items-center justify-end gap-3 border-t border-border-subtle pt-5">
          {saved && (
            <span className="text-clever-green text-sm font-semibold">
              Сохранено
            </span>
          )}
          <button
            type="submit"
            className="btn-primary px-5 py-2 rounded-lg font-semibold text-sm"
          >
            Сохранить
          </button>
        </div>
      </form>

      {/* Проверка вебхука */}
      <div className="bg-white border border-border-subtle rounded-xl p-6">
        <h3 className="text-lg font-bold text-primary mb-1">
          Проверка вебхука
        </h3>
        <p className="text-sm text-on-surface-variant mb-4">
          Отправит тестовую заявку в Bitrix24, чтобы убедиться, что интеграция
          работает. Заявку можно удалить в CRM.
          {!hasWebhook && (
            <span className="block text-error font-semibold mt-1">
              Вебхук не настроен. Сначала сохраните URL выше или задайте
              BITRIX_WEBHOOK_URL.
            </span>
          )}
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={runTest}
            disabled={isTesting}
            className="inline-flex items-center gap-2 rounded-lg border border-border-subtle px-5 py-2 font-semibold text-sm text-primary hover:bg-surface-container-low disabled:opacity-50"
          >
            <Icon name={isTesting ? "refresh" : "arrow_forward"} />
            {isTesting ? "Отправка…" : "Отправить тестовую заявку"}
          </button>
          {testResult && !isTesting && (
            <span
              className={`text-sm font-semibold ${
                testResult.ok ? "text-clever-green" : "text-error"
              }`}
            >
              {testResult.ok
                ? "Заявка отправлена"
                : testResult.reason === "no-webhook"
                ? "Вебхук не настроен"
                : "Не удалось отправить. Проверьте URL вебхука"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
