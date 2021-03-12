"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeHandleToken;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeHandleToken() {
  return function handleToken(info, privateKey, expiresIn = '10 days') {
    return _jsonwebtoken.default.sign({
      info
    }, privateKey, {
      expiresIn
    });
  };
}