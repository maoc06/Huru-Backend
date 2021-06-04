"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _useCases = require("../../use-cases");

var _getByCar = _interopRequireDefault(require("./get-by-car"));

var _getIfAlreadyReviewed = _interopRequireDefault(require("./get-if-already-reviewed"));

var _getAllReviewsByUser = _interopRequireDefault(require("./get-all-reviews-by-user"));

var _postReview = _interopRequireDefault(require("./post-review"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  listByCar,
  listIfAlreadyReviewed,
  addCarReview,
  allReviewsByUser
} = _useCases.carReviewUseCases;
const getByCar = (0, _getByCar.default)({
  listByCar
});
const getIfAlreadyReviewed = (0, _getIfAlreadyReviewed.default)({
  listIfAlreadyReviewed
});
const getAllReviewsByCar = (0, _getAllReviewsByUser.default)({
  allReviewsByUser
});
const postReview = (0, _postReview.default)({
  addCarReview
});
var _default = {
  getByCar,
  getIfAlreadyReviewed,
  getAllReviewsByCar,
  postReview
};
exports.default = _default;