"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMakeCity;

function buildMakeCity() {
  return function makeCity({
    cityId,
    name
  } = {}) {
    if (!name) {
      throw new Error('City must have a name');
    }

    return Object.freeze({
      getCityId: () => cityId,
      getCityName: () => name
    });
  };
}