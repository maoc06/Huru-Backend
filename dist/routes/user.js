"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressCallback = _interopRequireDefault(require("../express-callback"));

var _authorization = _interopRequireDefault(require("../utils/middlewares/authorization"));

var _role = require("../utils/role");

var _controllers = require("../controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUserRoutes() {
  const router = _express.default.Router();

  return router;
}

var _default = getUserRoutes;
exports.default = _default;