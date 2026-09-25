# GSC Study
Сайт образовательного центра: языковые курсы, IELTS, Digital SAT и поступление за рубеж.

Next.js App Router, React, TypeScript и Tailwind CSS. Заявки, тесты и редактируемый контент хранятся в SQLite через Prisma.

## Локальный запуск
Нужен Node.js 22 или новее. Скопируйте `.env.example` в `.env` и заполните параметры доступа.

```sh
npm ci
npm run db:deploy
npm run dev
```

Сайт: `http://localhost:3000`. Админка: `/admin`. Для входа используются `ADMIN_USERNAME` и `ADMIN_PASSWORD`.

`db:deploy` синхронизирует локальную схему и добавляет стартовые данные только в пустую базу. Не запускайте `db:seed` поверх заполненной БД: он пересоздаёт стартовые вопросы.

## Тесты
Редактор находится в `/admin/exams`, результаты доступны из карточки теста. Поддерживаются выбор варианта, ввод слова и письменный ответ. Письменные ответы сохраняются без автоматической оценки.

- `data/imports/tilda/manifest.json`: пять перенесённых тестов.
- `public/test-assets/tilda/`: изображения заданий.
- `prisma/manual-migrations/20260924_test_formats.sql`: изменение схемы.

## Деплой
Пуш в `main` запускает автодеплой Dokploy. Сборка выполняется по `Dockerfile`, домены и HTTPS обслуживает Traefik.

В Dokploy нужны `DATABASE_URL=file:/app/data/prod.db`, параметры доступа из `.env.example` и постоянные тома для `/app/data` и `/app/public/uploads`.

После автодеплоя импорт запускается отдельно в терминале контейнера:

```sh
cd /app
npm run import:tilda -- --dry-run
npm run import:tilda -- --apply
```

Создаются пять черновиков. Существующие тесты и прохождения не заменяются. Перед публикацией нужно сверить шесть записей `sourceAnswerReview` в манифесте; `sourceOptionNumber` означает позицию варианта начиная с единицы.
