import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(file) : [file];
  }))).flat();
}

test("school artwork consists of nonempty local images in the declared format", async () => {
  const assets = (await filesIn(path.join(root, "public/school")))
    .filter((file) => /\.(?:png|jpe?g|svg|webp)$/u.test(file));
  assert.ok(assets.length >= 50);
  const incorrectFormats = [];
  for (const file of assets) {
    const bytes = await readFile(file);
    assert.ok(bytes.length > 30, file);
    switch (path.extname(file)) {
      case ".png":
        if (bytes.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") incorrectFormats.push(file);
        break;
      case ".jpg":
      case ".jpeg":
        if (bytes.subarray(0, 2).toString("hex") !== "ffd8") incorrectFormats.push(file);
        break;
      case ".webp":
        if (bytes.subarray(8, 12).toString() !== "WEBP") incorrectFormats.push(file);
        break;
      case ".svg":
        assert.match(bytes.toString(), /<svg[\s>]/u, file);
        break;
      default:
        assert.fail(`Unexpected image format: ${file}`);
    }
  }
  assert.deepEqual(incorrectFormats, [], "Image extensions must match the actual format");
});

test("hero, partners and certificate artwork retain their Figma source nodes", async () => {
  const directory = path.join(root, "public/school");
  const manifest = JSON.parse(await readFile(path.join(directory, "assets.json"), "utf8"));
  assert.equal(manifest.fileKey, "42okfRbJjXQGNEN6EDGh7X");
  for (const [file, node] of Object.entries(manifest.assets)) {
    assert.match(node, /^\d+:\d+$/u, file);
    assert.ok((await readFile(path.join(directory, file))).length > 30, file);
  }
});

test("school components use local assets and no placeholder links", async () => {
  const sources = (await filesIn(path.join(root, "src/components/school")))
    .filter((file) => /\.(?:tsx?|css)$/u.test(file) && !file.endsWith(".test.ts"));
  for (const file of sources) {
    const content = await readFile(file, "utf8");
    assert.doesNotMatch(content, /figma\.com\/api\/mcp\/asset/u, file);
    assert.doesNotMatch(content, /href=["']#["']/u, file);
    assert.doesNotMatch(content, /[\u2013\u2014]/u, file);
    for (const match of content.matchAll(/(?:src|srcSet)=["'](\/school\/[^"'{}]+)["']/gu)) {
      assert.ok((await readFile(path.join(root, "public", match[1]))).length > 30, `${file}: ${match[1]}`);
    }
  }
});
