"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _verifyToken = _interopRequireDefault(require("../utils/middlewares/verify-token"));

var _auth = _interopRequireDefault(require("./auth"));

var _user = _interopRequireDefault(require("./user"));

var _car = _interopRequireDefault(require("./car"));

var _maker = _interopRequireDefault(require("./maker"));

var _carBasicSettings = _interopRequireDefault(require("./car-basic-settings"));

var _city = _interopRequireDefault(require("./city"));

var _search = _interopRequireDefault(require("./search"));

var _booking = _interopRequireDefault(require("./booking"));

var _paymentUser = _interopRequireDefault(require("./payment-user"));

var _paymentGateway = _interopRequireDefault(require("./payment-gateway"));

var _carReview = _interopRequireDefault(require("./car-review"));

var _favorite = _interopRequireDefault(require("./favorite"));

var _disableDay = _interopRequireDefault(require("./disable-day"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRoutes() {
  const router = _express.default.Router();

  router.use('/auth', (0, _auth.default)());
  router.use('/user', (0, _user.default)());
  router.use('/car', (0, _car.default)());
  router.use('/city', (0, _city.default)());
  router.use('/maker', (0, _maker.default)());
  router.use('/car-basics', (0, _carBasicSettings.default)());
  router.use('/search', (0, _search.default)());
  router.use('/booking', (0, _booking.default)());
  router.use('/payment-user', _verifyToken.default, (0, _paymentUser.default)());
  router.use('/payment', (0, _paymentGateway.default)());
  router.use('/car-review', (0, _carReview.default)());
  router.use('/favorite', _verifyToken.default, (0, _favorite.default)());
  router.use('/disable-day', _verifyToken.default, (0, _disableDay.default)());
  return router;
}

var _default = getRoutes;
exports.default = _default;