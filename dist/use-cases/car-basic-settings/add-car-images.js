"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeAddCarImage;

function makeAddCarImage({
  carBasicSettingsDb,
  userDb
}) {
  return async function addCarImage(imageInfo) {
    const {
      uid
    } = imageInfo;
    await validate(uid);
    return carBasicSettingsDb.insertCarImage(imageInfo);
  };

  async function validate(uid) {
    const existing = await userDb.findByUUID(uid);
    if (!existing) throw new Error(`user-not-found`);
  }
}