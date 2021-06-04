"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _listByCar = _interopRequireDefault(require("./list-by-car"));

var _listIfAlreadyReviewed = _interopRequireDefault(require("./list-if-already-reviewed"));

var _addReview = _interopRequireDefault(require("./add-review"));

var _allReviewsByUser = _interopRequireDefault(require("./all-reviews-by-user"));

var _dataAccess = require("../../data-access");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const listByCar = (0, _listByCar.default)({
  carReviewDb: _dataAccess.carReviewDb,
  carDb: _dataAccess.carDb,
  userDb: _dataAccess.userDb
});
const listIfAlreadyReviewed = (0, _listIfAlreadyReviewed.default)({
  carReviewDb: _dataAccess.carReviewDb,
  bookingDb: _dataAccess.bookingDb
});
const addCarReview = (0, _addReview.default)({
  carReviewDb: _dataAccess.carReviewDb
});
const allReviewsByUser = (0, _allReviewsByUser.default)({
  carReviewDb: _dataAccess.carReviewDb,
  userDb: _dataAccess.userDb
});
var _default = {
  listByCar,
  listIfAlreadyReviewed,
  addCarReview,
  allReviewsByUser
};
exports.default = _default;