export default function buildMakeCarReview() {
  return function makeCarReview({ ...entity }) {
    const { carId, addedBy, bookingId, comment, rating } = { ...entity };

    if (!carId) throw new Error('A car review must have a car assigned');
    if (!addedBy) throw new Error('A car review belongs to a user');
    if (!bookingId) throw new Error('A car review belongs to a booking');
    if (!comment) throw new Error('A car review must have a comment');
    if (!rating) throw new Error('A car review must have a rating');

    const carReview = Object.freeze({ ...entity });

    return carReview;
  };
}
