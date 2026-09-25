BEGIN IMMEDIATE;

UPDATE "Test"
SET "contactFields" = '[]',
    "sourceHash" = '066f68241714a4780423a27927f6abc69d997c31ad9a1b1ec5f59df7d31c4da6',
    "updatedAt" = CAST(strftime('%s', 'now') AS INTEGER) * 1000 + CAST(substr(strftime('%f', 'now'), 4, 3) AS INTEGER)
WHERE "sourceKey" = 'tilda:3304416:71753845:1571254661'
  AND "sourceHash" = '453bd4954b72326ec33d32396de15d208cdd24ff258e06c272698d39c5d6b74d'
  AND CASE WHEN json_valid("contactFields") THEN json("contactFields") END = json('[{"name":"age","label":"Возраст","required":true},{"name":"city","label":"Город","required":true},{"name":"branch","label":"Филиал","required":true,"options":["Город Астана, пр. Улы Дала 41/6","Город Астана, ул. Сыганак 15","Город Алматы, ул. Сейфуллина 575"]},{"name":"studyFormat","label":"Удобный формат занятий","required":true,"options":["Оффлайн"]}]');

UPDATE "Test"
SET "contactFields" = '[]',
    "sourceHash" = 'b3197a243202891b0af27cb924072e51d71d0532dbb90b87884ca2b92d19f4da',
    "updatedAt" = CAST(strftime('%s', 'now') AS INTEGER) * 1000 + CAST(substr(strftime('%f', 'now'), 4, 3) AS INTEGER)
WHERE "sourceKey" = 'tilda:3304416:71753845:1667099501'
  AND "sourceHash" = '155c504b20792006127a9e429dfefc53d9ea462921ef5afe37cef00bb9f5e9d0'
  AND CASE WHEN json_valid("contactFields") THEN json("contactFields") END = json('[{"name":"age","label":"Возраст","required":true},{"name":"city","label":"Город","required":true},{"name":"branch","label":"Филиал","required":true,"options":["Город Астана, пр. Улы Дала 41/6","Город Астана, ул. Сыганак 15","Город Алматы, ул. Сейфуллина 575"]},{"name":"studyFormat","label":"Удобный формат занятий","required":true,"options":["Оффлайн"]}]');

UPDATE "Test"
SET "contactFields" = '[]',
    "sourceHash" = 'a60be198b43b4b2736d710ca6643dbd4cc5adc53d2048efda91982d9fb7e74e0',
    "updatedAt" = CAST(strftime('%s', 'now') AS INTEGER) * 1000 + CAST(substr(strftime('%f', 'now'), 4, 3) AS INTEGER)
WHERE "sourceKey" = 'tilda:3304416:71753845:1571247411'
  AND "sourceHash" = 'a60f0d8bdf7c7beb2e526a27764bf5541fa89940a50b20128b5abbac4d2e25df'
  AND CASE WHEN json_valid("contactFields") THEN json("contactFields") END = json('[{"name":"age","label":"Возраст","required":true},{"name":"city","label":"Город","required":true},{"name":"branch","label":"Филиал","required":true,"options":["Город Астана, пр. Улы Дала 41/6","Город Астана, ул. Сыганак 15","Город Алматы, ул. Сейфуллина 575"]},{"name":"studyFormat","label":"Удобный формат занятий","required":true,"options":["Оффлайн"]}]');

UPDATE "Test"
SET "contactFields" = '[]',
    "sourceHash" = 'd4d391a9f69201304efe01f9ca774783ca39e109481eeb9e7098fdc0ada5f556',
    "updatedAt" = CAST(strftime('%s', 'now') AS INTEGER) * 1000 + CAST(substr(strftime('%f', 'now'), 4, 3) AS INTEGER)
WHERE "sourceKey" = 'tilda:3304416:71753845:1571260541'
  AND "sourceHash" = '695fee09c5a2c354192e04f75172a32a3b9aabe420d817d65dc5676b4b1076d3'
  AND CASE WHEN json_valid("contactFields") THEN json("contactFields") END = json('[{"name":"age","label":"Ваш возраст","required":true},{"name":"city","label":"Город","required":true},{"name":"branch","label":"Филиал","required":true,"options":["Город Астана, пр. Улы Дала 41/6","Город Астана, ул. Сыганак 15","Город Алматы, ул. Сейфуллина 575"]},{"name":"studyFormat","label":"Удобный формат занятий","required":true,"options":["Оффлайн"]}]');

UPDATE "Test"
SET "contactFields" = '[]',
    "sourceHash" = '8ad7cbce414698de7d6baccbd5aafbb1f001e5b4de3926cbc6eed9717044b456',
    "updatedAt" = CAST(strftime('%s', 'now') AS INTEGER) * 1000 + CAST(substr(strftime('%f', 'now'), 4, 3) AS INTEGER)
WHERE "sourceKey" = 'tilda:3304416:71753845:1571258411'
  AND "sourceHash" = 'bb6313c8721e16e999449111827765da53af82eea2c66858ffa110adb02c5295'
  AND CASE WHEN json_valid("contactFields") THEN json("contactFields") END = json('[{"name":"age","label":"Возраст","required":true},{"name":"city","label":"Город","required":true},{"name":"branch","label":"Филиал","required":true,"options":["Город Астана, пр. Улы Дала 41/6","Город Астана, ул. Сыганак 15","Город Алматы, ул. Сейфуллина 575"]},{"name":"studyFormat","label":"Удобный формат занятий","required":true,"options":["Оффлайн"]}]');

COMMIT;
