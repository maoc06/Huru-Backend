"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeAuthLoginGoogle;

var _config = require("../../../config");

function makeAuthLoginGoogle({
  authGoogleClient,
  authDb,
  handleToken
}) {
  return async function authLoginGoogle({
    token
  }) {
    const ticket = await authGoogleClient.verifyIdToken({
      idToken: token,
      audience: _config.config.googleClientId
    });
    const {
      email
    } = ticket.getPayload();
    const validatedUser = await validate(email);

    if (validatedUser.status !== undefined && validatedUser.status === 'error') {
      return validatedUser;
    } // SI las validaciones son ejecutadas con exito:
    // Entonces => generar el token y retornarlo


    const info = {
      uid: validatedUser.uuid,
      firstName: validatedUser.firstName,
      lastName: validatedUser.lastName,
      email: validatedUser.email,
      userType: validatedUser.userType,
      profilePicture: validatedUser.profilePhoto,
      phone: validatedUser.phone,
      createdAt: validatedUser.createdAt,
      modifiedAt: validatedUser.modifiedAt,
      status: validatedUser.status,
      isEmailVerified: validatedUser.isEmailVerified,
      isPhoneVerified: validatedUser.isPhoneVerified
    };
    const accessToken = handleToken(info, _config.config.privateKey);
    return accessToken;
  };

  async function validate(email) {
    // Verificar que el customer exista
    const existing = await authDb.findByEmail(email);
    if (existing.email === undefined) return {
      status: 'error',
      message: 'auth/user-not-found'
    };
    const user = await authDb.getInfoUser(email);
    return user.dataValues;
  }
}