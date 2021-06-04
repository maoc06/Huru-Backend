"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _addDisableDay = _interopRequireDefault(require("./add-disable-day"));

var _removeDisableDay = _interopRequireDefault(require("./remove-disable-day"));

var _listByCar = _interopRequireDefault(require("./list-by-car"));

var _dataAccess = require("../../data-access");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const addDisableDay = (0, _addDisableDay.default)({
  disableDayDb: _dataAccess.disableDayDb
});
const removeDisableDay = (0, _removeDisableDay.default)({
  disableDayDb: _dataAccess.disableDayDb
});
const listByCar = (0, _listByCar.default)({
  disableDayDb: _dataAccess.disableDayDb,
  carDb: _dataAccess.carDb
});
var _default = {
  addDisableDay,
  removeDisableDay,
  listByCar
};
exports.default = _default;