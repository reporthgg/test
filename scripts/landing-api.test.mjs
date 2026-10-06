import assert from "node:assert/strict";
import test from "node:test";

const baseUrl = process.env.LANDING_TEST_URL;
if (baseUrl && !["localhost", "127.0.0.1", "[::1]"].includes(new URL(baseUrl).hostname)) {
  throw new Error("Проверки форм разрешены только на локальном сервере.");
}

const cases = [
  {
    name: "rejects non-JSON submissions",
    body: "name=test",
    contentType: "text/plain",
    status: 415,
    expected: {
      ok: false,
      error: "Ожидается application/json",
      code: "UNSUPPORTED_MEDIA_TYPE",
      message: "Ожидается application/json",
      details: {},
    },
  },
  {
    name: "rejects malformed JSON",
    body: "{",
    contentType: "application/json",
    status: 400,
    expected: {
      ok: false,
      error: "Некорректный JSON",
      code: "INVALID_JSON",
      message: "Некорректный JSON",
      details: {},
    },
  },
  {
    name: "requires a real name on trial forms",
    body: JSON.stringify({ name: " ", phone: "+77001234567", consent: true }),
    contentType: "application/json",
    status: 400,
    expected: {
      ok: false,
      error: "Имя и телефон обязательны",
      code: "INVALID_LEAD",
      message: "Имя и телефон обязательны",
      details: { name: "Заполните обязательное поле" },
    },
  },
  {
    name: "rejects invalid phone numbers",
    body: JSON.stringify({ name: "Тест", phone: "abc", consent: true }),
    contentType: "application/json",
    status: 400,
    expected: {
      ok: false,
      error: "Некорректный телефон",
      code: "INVALID_LEAD",
      message: "Некорректный телефон",
      details: { phone: "Проверьте номер телефона" },
    },
  },
  {
    name: "requires affirmative consent when supplied",
    body: JSON.stringify({ name: "Тест", phone: "+77001234567", consent: false }),
    contentType: "application/json",
    status: 400,
    expected: {
      ok: false,
      error: "Подтвердите согласие на обработку персональных данных",
      code: "INVALID_LEAD",
      message: "Подтвердите согласие на обработку персональных данных",
      details: { consent: "Согласие должно быть передано как true" },
    },
  },
];

for (const item of cases) {
  test(item.name, { skip: !baseUrl }, async () => {
    const response = await fetch(new URL("/api/leads", baseUrl), {
      method: "POST",
      headers: { "Content-Type": item.contentType },
      body: item.body,
    });
    assert.equal(response.status, item.status);
    assert.match(response.headers.get("content-type") ?? "", /^application\/json(?:;|$)/u);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.deepEqual(await response.json(), item.expected);
  });
}
