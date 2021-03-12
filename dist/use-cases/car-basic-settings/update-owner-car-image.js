"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeUpdateOwnerCarImage;

function makeUpdateOwnerCarImage({
  carBasicSettingsDb
}) {
  return function updateOwnerCarImage(arrImages) {
    return carBasicSettingsDb.setOwnerCarImage(arrImages);
  };
}