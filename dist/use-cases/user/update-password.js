"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeUpdatePassword;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeUpdatePassword({
  userDb
}) {
  return async function updatePassword({
    passwordData
  } = {}) {
    const {
      uuid,
      currPassword,
      newPassword
    } = passwordData;
    const existing = await userDb.findByUUID(uuid);

    if (!existing) {
      throw new RangeError(`User with id ${uuid} not found`);
    }

    console.log(existing);
    const {
      dataValues: {
        password: passwordDb
      }
    } = existing; // Validar la password

    const validPassword = await _bcryptjs.default.compare(currPassword, passwordDb);
    if (!validPassword) throw new Error('auth/invalid-password'); // Hash password

    const salt = await _bcryptjs.default.genSalt(10);
    const hashNewPassword = await _bcryptjs.default.hash(newPassword, salt);
    const updateData = {
      uuid,
      password: hashNewPassword
    };
    return userDb.updateProfile(updateData);
  };
}