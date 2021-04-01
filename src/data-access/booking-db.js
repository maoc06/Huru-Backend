import { QueryTypes } from 'sequelize';

import { booking } from './models/booking';
import { transaction } from './models/payment';

export default function makeBookingDb({ client }) {
  const bookingModel = booking({ client });

  function findByTransaction(transactionId) {
    return bookingModel.findOne({ where: { transactionId } });
  }

  async function insert(bookingInfo) {
    const transactionModel = transaction({ client });
    const {
      dataValues: { transactionId },
    } = await transactionModel.create({
      paymentId: bookingInfo.paymentId,
      status: 'PENDING',
    });

    const bookingRecord = { ...bookingInfo };
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
    insert,
    confirmBooking,
    updateBookingStatus,
  });
}
