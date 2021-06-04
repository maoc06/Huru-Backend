"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makePostProfilePic;

function makePostProfilePic({
  uploadProfilePic
}) {
  return async function postProfilePic(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const photoFile = httpRequest.file;
      const profilePic = await uploadProfilePic({
        photoFile
      });
      return {
        headers,
        statusCode: 201,
        body: {
          message: 'Profile user pic successfully upload',
          url: profilePic
        }
      };
    } catch (e) {
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message
        }
      };
    }
  };
}