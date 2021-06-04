"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeAllReviewsByUser;

function makeAllReviewsByUser({
  carReviewDb,
  userDb
}) {
  return async function allReviewsByUser({
    userId
  } = {}) {
    if (!userId) throw new Error('User id null');
    const existing = await userDb.findByUUID(userId);
    if (!existing) throw new RangeError(`User with id ${userId} not found`);
    const average = await carReviewDb.findByUser(userId);
    return average;
  };
}