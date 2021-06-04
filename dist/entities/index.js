"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeDisableDay = exports.makeFavorite = exports.makeCarReview = exports.makeBooking = exports.makeCity = exports.makeCar = exports.makeCredentials = exports.makeUserReview = exports.makeUser = void 0;

var _user = _interopRequireDefault(require("./user"));

var _userReview = _interopRequireDefault(require("./user-review"));

var _credentials = _interopRequireDefault(require("./credentials"));

var _car = _interopRequireDefault(require("./car"));

var _city = _interopRequireDefault(require("./city"));

var _booking = _interopRequireDefault(require("./booking"));

var _carReview = _interopRequireDefault(require("./car-review"));

var _favorite = _interopRequireDefault(require("./favorite"));

var _disableDay = _interopRequireDefault(require("./disable-day"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeUser = (0, _user.default)({});
exports.makeUser = makeUser;
const makeUserReview = (0, _userReview.default)({});
exports.makeUserReview = makeUserReview;
const makeCredentials = (0, _credentials.default)({});
exports.makeCredentials = makeCredentials;
const makeCar = (0, _car.default)({});
exports.makeCar = makeCar;
const makeCity = (0, _city.default)({});
exports.makeCity = makeCity;
const makeBooking = (0, _booking.default)({});
exports.makeBooking = makeBooking;
const makeCarReview = (0, _carReview.default)({});
exports.makeCarReview = makeCarReview;
const makeFavorite = (0, _favorite.default)({});
exports.makeFavorite = makeFavorite;
const makeDisableDay = (0, _disableDay.default)({});
exports.makeDisableDay = makeDisableDay;