import type { TestSubmissionResult } from "@/lib/test-types";

// Результат теста передаётся на /thankyou через sessionStorage: в адресе страницы его не видно,
// а при обновлении страницы он остаётся на месте до закрытия вкладки.
const STORAGE_KEY = "gsc:test-result";

export type StoredTestResult = { title: string; result: TestSubmissionResult };

export function isTestSubmissionResult(value: unknown): value is TestSubmissionResult {
  if (typeof value !== "object" || value === null) return false;
  const data = value as Partial<Record<keyof TestSubmissionResult, unknown>>;
  return data.ok === true && typeof data.score === "number" && typeof data.total === "number" &&
    typeof data.level === "string" && typeof data.pendingReview === "number";
}

export function saveTestResult({ title, result }: StoredTestResult): void {
  const { ok, score, total, level, pendingReview, crmDelivered } = result;
  const value: StoredTestResult = { title, result: { ok, score, total, level, pendingReview, crmDelivered } };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Без хранилища страница благодарности покажет общий текст без результата.
  }
}

export function readStoredTestResult(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function parseStoredTestResult(raw: string | null): StoredTestResult | null {
  if (!raw) return null;
  try {
    const data: unknown = JSON.parse(raw);
    if (typeof data !== "object" || data === null) return null;
    const { title, result } = data as Partial<Record<keyof StoredTestResult, unknown>>;
    return typeof title === "string" && isTestSubmissionResult(result) ? { title, result } : null;
  } catch {
    return null;
  }
}
