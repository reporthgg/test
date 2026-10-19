export const site = {
  name: "GSC Study",
  // Юридические данные и аккредитации для микроразметки Organization.
  legalName: "ТОО «GSCSTUDY CORPORATION»",
  taxId: "221240037945",
  alternateNames: ["GSC", "GSCSTUDY"],
  credentials: [
    { name: "ICEF Accredited Agency", identifier: "1478", category: "accreditation", issuer: "ICEF", issuerUrl: "https://www.icef.com/" },
    { name: "British Council IELTS Registration Centre", category: "registration", issuer: "British Council", issuerUrl: "https://www.britishcouncil.org/" },
    {
      name: "Quality English Associate School",
      category: "membership",
      issuer: "Quality English",
      issuerUrl: "https://www.quality-english.com/",
      url: "https://www.quality-english.com/associate-school/gsc-study/",
    },
  ],
  hh: "https://hh.kz/employer/12494356",
  foundedYear: 2011,
  admissions: {
    ru: "600+ поступлений в 240+ вузов",
    kz: "240+ ЖОО-ға 600+ қабылдану",
    en: "600+ admissions to 240+ universities",
  },

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

  workingHours: "Пн-Пт 10:00-19:00 · Сб 10:00-14:00",

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
