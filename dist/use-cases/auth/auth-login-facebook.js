"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeAuthLoginFacebook;

var _config = require("../../../config");

function makeAuthLoginFacebook({
  authDb,
  handleToken
}) {
  return async function authLoginFacebook(email) {
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