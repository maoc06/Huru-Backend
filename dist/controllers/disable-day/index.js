"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _useCases = require("../../use-cases");

var _postDisableDay = _interopRequireDefault(require("./post-disable-day"));

var _deleteDisableDay = _interopRequireDefault(require("./delete-disable-day"));

var _getByCar = _interopRequireDefault(require("./get-by-car"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  addDisableDay,
  removeDisableDay,
  listByCar
} = _useCases.disableDayUseCases;
const postDisableDay = (0, _postDisableDay.default)({
  addDisableDay
});
const deleteDisableDay = (0, _deleteDisableDay.default)({
  removeDisableDay
});
const getByCar = (0, _getByCar.default)({
  listByCar
});
var _default = {
  postDisableDay,
  deleteDisableDay,
  getByCar
};
exports.default = _default;