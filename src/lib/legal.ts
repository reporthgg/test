export const LEGAL_EDITION = "2026-10-13";
export const CONSENT_VERSION = `consent v1, ${LEGAL_EDITION}`;

export type ConsentRecord = { consentVersion: string; consentAt: string };

export function consentRecord(date: Date = new Date()): ConsentRecord {
  const astana = new Date(date.getTime() + 5 * 60 * 60 * 1000);
  return {
    consentVersion: CONSENT_VERSION,
    consentAt: `${astana.toISOString().slice(0, 16).replace("T", " ")} (UTC+5)`,
  };
}
