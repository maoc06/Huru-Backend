"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makePatchProfilePic;

function makePatchProfilePic({
  updateProfilePic
}) {
  return async function patchProfilePic(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };
    const photoFile = httpRequest.file;
    const {
      uid,
      originalUrl
    } = httpRequest.body;

    try {
      const url = await updateProfilePic({
        uid,
        photoFile,
        originalUrl
      });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Update user profile pic successfully',
          url
        }
      };
    } catch (e) {
      console.log(e);
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