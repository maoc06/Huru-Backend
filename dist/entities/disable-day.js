"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMakeDisableDay;

function buildMakeDisableDay() {
  return function makeDisableDay({ ...entity
  }) {
    const {
      disableDay,
      carId
    } = entity;
    if (!disableDay) throw new Error('Disable day must have a day');
    if (!carId) throw new Error('Disable day must have a car');
    return Object.freeze({ ...entity
    });
  };
}