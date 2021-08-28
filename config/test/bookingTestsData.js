const { getOperationDate } = require('./datesTestData');

class BookingTestData {
  constructor() {
    this.booking = {
      paymentId: 15893,
      bookingCar: 29,
      bookingBy: '97b1fd63-7310-44cf-bd10-e796bb58d310',
      checkin: getOperationDate({
        date: new Date(),
        days: 4,
      }),
      checkout: getOperationDate({
        date: new Date(),
        days: 8,
      }),
      pricePerDay: 85000,
      siteFees: 21500,
    };

    this.accept = {
      confirm: 5, // ID for accept booking
      email: 'huru@test.com',
    };

    this.reject = {
      confirm: 6, // ID for reject booking
      email: 'huru@test.com',
    };

    this.cancel = {
      bookingStatus: 7, // ID for cancel booking
      cancelDate: '2021-08-11 10:03:04.574',
    };
  }

  getBooking = () => this.booking;

  getConfirm = ({ bookingId, isAccept = true }) => {
    const confirm = isAccept ? { ...this.accept } : { ...this.reject };
    confirm.bookingId = bookingId;
    return confirm;
  };

  getCancel = ({ bookingId }) => {
    const cancel = { ...this.cancel };
    cancel.bookingId = bookingId;
    return cancel;
  };

  getNotExistPayment = () => {
    const booking = { ...this.booking };
    booking.paymentId = 1;
    return booking;
  };

  getNotExistCar = () => {
    const booking = { ...this.booking };
    booking.bookingCar = 999;
    return booking;
  };

  getNotExistUser = () => {
    const booking = { ...this.booking };
    booking.bookingBy = '99b1fd63-7310-43cf-bd10-e899bb58d310';
    return booking;
  };

  getPriceOutOfRange = (priceValueTest = 42000) => {
    const booking = { ...this.booking };
    booking.pricePerDay = priceValueTest;
    return booking;
  };

  getDateNotInFuture = ({
    isCheckIn = true,
    dateValueTest = '2021-04-24 09:00:00',
  }) => {
    const booking = { ...this.booking };
    isCheckIn
      ? (booking.checkin = dateValueTest)
      : (booking.checkout = dateValueTest);

    return booking;
  };

  getDateOutNotGreaterThatIn = () => {
    const booking = { ...this.booking };
    booking.checkout = getOperationDate({
      date: new Date(),
      days: 2,
    });
    return booking;
  };
}

module.exports = { BookingTestData };
