"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeUploadProfilePic;

function makeUploadProfilePic({
  userDb
}) {
  return function uploadProfilePic(profilePicData) {
    return userDb.insertProfileImage(profilePicData);
  };
}