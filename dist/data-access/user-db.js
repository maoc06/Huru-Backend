"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeUserDb;

var _userModel = _interopRequireDefault(require("./models/user/user-model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeUserDb({
  client
}) {
  const user = (0, _userModel.default)({
    client
  });

  function findByUUID(userId) {
    return user.findByPk(userId);
  }

  async function findByEmail(email) {
    const res = await user.findAll({
      attributes: ['email'],
      where: {
        email
      }
    });
    if (res.length === 0) return {};
    return res[0].dataValues;
  }

  function updateEmailVerification(email, verification) {
    user.update({
      isEmailVerified: verification
    }, {
      where: {
        email
      }
    });
  }

  return Object.freeze({
    findByUUID,
    findByEmail,
    updateEmailVerification
  });
}