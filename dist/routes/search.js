"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressCallback = _interopRequireDefault(require("../express-callback"));

var _controllers = require("../controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSearchRoutes() {
  const router = _express.default.Router();

  router.get('/by-city/:city/:checkIn/:checkOut', (0, _expressCallback.default)(_controllers.carControllers.getCarsByCity));
  return router;
}

var _default = getSearchRoutes;
exports.default = _default;