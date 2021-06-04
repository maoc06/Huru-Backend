"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeListByCar;

function makeListByCar({
  carReviewDb,
  carDb,
  userDb
}) {
  return async function listByCar({
    carId
  } = {}) {
    if (!carId) throw new Error('Car id null');
    const existing = await carDb.findById(carId);

    if (!existing) {
      throw new Error('The cart you are trying to add a review to does not exist');
    }

    const reviews = await carReviewDb.findByCar(carId);
    await Promise.all(reviews.map(async ({
      dataValues
    }) => {
      const review = dataValues;
      const {
        addedBy
      } = review;
      const {
        firstName,
        lastName,
        profilePhoto
      } = await userDb.findByUUID(addedBy);
      delete review.addedBy;
      review.reviewBy = {
        uid: addedBy,
        firstName,
        lastName,
        profilePhoto
      };
    }));
    return reviews;
  };
}