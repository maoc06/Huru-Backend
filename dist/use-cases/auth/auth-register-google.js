"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeAuthRegisterGoogle;

var _config = require("../../../config");

function makeAuthRegisterGoogle({
  authGoogleClient
}) {
  return async function authRegisterGoogle({
    token
  }) {
    const ticket = await authGoogleClient.verifyIdToken({
      idToken: token,
      audience: _config.config.googleClientId
    });
    const googleAccount = ticket.getPayload();
    const user = {
      email: googleAccount.email,
      profilePhoto: googleAccount.picture,
      firstName: googleAccount.given_name,
      lastName: googleAccount.family_name
    };
    return user;
  };
}