"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMakeUserReview;

function buildMakeUserReview() {
  return function makeUserReview({ ...entity
  }) {
    const {
      userId,
      addedBy,
      bookingId,
      comment,
      rating
    } = { ...entity
    };
    if (!userId) throw new Error('A user review must have a user assigned');
    if (!addedBy) throw new Error('A user review belongs to another user');
    if (!bookingId) throw new Error('A user review belongs to a booking');
    if (!comment) throw new Error('A user review must have a comment');
    if (!rating) throw new Error('A user review must have a rating');
    const userReview = Object.freeze({ ...entity
    });
    return userReview;
  };
}