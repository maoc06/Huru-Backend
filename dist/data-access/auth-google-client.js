"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _googleAuthLibrary = require("google-auth-library");

var _config = require("../../config");

const oAuth2Client = new _googleAuthLibrary.OAuth2Client({
  clientId: _config.config.googleClientId
});
var _default = {
  oAuth2Client
};
exports.default = _default;