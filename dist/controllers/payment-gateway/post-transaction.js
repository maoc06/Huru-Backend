"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makePostTransaction;

function makePostTransaction({
  addTransaction
}) {
  return async function postTransaction(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const { ...paymentInfo
      } = httpRequest.body;
      const payment = await addTransaction({ ...paymentInfo
      });
      return {
        headers,
        statusCode: 201,
        body: {
          message: 'The transaction was made',
          data: payment
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