export default function makeListByCar({ carReviewDb, carDb, userDb }) {
  return async function listByCar({ carId } = {}) {
    if (!carId) throw new Error('Car id null');

    const existing = await carDb.findById(carId);
    if (!existing) {
      throw new Error('car not found');
    }

    const reviews = await carReviewDb.findByCar(carId);

    await Promise.all(
      reviews.map(async ({ dataValues }) => {
        const review = dataValues;
        const { addedBy } = review;

        const { firstName, lastName, profilePhoto } = await userDb.findByUUID(
          addedBy
        );
        delete review.addedBy;
        review.reviewBy = { uid: addedBy, firstName, lastName, profilePhoto };
      })
    );

    return reviews;
  };
}
