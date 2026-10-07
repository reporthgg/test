import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import { site } from "./site";

test("office list contains the two Astana branches and the verified Almaty address", () => {
  assert.deepEqual(site.offices.map(({ city, address }) => ({ city, address })), [
    { city: "Астана", address: "ул. Сыганак, 15" },
    { city: "Астана", address: "ул. Улы Дала, 41/6" },
    { city: "Алматы", address: "пр. Сейфуллина, 575" },
  ]);
});

test("each office has its own map preview", () => {
  const previews = site.offices.map((office) => office.mapPreview);
  assert.equal(new Set(previews).size, site.offices.length);
  for (const office of site.offices) {
    assert.match(office.mapPreview, /^\/landing\/contacts\/maps\/[a-z-]+\.png$/u);
    assert.equal(new URL(office.gis).hostname, "go.2gis.com");
  }
});

test("office map screenshots are valid, large enough and not duplicates", async () => {
  const fingerprints = new Set<string>();
  for (const office of site.offices) {
    const bytes = await readFile(path.join(process.cwd(), "public", office.mapPreview));
    assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a", office.address);
    assert.ok(bytes.readUInt32BE(16) >= 738, `${office.address}: image width`);
    assert.ok(bytes.readUInt32BE(20) >= 363, `${office.address}: image height`);
    const fingerprint = createHash("sha256").update(bytes).digest("hex");
    assert.ok(!fingerprints.has(fingerprint), `${office.address}: duplicate map screenshot`);
    fingerprints.add(fingerprint);
  }
});
