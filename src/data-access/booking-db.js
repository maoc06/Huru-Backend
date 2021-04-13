import { QueryTypes, Op } from 'sequelize';

import { booking } from './models/booking';
import { transaction } from './models/payment';

const PENDING_APPROVAL_BOOKING_ID = 1;
const COMPLETED_BOOKING_ID = 4;
const APPROVED_BOOKING_ID = 5;
const CANCELED_BOOKING_ID = 7;

export default function makeBookingDb({ client }) {
  const bookingModel = booking({ client });

  function findByTransaction(transactionId) {
    return bookingModel.findOne({ where: { transactionId } });
  }

  function findById(bookingId) {
    return bookingModel.findByPk(bookingId);
  }

  function findUpcomingBookings(uuid) {
    return bookingModel.findAll({
      attributes: [
        'id',
        'bookingCar',
        'bookingBy',
        'checkin',
        'checkout',
        'bookingStatus',
      ],
      where: {
        bookingBy: uuid,
        bookingStatus: {
          [Op.or]: [PENDING_APPROVAL_BOOKING_ID, APPROVED_BOOKING_ID],
        },
      },
      order: [['id', 'DESC']],
    });
  }

  function findBookingsHistory(uuid) {
    return bookingModel.findAll({
      attributes: [
        'id',
        'bookingCar',
        'bookingBy',
        'checkin',
        'checkout',
        'bookingStatus',
      ],
      where: {
        bookingBy: uuid,
        bookingStatus: {
          [Op.or]: [COMPLETED_BOOKING_ID, CANCELED_BOOKING_ID],
        },
      },
      order: [['id', 'DESC']],
    });
  }

  async function findByUser(uuid) {
    const bookingRequests = await client.query(
      `SELECT 
        booking.booking_id,
        booking.car_id,
        booking.user_id,
        booking.check_in_date,
        booking.check_out_date
      FROM 
        booking
      WHERE
        car_id in 
        (
          SELECT
            car_id
          FROM
            car
          WHERE
            user_id=:uuid
        )
      ORDER BY booking.booking_id DESC`,
      {
        replacements: {
          uuid,
        },
        type: QueryTypes.SELECT,
      }
    );
    return bookingRequests;
  }

  async function insert(bookingInfo) {
    const transactionModel = transaction({ client });
    const {
      dataValues: { transactionId },
    } = await transactionModel.create({
      paymentId: bookingInfo.paymentId,
      status: 'PENDING',
    });

    const bookingRecord = { ...bookingInfo, bookingStatus: 1 };
    delete bookingRecord.paymentId;
    bookingRecord.transactionId = transactionId;

    return bookingModel.create(bookingRecord);
  }

  async function confirmBooking(bookingId, status) {
    const res = await bookingModel.update(
      { bookingStatus: status },
      { where: { id: bookingId }, returning: true, plain: true }
    );
    return res[1].dataValues;
  }

  async function update(bookingInfo) {
    const { bookingId: id } = bookingInfo;

    const res = await bookingModel.update(bookingInfo, {
      where: { id },
      returning: true,
      plain: true,
    });

    return res[1].dataValues;
  }

  async function updateBookingStatus(
    transactionNumber,
    reference,
    bookingStatus
  ) {
    const transactionUpdate = await client.query(
      `SELECT 
        booking.booking_id
      FROM 
        booking
        NATURAL JOIN transaction
      WHERE
        transaction.transaction_number = :transactionNumber
        AND
        transaction.reference = :reference`,
      {
        replacements: {
          transactionNumber,
          reference,
        },
        type: QueryTypes.SELECT,
      }
    );

    const id = transactionUpdate[0].booking_id;

    return bookingModel.update({ bookingStatus }, { where: { id } });
  }

  return Object.freeze({
    findByTransaction,
    findByUser,
    findById,
    findUpcomingBookings,
    findBookingsHistory,
    insert,
    confirmBooking,
    update,
    updateBookingStatus,
  });
}
