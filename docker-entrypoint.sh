#!/bin/sh
set -e

echo "[entrypoint] Applying database schema (prisma db push)…"
./node_modules/.bin/prisma db push --skip-generate

echo "[entrypoint] Updating test contact forms..."
./node_modules/.bin/prisma db execute --file ./prisma/manual-migrations/20260925_test_contact_fields.sql --schema ./prisma/schema.prisma

# Первичное наполнение только если тестов ещё нет — чтобы не затирать правки из админки.
COUNT=$(node -e "const{PrismaClient}=require('@prisma/client');const p=new PrismaClient();p.test.count().then(c=>console.log(c)).catch(()=>console.log(0)).finally(()=>p.\$disconnect())" 2>/dev/null || echo 0)
if [ "$COUNT" = "0" ]; then
  echo "[entrypoint] No tests found, seeding initial data…"
  node prisma/seed.mjs || true
else
  echo "[entrypoint] Data present (tests=$COUNT), skipping seed."
fi

echo "[entrypoint] Starting Next.js…"
exec ./node_modules/.bin/next start -H 0.0.0.0 -p 3000
