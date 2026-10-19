import assert from "node:assert/strict";
import { test } from "node:test";
import { leadProduct, UNKNOWN_PRODUCT } from "./lead-product";

test("product follows the page when the form has no choice", () => {
  assert.equal(leadProduct({ page: "/school" }), "Языковая школа");
  assert.equal(leadProduct({ page: "/kz/school" }), "Языковая школа");
  assert.equal(leadProduct({ page: "/en/school" }), "Языковая школа");
  assert.equal(leadProduct({ page: "/exams" }), "IELTS / SAT");
  assert.equal(leadProduct({ page: "/abroad" }), "Поступление за рубеж");
  assert.equal(leadProduct({ page: "/kz/camps" }), "Лагерь");
  assert.equal(leadProduct({ page: "/" }), UNKNOWN_PRODUCT);
  assert.equal(leadProduct({ page: "/about" }), UNKNOWN_PRODUCT);
  assert.equal(leadProduct({ page: "/schooling" }), UNKNOWN_PRODUCT);
  assert.equal(leadProduct({}), UNKNOWN_PRODUCT);
});

test("an explicit choice in the form wins over the page", () => {
  assert.equal(leadProduct({ page: "/", program: "Подготовка к IELTS" }), "IELTS");
  assert.equal(leadProduct({ page: "/", program: "Летние лагеря" }), "Лагерь");
  assert.equal(leadProduct({ page: "/school", course: "General English" }), "General English");
  assert.equal(leadProduct({ page: "/exams", course: "IELTS" }), "IELTS");
  assert.equal(leadProduct({ page: "/", camp: "Лондон" }), "Лагерь");
  assert.equal(leadProduct({ page: "/school", course: " " }), "Языковая школа");
});

test("the «Что интересует» answer sets the product unless the visitor is unsure", () => {
  assert.equal(leadProduct({ page: "/", interest: "IELTS" }), "IELTS");
  assert.equal(leadProduct({ page: "/school", interest: "Китайский язык", course: "General English" }), "Китайский язык");
  assert.equal(leadProduct({ page: "/exams", interest: "Пока не знаю" }), "IELTS / SAT");
  assert.equal(leadProduct({ page: "/school", interest: "Пока не знаю", course: "General English" }), "General English");
});
