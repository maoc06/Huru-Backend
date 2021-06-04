"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeBookingDb;

var _sequelize = require("sequelize");

var _models = require("./models");

var _payment = require("./models/payment");

const {
  Booking
} = _models.BookingModels;
const {
  Car,
  Image,
  Maker,
  Model
} = _models.CarModels;
const {
  User
} = _models.UserModels;
const PENDING_APPROVAL_BOOKING_ID = 1;
const COMPLETED_BOOKING_ID = 4;
const APPROVED_BOOKING_ID = 5;
const REJECTED_BOOKING_ID = 6;
const CANCELED_BOOKING_ID = 7;

function makeBookingDb({
  client
}) {
  function findByTransaction(transactionId) {
    return Booking.findOne({
      where: {
        transactionId
      }
    });
  }

  function findById(bookingId) {
    return Booking.findOne({
      attributes: {
        exclude: ['bookingCar', 'bookingBy']
      },
      where: {
        id: bookingId
      },
      include: [{
        model: Car,
        as: 'bookedCar',
        attributes: ['carId', 'year'],
        include: [{
          model: Image,
          as: 'images',
          attributes: ['carImageId', 'imagePath']
        }, {
          model: Maker,
          attributes: ['name']
        }, {
          model: Model,
          attributes: ['name']
        }]
      }, {
        model: User,
        as: 'bookedBy',
        attributes: ['uuid', 'firstName', 'lastName', 'email', 'profilePhoto', 'createdAt']
      }]
    });
  }

  function findUpcomingBookings(uuid) {
    return Booking.findAll({
      attributes: ['id', 'checkin', 'checkout', 'bookingStatus', 'bookingCar'],
      include: {
        model: Car,
        as: 'bookedCar',
        attributes: ['carId', 'year'],
        include: [{
          model: Image,
          as: 'images',
          attributes: ['imagePath'],
          where: {
            isMain: true
          }
        }, {
          model: Maker,
          attributes: ['name']
        }, {
          model: Model,
          attributes: ['name']
        }]
      },
      where: {
        bookingBy: uuid,
        bookingStatus: {
          [_sequelize.Op.or]: [PENDING_APPROVAL_BOOKING_ID, APPROVED_BOOKING_ID]
        }
      },
      order: [['id', 'DESC']]
    });
  }

  function findBookingsHistory(uuid) {
    return Booking.findAll({
      attributes: ['id', 'checkin', 'checkout', 'bookingStatus'],
      where: {
        bookingBy: uuid,
        bookingStatus: {
          [_sequelize.Op.or]: [COMPLETED_BOOKING_ID, REJECTED_BOOKING_ID, CANCELED_BOOKING_ID]
        }
      },
      include: {
        model: Car,
        as: 'bookedCar',
        attributes: ['carId', 'year'],
        include: [{
          model: Image,
          as: 'images',
          attributes: ['imagePath'],
          where: {
            isMain: true
          }
        }, {
          model: Maker,
          attributes: ['name']
        }, {
          model: Model,
          attributes: ['name']
        }]
      },
      order: [['id', 'DESC']]
    });
  }

  async function findByUser({
    uuid,
    limit
  }) {
    const options = {
      attributes: ['id', 'checkin', 'checkout', 'bookingStatus'],
      include: [{
        model: Car,
        as: 'bookedCar',
        attributes: ['carId', 'year'],
        where: {
          owner: uuid
        },
        include: [{
          model: Maker,
          attributes: ['name']
        }, {
          model: Model,
          attributes: ['name']
        }]
      }, {
        model: User,
        as: 'bookedBy',
        attributes: ['uuid', 'firstName', 'lastName', 'profilePhoto']
      }],
      order: [['id', 'DESC']]
    };
    if (limit === 'true') options.limit = 3;
    const bookings = await Booking.findAll(options);
    Promise.all(bookings.map(async item => {
      const data = item.dataValues;
      const car = data.bookedCar.dataValues;
      const {
        dataValues
      } = await Image.findOne({
        attributes: ['imagePath'],
        where: {
          carId: car.carId,
          isMain: true
        }
      });
      car.images = [dataValues];
    }));
    return bookings;
  }

  function countCompletedTrips(userId) {
    return Booking.count({
      where: {
        bookingStatus: COMPLETED_BOOKING_ID
      },
      include: {
        model: Car,
        as: 'bookedCar',
        where: {
          owner: userId
        }
      }
    });
  }

  function countCompletedTripsByCar(carId) {
    return Booking.count({
      where: {
        bookingStatus: COMPLETED_BOOKING_ID
      },
      include: {
        model: Car,
        as: 'bookedCar',
        where: {
          carId
        }
      }
    });
  }

  async function insert(bookingInfo) {
    const transactionModel = (0, _payment.transaction)({
      client
    });
    const {
      dataValues: {
        transactionId
      }
    } = await transactionModel.create({
      paymentId: bookingInfo.paymentId,
      status: 'PENDING'
    });
    const bookingRecord = { ...bookingInfo,
      bookingStatus: 1
    };
    delete bookingRecord.paymentId;
    bookingRecord.transactionId = transactionId;
    return Booking.create(bookingRecord);
  }

  async function confirmBooking(bookingId, status) {
    const res = await Booking.update({
      bookingStatus: status
    }, {
      where: {
        id: bookingId
      },
      returning: true,
      plain: true
    });
    return res[1].dataValues;
  }

  async function update(bookingInfo) {
    const {
      bookingId: id
    } = bookingInfo;
    const res = await Booking.update(bookingInfo, {
      where: {
        id
      },
      returning: true,
      plain: true
    });
    return res[1].dataValues;
  }

  async function updateBookingStatus(transactionNumber, reference, bookingStatus) {
    const transactionUpdate = await client.query(`SELECT 
        booking.booking_id
      FROM 
        booking
        NATURAL JOIN transaction
      WHERE
        transaction.transaction_number = :transactionNumber
        AND
        transaction.reference = :reference`, {
      replacements: {
        transactionNumber,
        reference
      },
      type: _sequelize.QueryTypes.SELECT
    });
    const id = transactionUpdate[0].booking_id;
    return Booking.update({
      bookingStatus
    }, {
      where: {
        id
      }
    });
  }

  return Object.freeze({
    findByTransaction,
    findByUser,
    findById,
    findUpcomingBookings,
    findBookingsHistory,
    countCompletedTrips,
    countCompletedTripsByCar,
    insert,
    confirmBooking,
    update,
    updateBookingStatus
  });
}