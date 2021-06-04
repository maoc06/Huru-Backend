"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makePostCarImage;

function makePostCarImage({
  addCarImage
}) {
  return async function postCarImage(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const photoFile = httpRequest.file;
      const {
        uid,
        carId,
        isMain
      } = httpRequest.body;
      const carImage = await addCarImage({
        photoFile,
        uid,
        carId,
        isMain
      });
      return {
        headers,
        statusCode: 201,
        body: {
          message: 'Car image successfully added',
          data: carImage
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