"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _client = _interopRequireDefault(require("../../client"));

var _disableDayModel = _interopRequireDefault(require("./disable-day-model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DisableDay = (0, _disableDayModel.default)(_client.default);
var _default = {
  DisableDay
};
exports.default = _default;