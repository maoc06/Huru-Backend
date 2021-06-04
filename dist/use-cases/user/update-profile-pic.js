"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeUpdateProfilePic;

var _actionsS = require("../../utils/actions-s3");

function makeUpdateProfilePic({
  userDb
}) {
  return async function updateProfilePic(profilePicData) {
    const {
      uid,
      originalUrl
    } = profilePicData;
    const existing = await userDb.findByUUID(uid);

    if (!existing) {
      throw new RangeError(`User with id ${uid} not found`);
    }

    const newPicUrl = await userDb.insertProfileImage(profilePicData);
    const updateData = {
      uuid: uid,
      profilePhoto: newPicUrl
    };
    await userDb.updateProfile(updateData);

    if (originalUrl !== '/') {
      // remove image from bucket
      const key = originalUrl.substring(originalUrl.lastIndexOf('/') + 1, originalUrl.length);
      (0, _actionsS.deletFileS3)({
        key
      });
    }

    return newPicUrl;
  };
}