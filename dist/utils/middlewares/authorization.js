"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = authorize;

/* eslint-disable consistent-return */
function authorize(roles = []) {
  let autorizeRoles = roles;

  if (typeof roles === 'number') {
    autorizeRoles = [roles];
  }

  return [(req, res, next) => {
    if (autorizeRoles.length && !autorizeRoles.includes(req.user.info.userType)) {
      return res.status(401).json({
        error: 'Unauthorized'
      });
    }

    next();
  }];
}