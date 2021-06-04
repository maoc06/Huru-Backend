"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeGetDefaultPaymentByUser;

function makeGetDefaultPaymentByUser({
  listDefaultPaymentByUser
}) {
  return async function getDefaultPaymentByUser(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };
    const uuid = httpRequest.params.id;

    try {
      const paymentMethod = await listDefaultPaymentByUser({
        uuid
      });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Retrieve default payment method',
          data: paymentMethod
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