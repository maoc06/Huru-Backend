"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeAuthCredentials;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _entities = require("../../entities");

var _config = require("../../../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeAuthCredentials({
  authDb,
  handleToken
}) {
  return async function authCredentials(credentials) {
    const user = (0, _entities.makeCredentials)(credentials);
    const {
      email,
      password
    } = user;
    const validatedUser = await validate(email);

    if (validatedUser.status !== undefined && validatedUser.status === 'error') {
      return validatedUser;
    }

    const {
      password: validatedPassword
    } = validatedUser; // Validar la password

    const validPassword = await _bcryptjs.default.compare(password, validatedPassword);
    if (!validPassword) return {
      status: 'error',
      message: 'auth/invalid-password'
    }; // SI las validaciones son ejecutadas con exito:
    // Entonces => generar el token y retornarlo
    // const userAuth = makeUser(validatedUser);

    const info = {
      uid: validatedUser.uuid,
      firstName: validatedUser.firstName,
      lastName: validatedUser.lastName,
      email: validatedUser.email,
      userType: validatedUser.userType,
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
    return user[0].dataValues;
  }
}