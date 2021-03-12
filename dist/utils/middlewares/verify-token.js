"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = verifyToken;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("../../../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable consistent-return */
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  _jsonwebtoken.default.verify(token, _config.config.privateKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}