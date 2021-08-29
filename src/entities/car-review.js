export default function buildMakeCarReview() {
  return function makeCarReview({ ...entity }) {
    const { carId, addedBy, bookingId, comment, rating } = { ...entity };

    if (!carId) throw new Error('A car review must have a car assigned');
    if (!addedBy) throw new Error('A car review belongs to a user');
    if (!bookingId) throw new Error('A car review belongs to a booking');
    if (!comment) throw new Error('A car review must have a comment');
    if (!(comment.length >= 20 && comment.length <= 1000))
      throw new Error(
        'A car review must have a comment with length between 20 to 1000 characters'
      );
    if (!rating) throw new Error('A car review must have a rating');
    if (!(rating >= 1.0 && rating <= 5.0))
      throw new Error(
        'A car review must have a rating between 1.0 to 5.0 value'
      );

    const carReview = Object.freeze({ ...entity });

    return carReview;
  };
}
