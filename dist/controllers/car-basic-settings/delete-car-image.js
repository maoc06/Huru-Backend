"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeDeleteCarImage;

function makeDeleteCarImage({
  removeCarImage
}) {
  return async function deleteCarImage(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const {
        carImageId
      } = httpRequest.params;
      const carImage = await removeCarImage(carImageId);
      return {
        headers,
        statusCode: 201,
        body: {
          message: 'Car image successfully deleted',
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