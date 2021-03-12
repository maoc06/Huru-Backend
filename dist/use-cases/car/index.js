"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _addCar = _interopRequireDefault(require("./add-car"));

var _listCarsByUserOwner = _interopRequireDefault(require("./list-cars-by-user-owner"));

var _listByVin = _interopRequireDefault(require("./list-by-vin"));

var _listByLicensePlate = _interopRequireDefault(require("./list-by-license-plate"));

var _dataAccess = require("../../data-access");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const addCar = (0, _addCar.default)({
  carDb: _dataAccess.carDb,
  userDb: _dataAccess.userDb
});
const listByUserOwner = (0, _listCarsByUserOwner.default)({
  carDb: _dataAccess.carDb,
  userDb: _dataAccess.userDb
});
const listByVin = (0, _listByVin.default)({
  carDb: _dataAccess.carDb
});
const listByLicensePlate = (0, _listByLicensePlate.default)({
  carDb: _dataAccess.carDb
});
var _default = {
  addCar,
  listByUserOwner,
  listByVin,
  listByLicensePlate
};
exports.default = _default;