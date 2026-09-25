"use client";

import { useState, useTransition } from "react";
import { saveQuestion, deleteQuestion } from "@/app/admin/(panel)/exams/actions";
import type { QuestionType } from "@/lib/test-types";

type Option = { id: string; text: string; contentHtml: string | null; correct: boolean };
type Props = {
  testId: string;
  index: number;
  question: {
    id: string;
    text: string;
    contentHtml: string | null;
    type: QuestionType;
    required: boolean;
    acceptedAnswers: string[];
    options: Option[];
  };
};

export default function QuestionEditor({ testId, index, question }: Props) {
  const [text, setText] = useState(question.text);
  const [contentHtml, setContentHtml] = useState(question.contentHtml ?? "");
  const [type, setType] = useState<QuestionType>(question.type);
  const [required, setRequired] = useState(question.required);
  const [acceptedAnswers, setAcceptedAnswers] = useState(question.acceptedAnswers.join("\n"));
  const [opts, setOpts] = useState(question.options.map((option) => ({ ...option, key: option.id, id: option.id as string | null })));
  const [correctKey, setCorrectKey] = useState(question.options.filter((option) => option.correct).length === 1 ? question.options.find((option) => option.correct)!.id : "");
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const inputClass = "w-full rounded-lg border border-border-subtle bg-surface-container-low px-4 py-2.5 focus:border-primary focus:ring-primary";

  function save() {
    setSaved(false);
    setError("");
    start(async () => {
      try {
        const updated = await saveQuestion(testId, question.id, {
          text,
          contentHtml: contentHtml || null,
          type,
          required,
          acceptedAnswers: acceptedAnswers.split(/\r?\n/).map((answer) => answer.trim()).filter(Boolean),
          options: opts.map((option) => ({ id: option.id, text: option.text, contentHtml: option.contentHtml, correct: option.key === correctKey })),
        });
        setText(updated.text);
        setContentHtml(updated.contentHtml ?? "");
        setOpts(updated.options.map((option) => ({ ...option, key: option.id, id: option.id as string | null })));
        setCorrectKey(updated.options.find((option) => option.correct)?.id ?? "");
        setSaved(true);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Не удалось сохранить вопрос.");
      }
    });
  }

  return (
    <div className="bg-white border border-border-subtle rounded-xl p-6">
      <fieldset disabled={pending} onChange={() => { setSaved(false); setError(""); }} className="space-y-4 disabled:opacity-70">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-bold">Вопрос {index + 1}</h3>
          <button type="button" onClick={() => {
            if (!confirm("Удалить вопрос? Это действие нельзя отменить.")) return;
            start(async () => {
              try { await deleteQuestion(testId, question.id); }
              catch (error) { setError(error instanceof Error ? error.message : "Не удалось удалить вопрос."); }
            });
          }} className="text-error text-sm">Удалить вопрос</button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block text-sm font-semibold">
            Тип вопроса
            <select value={type} onChange={(event) => setType(event.target.value as QuestionType)} className={`${inputClass} mt-1`}>
              <option value="choice">Один вариант ответа</option>
              <option value="short_text">Короткий письменный ответ</option>
              <option value="essay">Развёрнутый ответ / эссе</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" checked={required} onChange={(event) => setRequired(event.target.checked)} />
            Обязательный вопрос
          </label>
        </div>
        <label className="block text-sm font-semibold">
          Текст вопроса (резервная версия без HTML)
          <textarea value={text} onChange={(event) => setText(event.target.value)} rows={3} maxLength={20000} className={`${inputClass} mt-1 resize-y`} />
        </label>
        <label className="block text-sm font-semibold">
          HTML вопроса (необязательно)
          <textarea value={contentHtml} onChange={(event) => setContentHtml(event.target.value)} rows={4} maxLength={200000} spellCheck={false} className={`${inputClass} mt-1 resize-y font-mono text-xs`} />
          <span className="block font-normal text-xs text-on-surface-variant mt-1">
            Форматирование и изображения: {`<img src="/uploads/example.png" alt="Описание">`}. Небезопасный HTML удаляется при сохранении.
          </span>
        </label>
        {type === "choice" && (
          <div className="space-y-3">
            {!correctKey && <p role="status" className="text-sm text-error">Ключ ответа не задан. Можно сохранить черновик, но нельзя опубликовать тест.</p>}
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name={`correct-${question.id}`} checked={!correctKey} onChange={() => setCorrectKey("")} />
              Правильный ответ пока неизвестен
            </label>
            {opts.map((option, optionIndex) => (
              <div key={option.key} className="rounded-lg border border-border-subtle p-3 space-y-2">
                <div className="flex justify-between gap-3">
                  <label className="flex items-center gap-2 text-sm font-semibold">
                    <input type="radio" name={`correct-${question.id}`} checked={correctKey === option.key} onChange={() => setCorrectKey(option.key)} />
                    Вариант {optionIndex + 1}: правильный
                  </label>
                  <button type="button" disabled={opts.length <= 2} onClick={() => {
                    setOpts(opts.filter((item) => item.key !== option.key));
                    if (correctKey === option.key) setCorrectKey("");
                    setSaved(false);
                  }} className="text-xs text-error disabled:opacity-40">Удалить вариант</button>
                </div>
                <label className="block text-sm">
                  Текст варианта (резервная версия)
                  <input value={option.text} maxLength={10000} onChange={(event) => setOpts(opts.map((item) => item.key === option.key ? { ...item, text: event.target.value } : item))} className={`${inputClass} mt-1`} />
                </label>
                <label className="block text-sm">
                  HTML варианта, включая изображения
                  <textarea value={option.contentHtml ?? ""} rows={2} maxLength={200000} spellCheck={false} onChange={(event) => setOpts(opts.map((item) => item.key === option.key ? { ...item, contentHtml: event.target.value || null } : item))} className={`${inputClass} mt-1 resize-y font-mono text-xs`} />
                </label>
              </div>
            ))}
            <button type="button" disabled={opts.length >= 30} onClick={() => {
              setOpts([...opts, { id: null, key: crypto.randomUUID(), text: "", contentHtml: null, correct: false }]);
              setSaved(false);
            }} className="text-primary text-sm font-semibold disabled:opacity-40">Добавить вариант</button>
          </div>
        )}
        {type === "short_text" && <label className="block text-sm font-semibold">
          Принятые ответы, каждый с новой строки
          <textarea value={acceptedAnswers} onChange={(event) => setAcceptedAnswers(event.target.value)} rows={5} maxLength={200000} className={`${inputClass} mt-1 resize-y`} />
          {!acceptedAnswers.trim() && <span className="block text-error text-xs mt-1">Без принятых ответов доступно только сохранение черновика.</span>}
        </label>}
        {type === "essay" && <p className="text-sm text-on-surface-variant">Эссе не оценивается автоматически. Написанный ответ будет доступен в результатах теста.</p>}
        <p className="text-xs text-on-surface-variant">При смене типа введённые варианты и принятые ответы сохраняются, но используются только для соответствующего типа вопроса.</p>
        <div className="flex items-center gap-4">
          <button type="button" onClick={save} className="btn-primary px-5 py-2 rounded-lg font-semibold text-sm">
            {pending ? "Сохраняем..." : "Сохранить вопрос"}
          </button>
          {saved && <span role="status" className="text-clever-green text-sm">Сохранено</span>}
        </div>
      </fieldset>
      {error && <p role="alert" className="text-error text-sm mt-3">{error}</p>}
    </div>
  );
}
