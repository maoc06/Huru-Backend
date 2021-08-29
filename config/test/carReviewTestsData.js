class CarReviewTestData {
  constructor() {
    this.review = {
      carId: 29,
      addedBy: '97b1fd63-7310-44cf-bd10-e796bb58d310',
      bookingId: 1,
      comment: 'this is a test comment to review and rate a vehicle',
      rating: 4.5,
    };
  }

  getReview = () => this.review;

  getReviewNoCar = () => {
    const review = { ...this.review };
    review.carId = 999;
    return review;
  };

  getReviewNoUserAdded = () => {
    const review = { ...this.review };
    review.addedBy = '99b1fd66-7310-66cf-bd10-e799bb58d310';
    return review;
  };

  getReviewNoBooking = () => {
    const review = { ...this.review };
    review.bookingId = 999;
    return review;
  };

  getReviewMinLength = () => {
    const review = { ...this.review };
    review.comment = 'too short comment';
    return review;
  };

  getReviewEmptyComment = () => {
    const review = { ...this.review };
    review.comment = '';
    return review;
  };

  getRatingOutRange = ({ ratingTestValue = 0.5 }) => {
    const review = { ...this.review };
    review.rating = ratingTestValue;
    return review;
  };
}

module.exports = { CarReviewTestData };
