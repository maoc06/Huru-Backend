"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makePutOwnerCarImage;

function makePutOwnerCarImage({
  updateOwnerCarImage
}) {
  return async function putOwnerCarImage(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const arrImages = httpRequest.body;
      const ownerCarImage = await updateOwnerCarImage(arrImages);
      return {
        headers,
        statusCode: 201,
        body: {
          message: 'Owner car image successfully updated',
          data: ownerCarImage
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