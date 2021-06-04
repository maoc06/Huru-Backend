"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeGetUserReviews;

function makeGetUserReviews({
  listReviews
}) {
  return async function getUserReviews(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };
    const {
      userId
    } = httpRequest.params;

    try {
      const reviews = await listReviews({
        userId
      });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List user reviews',
          data: reviews
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