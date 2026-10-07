export const site = {
  name: "GSC Study",
  foundedYear: 2011,

  // Единый номер колл-центра для звонков
  phone: { display: "+7 700 127 77 88", tel: "+77001277788" },
  // WhatsApp
  whatsapp: {
    display: "+7 771 808 08 28",
    number: "77718080828",
    link: "https://wa.me/77718080828",
  },
  email: "info@gscenter.kz",
  instagram: "https://instagram.com/gscstudy",

  workingHours: "Пн-Пт 9:00-18:00 · Сб 10:00-15:00",

  // 3 офиса: 2 в Астане и 1 в Алматы, координаты и ссылки из 2GIS.
  offices: [
    {
      city: "Астана",
      address: "ул. Сыганак, 15",
      lat: 51.129951,
      lon: 71.384812,
      gis: "https://go.2gis.com/2yCeX",
      mapPreview: "/landing/contacts/maps/syganak.png",
    },
    {
      city: "Астана",
      address: "ул. Улы Дала, 41/6",
      lat: 51.09765,
      lon: 71.415188,
      gis: "https://go.2gis.com/ciCQC",
      mapPreview: "/landing/contacts/maps/uly-dala.png",
    },
    {
      city: "Алматы",
      address: "пр. Сейфуллина, 575",
      lat: 43.24685,
      lon: 76.93321,
      gis: "https://go.2gis.com/JP3xW",
      mapPreview: "/landing/contacts/maps/almaty.png",
    },
  ],

  nav: [
    { label: "Языковая школа", href: "/school" },
    { label: "Экзамены", href: "/exams" },
    { label: "За рубеж", href: "/abroad" },
    { label: "Лагеря", href: "/camps" },
    { label: "Центры", href: "/#offices" },
  ],
} as const;
