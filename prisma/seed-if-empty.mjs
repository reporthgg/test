// Сидирует стартовые данные только если тестов ещё нет — безопасно для прода
// (не затирает правки, сделанные в админке). Запускается на каждом деплое.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
let count = 0;
try {
  count = await prisma.test.count();
} catch {
  count = 0;
}
await prisma.$disconnect();

if (count > 0) {
  console.log(`[seed] данные есть (tests=${count}), начальное заполнение пропускаем.`);
  process.exit(0);
}

console.log("[seed] тесты не найдены, добавляем стартовые данные…");
await import("./seed.mjs");
