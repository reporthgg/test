// Полоса доверия / аккредитации — реальные логотипы партнёров.
import { getServerDict } from "@/lib/locale";

export default async function TrustStrip() {
  const { dict: t } = await getServerDict();
  return (
    <section className="py-10 border-y border-gray-200/60 bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-8">
          {t.trust.title}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <div className="bg-white rounded-2xl border border-border-subtle shadow-premium px-6 py-4 flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/icef.png"
              alt="ICEF Accredited: Trusted Agency #1478"
              className="h-16 w-auto"
            />
          </div>
          <div className="bg-white rounded-2xl border border-border-subtle shadow-premium px-8 py-5 flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/bc-ielts.png"
              alt="British Council: IELTS Registration Centre"
              className="h-12 sm:h-14 w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
