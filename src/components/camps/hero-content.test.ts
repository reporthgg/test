import assert from "node:assert/strict";
import test from "node:test";
import { locales } from "../../i18n/config";
import { campsHeroContent, campsSlideIds, getCampsSlideIndex } from "./hero-content";

test("camps navigation wraps forwards and backwards across all three slides", () => {
  assert.deepEqual(campsSlideIds, ["campus", "winter", "summer"]);
  assert.equal(getCampsSlideIndex(0), 0);
  assert.equal(getCampsSlideIndex(1), 1);
  assert.equal(getCampsSlideIndex(2), 2);
  assert.equal(getCampsSlideIndex(3), 0);
  assert.equal(getCampsSlideIndex(-1), 2);
  assert.equal(getCampsSlideIndex(-2), 1);
  assert.equal(getCampsSlideIndex(-3), 0);
  assert.equal(getCampsSlideIndex(30), 0);
  assert.equal(getCampsSlideIndex(-31), 2);
});

test("all locales provide three complete slides and accessible control labels", () => {
  for (const locale of locales) {
    const text = campsHeroContent[locale];
    assert.equal(text.slides.length, 3, locale);
    for (const label of [
      text.age, text.duration, text.primary, text.secondary, text.carousel,
      text.carouselRole, text.slideRole, text.slide,
      text.previous, text.next, text.pause, text.play,
    ]) {
      assert.ok(label.trim().length > 0, `${locale}: empty label`);
    }
    for (const slide of text.slides) {
      assert.ok(slide.title.trim());
      assert.ok(slide.lastLine.trim());
      assert.ok(slide.description.trim());
      assert.ok(slide.photoAlt.trim());
    }
    assert.match(text.slides[1].title, /2027/u);
    assert.match(text.slides[2].title, /2027/u);
    assert.ok(text.slides[2].continuation);
    assert.ok(text.slides[2].desktopDescriptionTail);
    assert.doesNotMatch(JSON.stringify(text), /[\u2013\u2014]/u, locale);
  }
});

test("campus copy keeps its original programme details in every locale", () => {
  for (const locale of locales) {
    const text = campsHeroContent[locale];
    assert.match(text.age, /12-17/u);
    assert.match(text.duration, /2-3/u);
    assert.match(text.slides[0].description, /5/u);
    assert.match(text.slides[0].description, /Disneyland/u);
  }
});
