"use client";

import { useState, useTransition } from "react";
import { saveTestMeta } from "@/app/admin/(panel)/exams/actions";
import type { TestContactField } from "@/lib/test-types";

type Props = {
  testId: string;
  title: string;
  description: string;
  timeLimit: number | null;
  published: boolean;
  scoringMode: "level" | "raw";
  contactFields: TestContactField[];
};

export default function TestMetaForm(p: Props) {
  const [title, setTitle] = useState(p.title);
  const [description, setDescription] = useState(p.description);
  const [timeLimit, setTimeLimit] = useState<string>(
    p.timeLimit ? String(p.timeLimit) : ""
  );
  const [published, setPublished] = useState(p.published);
  const [scoringMode, setScoringMode] = useState(p.scoringMode);
  const [contactFields, setContactFields] = useState(p.contactFields.map((field) => ({ ...field, optionsText: field.options?.join("\n") ?? "" })));
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function save() {
    setSaved(false);
    setError("");
    start(async () => {
      try {
        await saveTestMeta(p.testId, {
          title,
          description,
          timeLimit: timeLimit ? Number(timeLimit) : null,
          published,
          scoringMode,
          contactFields: contactFields.map((field) => ({
            name: field.name,
            label: field.label,
            required: field.required,
            options: field.optionsText.split(/\r?\n/).map((option) => option.trim()).filter(Boolean),
          })),
        });
        setSaved(true);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Не удалось сохранить тест.");
      }
    });
  }

  return (
    <div className="bg-white border border-border-subtle rounded-xl p-6 mb-6">
      <fieldset disabled={pending} onChange={() => { setSaved(false); setError(""); }}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold mb-1">Название</label>
          <input
            value={title}
            maxLength={300}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border-border-subtle bg-surface-container-low px-4 py-2.5 focus:border-primary focus:ring-primary"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold mb-1">Описание</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            maxLength={10000}
            className="w-full rounded-lg border-border-subtle bg-surface-container-low px-4 py-2.5 focus:border-primary focus:ring-primary resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">
            Время (мин)
          </label>
          <input
            type="number"
            min={1}
            max={1440}
            step={1}
            value={timeLimit}
            onChange={(e) => setTimeLimit(e.target.value)}
            className="w-full rounded-lg border-border-subtle bg-surface-container-low px-4 py-2.5 focus:border-primary focus:ring-primary"
          />
        </div>
        <label className="flex items-center gap-3 mt-6 cursor-pointer">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-5 h-5 rounded text-primary focus:ring-primary"
          />
          <span className="font-semibold">Опубликован</span>
        </label>
        <label className="block text-sm font-semibold">
          Подсчёт результата
          <select value={scoringMode} onChange={(event) => setScoringMode(event.target.value as "level" | "raw")} className="mt-1 w-full rounded-lg border border-border-subtle bg-surface-container-low px-4 py-2.5">
            <option value="raw">Количество правильных ответов</option>
            <option value="level">Уровень по шкале теста</option>
          </select>
        </label>
      </div>
      <div className="mt-5 space-y-4">
        <h3 className="font-semibold">Анкета после теста</h3>
        <p className="text-sm text-on-surface-variant">Имя, телефон и согласие на обработку персональных данных обязательны после теста. Дополнительные поля включаются только по вашему желанию.</p>
        {contactFields.length === 0
          ? <p className="text-sm text-on-surface-variant">Дополнительных полей нет.</p>
          : <button type="button" onClick={() => { setContactFields([]); setSaved(false); setError(""); }} className="text-error text-sm">Убрать дополнительные поля</button>}
        {contactFields.map((field) => (
          <div key={field.name} className="rounded-lg border border-border-subtle p-4 space-y-3">
            <div className="flex flex-wrap justify-between gap-3">
              <span className="text-sm font-semibold">{field.label}</span>
              <button type="button" onClick={() => { setContactFields(contactFields.filter((item) => item.name !== field.name)); setSaved(false); }} className="text-error text-sm">Удалить поле</button>
            </div>
            <label className="block text-sm">
              Подпись поля
              <input value={field.label} maxLength={200} onChange={(event) => setContactFields(contactFields.map((item) => item.name === field.name ? { ...item, label: event.target.value } : item))} className="mt-1 w-full rounded-lg border border-border-subtle px-3 py-2" />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={field.required} onChange={(event) => setContactFields(contactFields.map((item) => item.name === field.name ? { ...item, required: event.target.checked } : item))} />
              Обязательное поле
            </label>
            <label className="block text-sm">
              Минимум два варианта выбора, каждый с новой строки. Пустое поле: свободный ввод.
              <textarea value={field.optionsText} rows={3} maxLength={20000} onChange={(event) => setContactFields(contactFields.map((item) => item.name === field.name ? { ...item, optionsText: event.target.value } : item))} className="mt-1 w-full rounded-lg border border-border-subtle px-3 py-2 resize-y" />
            </label>
          </div>
        ))}
        {contactFields.length < 4 && <label className="block text-sm font-semibold">
          Добавить дополнительное поле
          <select value="" onChange={(event) => {
            const name = event.target.value as TestContactField["name"];
            const labels = { age: "Возраст", city: "Город", branch: "Филиал", studyFormat: "Формат обучения" };
            if (name) setContactFields([...contactFields, { name, label: labels[name], required: false, optionsText: "" }]);
          }} className="mt-1 w-full rounded-lg border border-border-subtle px-3 py-2">
            <option value="">Выберите поле</option>
            {!contactFields.some((field) => field.name === "age") && <option value="age">Возраст</option>}
            {!contactFields.some((field) => field.name === "city") && <option value="city">Город</option>}
            {!contactFields.some((field) => field.name === "branch") && <option value="branch">Филиал</option>}
            {!contactFields.some((field) => field.name === "studyFormat") && <option value="studyFormat">Формат обучения</option>}
          </select>
        </label>}
        <p className="text-xs text-on-surface-variant">Изменения анкеты вступят в силу после нажатия «Сохранить».</p>
      </div>
      <div className="flex items-center gap-4 mt-5">
        <button
          onClick={save}
          disabled={pending}
          className="btn-primary px-6 py-2.5 rounded-lg font-semibold disabled:opacity-60"
        >
          {pending ? "Сохраняем..." : "Сохранить"}
        </button>
        {saved && !pending && (
          <span className="text-clever-green text-sm font-semibold">
            Сохранено
          </span>
        )}
      </div>
      <p className="text-xs text-on-surface-variant mt-3">Перед публикацией сохраните каждый изменённый вопрос. Проверка публикации использует только сохранённые данные.</p>
      </fieldset>
      {error && <p role="alert" className="text-sm text-error mt-3">{error}</p>}
    </div>
  );
}
