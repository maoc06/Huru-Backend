"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeGetFuel;

function makeGetFuel({
  listFuel
}) {
  return async function getFuel() {
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const fuel = await listFuel();
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List fuel options',
          data: fuel
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