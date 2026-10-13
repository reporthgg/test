BEGIN IMMEDIATE;

UPDATE "Test" SET "slug" = 'english'
WHERE "slug" = 'tilda-general-english' AND NOT EXISTS (SELECT 1 FROM "Test" WHERE "slug" = 'english');

UPDATE "Test" SET "slug" = 'sat'
WHERE "slug" = 'tilda-sat' AND NOT EXISTS (SELECT 1 FROM "Test" WHERE "slug" = 'sat');

UPDATE "Test" SET "slug" = 'ielts'
WHERE "slug" = 'tilda-ielts' AND NOT EXISTS (SELECT 1 FROM "Test" WHERE "slug" = 'ielts');

UPDATE "Test" SET "slug" = 'kids-6-8'
WHERE "slug" = 'tilda-kids-6-8' AND NOT EXISTS (SELECT 1 FROM "Test" WHERE "slug" = 'kids-6-8');

UPDATE "Test" SET "slug" = 'kids-9-12'
WHERE "slug" = 'tilda-kids-9-12' AND NOT EXISTS (SELECT 1 FROM "Test" WHERE "slug" = 'kids-9-12');

COMMIT;
