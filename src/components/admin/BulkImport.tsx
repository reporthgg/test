"use client";

import { useState, useTransition } from "react";
import Icon from "@/components/Icon";
import { importQuestions } from "@/app/admin/(panel)/exams/actions";

export default function BulkImport({ testId }: { testId: string }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [pending, start] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);

  const run = () => {
    setResult(null);
    start(async () => {
      const res = await importQuestions(testId, text);
      if (res.ok) {
        setResult({ ok: true, msg: `Добавлено ${res.added} вопросов. Без ключа ответа: ${res.unresolved}.` });
        setText("");
      } else {
        setResult({ ok: false, msg: res.error });
      }
    });
  };

  return (
    <div className="border border-border-subtle rounded-xl bg-white mb-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-on-surface"
      >
        <span className="inline-flex items-center gap-2">
          <Icon name="post_add" /> Массовый импорт вопросов
        </span>
        <Icon name="expand_more" className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-3 border-t border-border-subtle pt-4">
          <div className="text-xs text-on-surface-variant space-y-1">
            <p className="flex items-center gap-1">
              <Icon name="help" className="text-sm" />
              Один вопрос на строку. Сначала текст вопроса, затем варианты через{" "}
              <code className="px-1 rounded bg-surface-container-low font-mono">|</code>. Правильный
              вариант отметьте звёздочкой{" "}
              <code className="px-1 rounded bg-surface-container-low font-mono">*</code> перед
              текстом. Без звёздочки вопрос сохраняется без ключа и блокирует публикацию.
              Пустые строки пропускаются, ошибки в других строках отменяют весь импорт.
            </p>
            <p>Только обычный текст и один вариант ответа. HTML, изображения и письменные задания добавляются в редакторе вопроса. Этот импорт добавляет вопросы в черновик и не удаляет существующие вопросы или результаты.</p>
            <p>
              Пример:{" "}
              <code className="px-1 rounded bg-surface-container-low font-mono break-all">
                She ___ coffee every morning. | drink | *drinks | drinking | drank
              </code>
            </p>
          </div>

          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setResult(null);
            }}
            rows={8}
            maxLength={500000}
            disabled={pending}
            placeholder={"She ___ coffee every morning. | drink | *drinks | drinking | drank"}
            className="w-full rounded-lg border-border-subtle bg-surface-container-low px-4 py-2.5 focus:border-primary focus:ring-primary resize-y font-mono text-sm"
          />

          <div className="flex items-center gap-4">
            <button
              onClick={run}
              disabled={pending || text.trim().length === 0}
              className="btn-primary px-5 py-2 rounded-lg font-semibold text-sm disabled:opacity-60"
            >
              {pending ? "Импортируем…" : "Импортировать"}
            </button>
            {result && (
              <span
                className={`text-sm font-semibold ${
                  result.ok ? "text-clever-green" : "text-error"
                }`}
              >
                {result.msg}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
