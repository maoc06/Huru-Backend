"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeDeleteFavorite;

function makeDeleteFavorite({
  removeFavorite
}) {
  return async function deleteFavorite(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const {
        addedBy,
        carId
      } = httpRequest.params;
      const favorite = await removeFavorite({
        addedBy,
        carId
      });
      return {
        headers,
        statusCode: 201,
        body: {
          message: 'Favorite successfully deleted',
          data: favorite
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