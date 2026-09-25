import path from "node:path";
import { importTildaTests, readTildaManifest } from "./lib/tilda-import";

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  let apply = false;
  let dryRun = false;
  let filename = "data/imports/tilda/manifest.json";
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === "--apply") apply = true;
    else if (argument === "--dry-run") dryRun = true;
    else if (argument === "--manifest" && args[index + 1] && !args[index + 1].startsWith("--")) {
      filename = args[++index];
    } else {
      throw new Error(`Неизвестный или неполный аргумент: ${argument}`);
    }
  }
  if (apply && dryRun) throw new Error("Используйте только --dry-run или --apply");
  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (apply && (!databaseUrl || !databaseUrl.startsWith("file:"))) {
    throw new Error("--apply требует явно заданный DATABASE_URL для SQLite (file:...)");
  }
  const root = process.cwd();
  const manifest = await readTildaManifest(path.resolve(root, filename), root);
  const summary = {
    mode: apply ? "apply" : "dry-run",
    tests: manifest.tests.map((test) => ({
      slug: test.slug,
      sourceKey: test.sourceKey,
      sourceHash: test.sourceHash,
      questions: test.questions.length,
      choices: test.questions.filter((question) => question.type === "choice").length,
      shortText: test.questions.filter((question) => question.type === "short_text").length,
      essays: test.questions.filter((question) => question.type === "essay").length,
      published: false,
      warnings: test.warnings,
    })),
    assets: manifest.assets.length,
    warnings: manifest.warnings,
  };
  if (!apply) {
    console.log(JSON.stringify(summary, null, 2));
    console.log("Проверка завершена. Подключений к БД и записей не было.");
    return;
  }
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient({ datasourceUrl: databaseUrl });
  try {
    const outcomes = await importTildaTests(prisma, manifest);
    console.log(JSON.stringify({ ...summary, outcomes }, null, 2));
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Ошибка импорта");
  process.exitCode = 1;
});
