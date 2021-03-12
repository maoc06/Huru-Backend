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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRoutes() {
  const router = _express.default.Router();

  router.use('/auth', (0, _auth.default)());
  router.use('/user', _verifyToken.default, (0, _user.default)());
  router.use('/car', _verifyToken.default, (0, _car.default)());
  router.use('/city', _verifyToken.default, (0, _city.default)());
  router.use('/maker', _verifyToken.default, (0, _maker.default)());
  router.use('/car-basics', _verifyToken.default, (0, _carBasicSettings.default)());
  return router;
}

var _default = getRoutes;
exports.default = _default;