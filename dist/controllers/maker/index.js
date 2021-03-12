"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _useCases = require("../../use-cases");

var _getMakers = _interopRequireDefault(require("./get-makers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  listMakers
} = _useCases.makerUseCases;
const getMakers = (0, _getMakers.default)({
  listMakers
});
var _default = {
  getMakers
};
exports.default = _default;