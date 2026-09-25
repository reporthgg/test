"use client";

import { useState, useTransition } from "react";
import Icon from "@/components/Icon";
import { addQuestion } from "@/app/admin/(panel)/exams/actions";
import type { QuestionType } from "@/lib/test-types";

export default function AddQuestionButton({ testId }: { testId: string }) {
  const [pending, start] = useTransition();
  const [type, setType] = useState<QuestionType>("choice");
  const [error, setError] = useState("");
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold">
        Тип нового вопроса
        <select value={type} disabled={pending} onChange={(event) => setType(event.target.value as QuestionType)} className="ml-3 rounded-lg border border-border-subtle px-3 py-2">
          <option value="choice">Один вариант ответа</option>
          <option value="short_text">Короткий письменный ответ</option>
          <option value="essay">Эссе</option>
        </select>
      </label>
    <button
      onClick={() => {
        setError("");
        start(async () => {
          try { await addQuestion(testId, type); }
          catch (error) { setError(error instanceof Error ? error.message : "Не удалось добавить вопрос."); }
        });
      }}
      disabled={pending}
      className="w-full py-4 border-2 border-dashed border-outline-variant/60 rounded-xl flex items-center justify-center gap-2 text-on-surface-variant hover:text-primary hover:border-primary hover:bg-primary/5 transition-all font-semibold disabled:opacity-60"
    >
      <Icon name="add" /> {pending ? "Добавляем…" : "Добавить вопрос"}
    </button>
      {error && <p role="alert" className="text-error text-sm">{error}</p>}
    </div>
  );
}
