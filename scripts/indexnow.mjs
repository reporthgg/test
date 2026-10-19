// Отправляет адреса из sitemap.xml в IndexNow (Bing, Яндекс и другие поисковики протокола).
// Запуск после релиза: npm run indexnow. Ключ лежит в public/<ключ>.txt и должен открываться на сайте.

const SITE = "https://gscstudy.com";
const KEY = "3fb0076f9d7a2a621b9f563fffeca59f";
const ENDPOINT = "https://api.indexnow.org/indexnow";

const keyResponse = await fetch(`${SITE}/${KEY}.txt`);
if (!keyResponse.ok || (await keyResponse.text()).trim() !== KEY) {
  console.error(`Файл ключа ${SITE}/${KEY}.txt недоступен: сначала выложите релиз.`);
  process.exit(1);
}

const sitemap = await fetch(`${SITE}/sitemap.xml`).then((response) => response.text());
const urls = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/gu), (match) => match[1].trim())
  .filter((url) => url.startsWith(`${SITE}/`) || url === SITE);

if (!urls.length) {
  console.error("В sitemap.xml не найдено адресов.");
  process.exit(1);
}

const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE).host,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList: urls,
  }),
});

// 200 и 202 означают, что адреса приняты.
console.log(`IndexNow: HTTP ${response.status}, отправлено адресов: ${urls.length}`);
if (response.status !== 200 && response.status !== 202) process.exitCode = 1;
