"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeAddBooking;

var _config = require("../../../config");

var _entities = require("../../entities");

var _dates = require("../../utils/dates");

function makeAddBooking({
  bookingDb,
  userDb,
  carDb,
  sendBookingRequestMail
}) {
  return async function addBooking(bookingInfo) {
    const booking = (0, _entities.makeBooking)(bookingInfo);
    const {
      dataValues: applicantUser
    } = await userDb.findByUUID(booking.bookingBy);

    if (!applicantUser) {
      throw new Error('The user trying to assign to the reservation does not exist');
    }

    const car = await carDb.findById(booking.bookingCar);

    if (!car) {
      throw new Error('The car trying to assign to the reservation does not exist');
    }

    const {
      dataValues: carOwner
    } = await userDb.findByUUID(car.userOwner.uuid);

    if (!carOwner) {
      throw new Error('An unexpected error occurred: car owner does not exist');
    }

    const response = await bookingDb.insert(bookingInfo);
    sendBookingRequestMail({
      emailToSend: carOwner.email,
      carInfo: `${car.maker.name} ${car.model.name} ${car.year}`,
      carImage: car.images[0].imagePath,
      startDate: (0, _dates.formatFullDate)({
        date: booking.checkin,
        type: 'ISO'
      }),
      endDate: (0, _dates.formatFullDate)({
        date: booking.checkout,
        type: 'ISO'
      }),
      applicant: `${applicantUser.firstName} ${applicantUser.lastName}`,
      url: `http://${_config.config.webAppServerBaseUrl}/host/request-details/${19}`
    });
    return response;
  };
}