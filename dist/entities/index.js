"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeCity = exports.makeCar = exports.makeCredentials = exports.makeUser = void 0;

var _user = _interopRequireDefault(require("./user"));

var _credentials = _interopRequireDefault(require("./credentials"));

var _car = _interopRequireDefault(require("./car"));

var _city = _interopRequireDefault(require("./city"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeUser = (0, _user.default)({});
exports.makeUser = makeUser;
const makeCredentials = (0, _credentials.default)({});
exports.makeCredentials = makeCredentials;
const makeCar = (0, _car.default)({});
exports.makeCar = makeCar;
const makeCity = (0, _city.default)({});
exports.makeCity = makeCity;