"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeGetMakers;

function makeGetMakers({
  listMakers
}) {
  return async function getMakers(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };
    const makerId = httpRequest.params.id;

    try {
      const makers = await listMakers({
        makerId
      });
      return {
        headers,
        statusCode: 200,
        body: {
          message: makerId ? 'Retrieve a maker' : 'List makers',
          data: makers
        }
      };
    } catch (e) {
      console.error(e);
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