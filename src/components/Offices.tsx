import { site } from "@/lib/site";
import { getServerDict } from "@/lib/locale";

function Pin({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

export default async function Offices() {
  const { dict } = await getServerDict();
  const t = dict.offices;

  return (
    <section
      id="offices"
      className="py-24 md:py-28 bg-white-layered my-8 rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 shadow-sm scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="tag-pill">{t.eyebrow}</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.text}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {site.offices.map((o, i) => (
            <a
              key={i}
              href={o.gis}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${o.city}, ${o.address}. Открыть в 2GIS`}
              className="map-wrapper group card-ring block h-72 shadow-premium hover:shadow-premium-lg"
            >
              {/* Карта-превью (стежка тайлов OSM), клик открывает 2GIS */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/maps/office-${i}.jpg`}
                alt={`Карта: ${o.city}, ${o.address}`}
                loading="lazy"
                className="map-image absolute inset-0 w-full h-full object-cover"
              />

              {/* Затемнение снизу */}
              <div className="map-overlay" />

              {/* Всегда видно: город + бейдж 2GIS */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-sm font-bold text-primary shadow-premium">
                  <Pin className="w-4 h-4 text-secondary" />
                  {o.city}
                </span>
              </div>
              <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center rounded-full bg-primary/90 backdrop-blur px-3 py-1.5 text-xs font-bold text-white shadow-premium">
                  2GIS
                </span>
              </div>

              {/* Появляется при наведении: адрес + действие */}
              <div className="map-content z-10">
                <div className="text-white/90 font-semibold">{o.address}</div>
                <div className="mt-3 inline-flex items-center gap-2 text-white font-bold">
                  <Pin className="w-4 h-4" />
                  Смотреть на карте
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Контакт под картами */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <a
            href={`tel:${site.phone.tel}`}
            className="inline-flex items-center gap-2 font-bold text-gray-900 hover:text-primary"
          >
            <Pin className="w-4 h-4 text-primary" />
            {site.phone.display}
          </a>
          <span className="hidden sm:inline text-gray-300">·</span>
          <a
            href={site.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-whatsapp-green hover:underline"
          >
            {t.writeWhatsApp}
          </a>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          Карты:{" "}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            © OpenStreetMap
          </a>{" "}
          · точки в 2GIS
        </p>
      </div>
    </section>
  );
}
