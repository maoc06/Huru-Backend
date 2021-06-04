"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makePostFavorite;

function makePostFavorite({
  addFavorite
}) {
  return async function postFavorite(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const { ...favoriteInfo
      } = httpRequest.body;
      const favorite = await addFavorite({ ...favoriteInfo
      });
      return {
        headers,
        statusCode: 201,
        body: {
          message: 'Favorite successfully added',
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