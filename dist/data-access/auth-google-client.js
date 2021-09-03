Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _googleAuthLibrary = require('google-auth-library');

const _config = require('../../config');

const oAuth2Client = new _googleAuthLibrary.OAuth2Client({
  clientId: _config.config.googleClientId,
});
const _default = {
  oAuth2Client,
};
exports.default = _default;
