"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeAddCarReview;

var _entities = require("../../entities");

function makeAddCarReview({
  carReviewDb
}) {
  return async function addCarReview(reviewInfo) {
    const review = (0, _entities.makeCarReview)(reviewInfo);
    return carReviewDb.insert(review);
  };
}