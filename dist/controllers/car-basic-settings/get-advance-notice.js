"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeGetAdvanceNotice;

function makeGetAdvanceNotice({
  listAdvanceNotice
}) {
  return async function getAdvanceNotice() {
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const advanceNotice = await listAdvanceNotice();
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List of advance notice options',
          data: advanceNotice
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