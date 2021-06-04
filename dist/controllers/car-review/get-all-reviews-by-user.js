"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeGetAllReviewsByCar;

function makeGetAllReviewsByCar({
  allReviewsByUser
}) {
  return async function getAllReviewsByCar(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };
    const {
      userId
    } = httpRequest.params;

    try {
      const data = await allReviewsByUser({
        userId
      });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List all reviews by user',
          data
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