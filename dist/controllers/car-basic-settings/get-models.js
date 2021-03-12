"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeGetModels;

function makeGetModels({
  listModels
}) {
  return async function getModels() {
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const models = await listModels();
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List all car models',
          data: models
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