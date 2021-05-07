import { CarModels } from './models';

const { Car, CarReview } = CarModels;

export default function makeCarReviewDb() {
  function findById(reviewId) {
    return CarReview.findByPk(reviewId);
  }

  function findByCar(carId) {
    return CarReview.findAll({ where: { carId } });
  }

  function findByBooking(bookingId) {
    return CarReview.findOne({ where: { bookingId } });
  }

  function findByUser(userId) {
    return CarReview.findAll({
      attributes: { exclude: ['carId'] },
      include: { model: Car, attributes: ['carId'], where: { owner: userId } },
    });
  }

  function insert({ ...review }) {
    return CarReview.create(review);
  }

  return Object.freeze({
    findById,
    findByCar,
    findByBooking,
    findByUser,
    insert,
  });
}
