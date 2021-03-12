"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _welcomeMail = _interopRequireDefault(require("./welcome-mail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sendWelcomeMail = (0, _welcomeMail.default)();
var _default = {
  sendWelcomeMail
};
exports.default = _default;