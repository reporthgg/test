"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

type Camp = {
  id: string;
  city: string;
  country: string;
  dates: string | null;
  ageRange: string | null;
  housing: string | null;
  seats: number | null;
  price: string | null;
  summary: string | null;
  image: string | null;
  order: number;
  published: boolean;
};

export default function CampForm({
  camp,
  action,
  deleteAction,
}: {
  camp: Camp;
  action: (formData: FormData) => Promise<void>;
  deleteAction: () => Promise<void>;
}) {
  const [saved, setSaved] = useState(false);
  const [image, setImage] = useState<string | null>(camp.image);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const cls =
    "w-full rounded-lg border-border-subtle bg-surface-container-low px-3 py-2 focus:border-primary focus:ring-primary text-sm";

  async function handleUpload(file: File) {
    setUploadError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (json.ok) setImage(json.url);
      else setUploadError(json.error || "Ошибка загрузки");
    } catch {
      setUploadError("Ошибка загрузки");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form
      action={async (fd) => {
        setSaved(false);
        await action(fd);
        setSaved(true);
      }}
      className="bg-white border border-border-subtle rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-primary">
          {camp.city || "Лагерь"}{" "}
          {!camp.published && (
            <span className="text-xs font-semibold text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded-full ml-2 align-middle">
              черновик
            </span>
          )}
        </h3>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <label className="text-sm">
          <span className="block font-semibold mb-1">Город</span>
          <input name="city" defaultValue={camp.city} className={cls} required />
        </label>
        <label className="text-sm">
          <span className="block font-semibold mb-1">Страна</span>
          <input name="country" defaultValue={camp.country} className={cls} />
        </label>
        <label className="text-sm">
          <span className="block font-semibold mb-1">Даты</span>
          <input name="dates" defaultValue={camp.dates ?? ""} className={cls} placeholder="6-26 июля" />
        </label>
        <label className="text-sm">
          <span className="block font-semibold mb-1">Возраст</span>
          <input name="ageRange" defaultValue={camp.ageRange ?? ""} className={cls} placeholder="13-17 лет" />
        </label>
        <label className="text-sm">
          <span className="block font-semibold mb-1">Проживание</span>
          <input name="housing" defaultValue={camp.housing ?? ""} className={cls} placeholder="кампус" />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">
            <span className="block font-semibold mb-1">Мест</span>
            <input name="seats" type="number" defaultValue={camp.seats ?? ""} className={cls} />
          </label>
          <label className="text-sm">
            <span className="block font-semibold mb-1">Порядок</span>
            <input name="order" type="number" defaultValue={camp.order} className={cls} />
          </label>
        </div>
        <label className="text-sm sm:col-span-2">
          <span className="block font-semibold mb-1">Цена (текст)</span>
          <input name="price" defaultValue={camp.price ?? ""} className={cls} placeholder="по запросу" />
        </label>
        <label className="text-sm sm:col-span-2">
          <span className="block font-semibold mb-1">Описание</span>
          <textarea name="summary" defaultValue={camp.summary ?? ""} rows={2} className={`${cls} resize-none`} />
        </label>

        <div className="text-sm sm:col-span-2">
          <span className="block font-semibold mb-1">Фото направления</span>
          <input type="hidden" name="image" value={image ?? ""} />
          <div className="flex items-start gap-4">
            <div className="w-32 h-20 rounded-lg overflow-hidden bg-surface-container-low border border-border-subtle flex items-center justify-center shrink-0">
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt="" className="w-full h-full object-cover" />
              ) : (
                <Icon name="image" className="text-outline text-2xl" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <label className="btn-outline px-3 py-1.5 rounded-lg text-sm font-semibold cursor-pointer">
                  {uploading ? "Загрузка…" : image ? "Заменить фото" : "Загрузить фото"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleUpload(f);
                      e.target.value = "";
                    }}
                  />
                </label>
                {image && (
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="text-outline hover:text-error text-sm font-semibold px-2 py-1.5"
                  >
                    Убрать
                  </button>
                )}
              </div>
              <p className="text-xs text-on-surface-variant mt-1">
                JPG, PNG, WebP до 6 МБ. Не забудьте «Сохранить».
              </p>
              {uploadError && (
                <p className="text-xs text-error mt-1">{uploadError}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
          <input
            type="checkbox"
            name="published"
            defaultChecked={camp.published}
            className="w-5 h-5 rounded text-primary focus:ring-primary"
          />
          Опубликован
        </label>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-clever-green text-sm font-semibold">
              Сохранено
            </span>
          )}
          <button
            type="submit"
            formAction={deleteAction}
            onClick={(e) => {
              if (!confirm(`Удалить лагерь «${camp.city}»?`)) e.preventDefault();
            }}
            className="text-outline hover:text-error p-2"
            title="Удалить"
          >
            <Icon name="more_vert" />
          </button>
          <button
            type="submit"
            className="btn-primary px-5 py-2 rounded-lg font-semibold text-sm"
          >
            Сохранить
          </button>
        </div>
      </div>
    </form>
  );
}
