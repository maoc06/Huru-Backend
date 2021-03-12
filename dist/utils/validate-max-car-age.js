"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateMaxCarAge;

function validateMaxCarAge(year) {
  const dateNow = new Date();
  const dateCarAge = new Date(year, 1, 1);
  let diff = (dateNow.getTime() - dateCarAge.getTime()) / 1000;
  diff /= 60 * 60 * 24;
  const carYearsOld = Math.abs(Math.floor(diff / 365.25));
  if (carYearsOld > 11) return false;
  return true;
}