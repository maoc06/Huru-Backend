import { carReview } from './models/car';

export default function makeCarReviewDb({ client }) {
  const reviewModel = carReview({ client });

  function findById(reviewId) {
    return reviewModel.findByPk(reviewId);
  }

  function findByCar(carId) {
    return reviewModel.findAll({ where: { carId } });
  }

  function findByBooking(bookingId) {
    return reviewModel.findOne({ where: { bookingId } });
  }

  function insert({ ...review }) {
    return reviewModel.create(review);
  }

  return Object.freeze({
    findById,
    findByCar,
    findByBooking,
    insert,
  });
}
