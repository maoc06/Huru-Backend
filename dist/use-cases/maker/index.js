"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _listMakers = _interopRequireDefault(require("./list-makers"));

var _dataAccess = require("../../data-access");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const listMakers = (0, _listMakers.default)({
  makerDb: _dataAccess.makerDb
});
var _default = {
  listMakers
};
exports.default = _default;