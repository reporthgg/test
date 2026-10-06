import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const textFile = /\.(?:[cm]?[jt]sx?|css|md|json)$/u;
const prohibited = /[\u2013\u2014]/u;
const errors = [];
const changedFiles = new Set();

function git(args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" });
}

const diff = git(["diff", "HEAD", "--unified=0", "--no-ext-diff", "--", "src", "scripts"]);
let file = "";
let lineNumber = 0;

for (const line of diff.split("\n")) {
  if (line.startsWith("+++ b/")) {
    file = line.slice(6).replace(/\r$/u, "");
    if (textFile.test(file)) changedFiles.add(file);
    continue;
  }
  const hunk = /^@@ -\d+(?:,\d+)? \+(\d+)/u.exec(line);
  if (hunk) {
    lineNumber = Number(hunk[1]);
    continue;
  }
  if (line.startsWith("+") && !line.startsWith("+++")) {
    if (textFile.test(file) && prohibited.test(line.slice(1))) {
      errors.push(`${file}:${lineNumber}: замените длинное или среднее тире`);
    }
    lineNumber += 1;
  } else if (line.startsWith(" ")) {
    lineNumber += 1;
  }
}

for (const untracked of git(["ls-files", "--others", "--exclude-standard", "-z", "--", "src", "scripts"]).split("\0")) {
  if (!untracked || !textFile.test(untracked)) continue;
  changedFiles.add(untracked);
  readFileSync(path.join(root, untracked), "utf8").split("\n").forEach((line, index) => {
    if (prohibited.test(line)) {
      errors.push(`${untracked}:${index + 1}: замените длинное или среднее тире`);
    }
  });
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Текст проверен: ${changedFiles.size} изменённых файлов, запрещённых тире нет.`);
}
