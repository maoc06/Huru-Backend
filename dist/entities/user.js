"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMakeUser;

var _validateMinimumAge = _interopRequireDefault(require("../utils/validate-minimum-age"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildMakeUser() {
  return function makeUser({ ...entity
  }) {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      identityDocument,
      dateOfBirth,
      isPhoneVerified
    } = { ...entity
    };
    if (!firstName) throw new Error('User must have a first name');
    if (!lastName) throw new Error('User must have a last name');
    if (!email) throw new Error('User must have an email');
    if (!password) throw new Error('User must have a password');
    if (password.length < 8) throw new Error('The password must be at least 8 characters long');
    if (!phone) throw new Error('User must have a phone number');
    if (!dateOfBirth) throw new Error('User must have a date of birth');
    if (!identityDocument) throw new Error('User must have a identity document number'); // Validete minimum age (19 year old)

    if (!(0, _validateMinimumAge.default)(dateOfBirth)) throw new Error('User must be at least 19 years old to register');
    if (isPhoneVerified === null || isPhoneVerified === undefined) throw new Error('User must have phone verification property');
    const user = Object.freeze({ ...entity
    });
    return user;
  };
}