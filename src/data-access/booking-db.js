import { QueryTypes } from 'sequelize';

import { booking } from './models/booking';
import { transaction } from './models/payment';

export default function makeBookingDb({ client }) {
  const bookingModel = booking({ client });

  function findByTransaction(transactionId) {
    return bookingModel.findOne({ where: { transactionId } });
  }

  function findById(bookingId) {
    return bookingModel.findByPk(bookingId);
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
        )`,
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
    insert,
    confirmBooking,
    updateBookingStatus,
  });
}
