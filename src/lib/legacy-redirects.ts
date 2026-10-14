const SECTIONS = new Set(["school", "exams", "abroad", "camps", "about", "tests", "thankyou", "privacy", "consent"]);
const SKIPPED = new Set(["admin", "api", "_next"]);

const RULES: readonly (readonly [RegExp, string])[] = [
  [/(^|[^a-z])tests?([^a-z]|$)/u, "/tests"],
  [/camp(?!us)|lager|leto|summer|kanikul|каникул|лагер/u, "/camps"],
  [/ielts|toefl|(^|[^a-z])sat([^a-z]|$)|exam|экзамен/u, "/exams"],
  [/language|english|kids|detey|speaking|angliy|английск/u, "/school"],
  [/abroad|universit|foundation|visa|ucheba|obuchenie|postup|admission|country|schools|program|bakalavr|magistr|higher|glion|roche|cambridge|college|academy|mba|университет|обучени|поступлени/u, "/abroad"],
  [/school|course|kurs|курс/u, "/school"],
  [/review|otzyv|отзыв/u, "/#reviews"],
  [/center|ofis|astana|almaty|aktau/u, "/#offices"],
  [/privacy/u, "/privacy"],
  [/about|kompanii|o-gsc|о-gsc|компани|contact|kontakt|career|vacanc|franchise|director|obrashenie|partner|services|cenovaya|staff/u, "/about"],
];

function localized(prefix: string, target: string): string {
  if (!prefix) return target;
  return target.startsWith("/#") ? `${prefix}${target.slice(1)}` : `${prefix}${target === "/" ? "" : target}`;
}

function isSitePath(segments: readonly string[]): boolean {
  if (segments.length === 0) return true;
  if (segments.length === 1) return SECTIONS.has(segments[0]);
  return segments.length === 2 && segments[0] === "test";
}

export function legacyRedirect(pathname: string): string | null {
  let decoded: string;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }
  let segments = decoded.toLowerCase().split("/").filter(Boolean);
  let legacyPrefix = segments[0] === "public";
  if (legacyPrefix) segments = segments.slice(1);
  if (segments.length && (SKIPPED.has(segments[0]) || segments.some((segment) => segment.startsWith(".")))) return null;
  if (segments.length && segments[segments.length - 1].includes(".")) return null;

  let prefix = "";
  if (segments[0] === "kz" || segments[0] === "en") {
    prefix = `/${segments[0]}`;
    segments = segments.slice(1);
  } else if (segments[0] === "ru") {
    legacyPrefix = true;
    segments = segments.slice(1);
  }

  if (isSitePath(segments)) {
    return legacyPrefix ? localized(prefix, `/${segments.join("/")}`) : null;
  }

  const rest = segments.join("/");
  const rule = RULES.find(([pattern]) => pattern.test(rest));
  return rule ? localized(prefix, rule[1]) : null;
}
