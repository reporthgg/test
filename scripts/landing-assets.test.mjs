import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(fullPath) : [fullPath];
  }));
  return nested.flat();
}

test("all landing images are nonempty local image files", async () => {
  const images = (await filesIn(path.join(root, "public/landing")))
    .filter((file) => /\.(?:png|jpe?g|svg|webp)$/u.test(file));
  assert.ok(images.length > 20, "Expected the original Figma assets to be present");
  const invalid = [];
  for (const file of images) {
    const bytes = await readFile(file);
    const extension = path.extname(file);
    const valid = bytes.length > 30 && (
      (extension === ".png" && bytes.subarray(0, 8).toString("hex") === "89504e470d0a1a0a") ||
      ([".jpg", ".jpeg"].includes(extension) && bytes.subarray(0, 2).toString("hex") === "ffd8") ||
      (extension === ".webp" && bytes.subarray(8, 12).toString() === "WEBP") ||
      (extension === ".svg" && /<svg[\s>]/u.test(bytes.toString()))
    );
    if (!valid) {
      invalid.push(path.relative(root, file));
    }
  }
  assert.deepEqual(invalid, [], "Invalid images or extensions that do not match their actual format");
});

test("Futura files are actual fonts, not downloaded web pages", async () => {
  for (const style of ["demi", "heavy", "demi-oblique"]) {
    const file = `futura-pt-${style}.ttf`;
    const bytes = await readFile(path.join(root, file));
    assert.ok(bytes.length > 1000, file);
    assert.ok(["00010000", "4f54544f"].includes(bytes.subarray(0, 4).toString("hex")), file);
  }
});

test("every first-screen asset has a Figma node and a local file", async () => {
  const directory = path.join(root, "public/landing/hero");
  const manifest = JSON.parse(await readFile(path.join(directory, "assets.json"), "utf8"));
  for (const [file, node] of Object.entries(manifest.assets)) {
    assert.match(node, /^\d+:\d+$/u, file);
    assert.ok((await readFile(path.join(directory, file))).length > 0, file);
  }
});

test("landing code contains no expiring Figma URLs or placeholder links", async () => {
  const sources = (await filesIn(path.join(root, "src/components/landing")))
    .filter((file) => /\.(?:tsx?|css)$/u.test(file));
  for (const file of sources) {
    const content = await readFile(file, "utf8");
    assert.doesNotMatch(content, /figma\.com\/api\/mcp\/asset/u, file);
    assert.doesNotMatch(content, /href=["']#["']/u, file);
    assert.doesNotMatch(content, /[\u2013\u2014]/u, file);
  }
});
