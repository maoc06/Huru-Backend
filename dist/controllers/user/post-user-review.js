"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makePostUserReview;

function makePostUserReview({
  addUserReview
}) {
  return async function postUserReview(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const { ...reviewInfo
      } = httpRequest.body;
      const review = await addUserReview({ ...reviewInfo
      });
      return {
        headers,
        statusCode: 201,
        body: {
          message: 'User review successfully added',
          data: review
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