export const legacyTestSlugs: Readonly<Record<string, string>> = {
  "tilda-general-english": "english",
  "tilda-sat": "sat",
  "tilda-ielts": "ielts",
  "tilda-kids-6-8": "kids-6-8",
  "tilda-kids-9-12": "kids-9-12",
};

export function renamedTestSlug(slug: string): string | null {
  return Object.hasOwn(legacyTestSlugs, slug) ? legacyTestSlugs[slug] : null;
}
