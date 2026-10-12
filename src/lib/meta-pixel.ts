export const META_PIXEL_ID = "4391523404460151";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Стандартное событие Meta Pixel. Если пиксель заблокирован, вызов просто пропускается.
export function trackMetaEvent(event: "Lead"): void {
  window.fbq?.("track", event);
}
