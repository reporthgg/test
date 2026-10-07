"use client";

import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { useLocale } from "@/i18n/useLocale";
import { getDictionary } from "@/i18n/dictionaries";
import { stripLocale } from "@/i18n/config";

export default function WhatsAppBubble() {
  const pathname = usePathname();
  const locale = useLocale();
  const page = stripLocale(pathname ?? "/");
  // На страницах из Figma используется собственный виджет.
  if (pathname?.startsWith("/admin") || page === "/" || page === "/school") return null;
  const label = getDictionary(locale).actions.bubble;

  return (
    <a
      href={`${site.whatsapp.link}?text=Здравствуйте!%20У%20меня%20есть%20вопрос`}
      target="_blank"
      rel="noopener"
      aria-label="Написать в WhatsApp"
      className="hidden md:flex fixed bottom-6 right-6 group z-50 items-center gap-3 glass-card pl-4 pr-1.5 py-1.5 rounded-full shadow-premium hover:shadow-premium-lg hover:-translate-y-0.5 transition-all duration-300"
    >
      <span className="text-sm font-semibold text-primary hidden md:block group-hover:text-whatsapp-green transition-colors">
        {label}
      </span>
      <div className="w-12 h-12 rounded-full bg-whatsapp-green flex items-center justify-center text-white shadow-[0_8px_20px_-8px_rgba(37,211,102,0.6)] group-hover:scale-110 transition-transform">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.5 14.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.6.1-.2.2-.3.3-.5 0-.2 0-.4-.1-.5-.1-.2-.7-1.7-1-2.3-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.3 0 1.3.9 2.6 1.1 2.8.1.2 1.8 2.9 4.5 4 2.2.9 2.7.8 3.2.7.7-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.2-.2-.4-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.2-1.3c1.4.8 3.1 1.3 4.8 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
        </svg>
      </div>
    </a>
  );
}
