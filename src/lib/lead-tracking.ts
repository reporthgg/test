export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
export type UtmKey = (typeof UTM_KEYS)[number];
export type LeadUtm = Partial<Record<UtmKey, string>>;
export type LeadTracking = { page?: string; utm?: LeadUtm };

const STORAGE_KEY = "gsc-utm";
const controlCharacters = /[\u0000-\u001f\u007f]/u;

function cleanText(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const text = value.trim();
  return text && text.length <= maxLength && !controlCharacters.test(text) ? text : undefined;
}

export function parseUtm(value: unknown): LeadUtm | undefined {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return undefined;
  const utm: LeadUtm = {};
  for (const key of UTM_KEYS) {
    const text = cleanText((value as Record<string, unknown>)[key], 200);
    if (text) utm[key] = text;
  }
  return Object.keys(utm).length ? utm : undefined;
}

export function parsePage(value: unknown): string | undefined {
  const text = cleanText(value, 300);
  return text?.startsWith("/") ? text : undefined;
}

export function rememberUtm(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const utm = parseUtm(Object.fromEntries(UTM_KEYS.map((key) => [key, params.get(key)])));
    if (utm) window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
  } catch {
    return;
  }
}

export function leadTracking(): LeadTracking {
  rememberUtm();
  let utm: LeadUtm | undefined;
  try {
    utm = parseUtm(JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) ?? "null"));
  } catch {
    utm = undefined;
  }
  return { page: window.location.pathname, ...(utm ? { utm } : {}) };
}
