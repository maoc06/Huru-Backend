import makeListByUserOwner from './list-by-user-owner';
import makeListBooking from './list-booking';
import makeAddBooking from './add-booking';
import makeUpdateConfirmBooking from './update-confirm-booking';

import mailer from '../../mails';

import {
  bookingDb,
  transactionDb,
  userDb,
  carDb,
  paymentUserDb,
  paymentGateway,
} from '../../data-access';

const {
  sendBookingRequestMail,
  sendBookingAcceptedtMail,
  sendBookingRejectedMail,
} = mailer;

const listByUserOwner = makeListByUserOwner({ bookingDb, userDb, carDb });

const listBooking = makeListBooking({ bookingDb });

const addBooking = makeAddBooking({
  bookingDb,
  userDb,
  carDb,
  sendBookingRequestMail,
});

const updateConfirmBooking = makeUpdateConfirmBooking({
  bookingDb,
  transactionDb,
  carDb,
  userDb,
  paymentUserDb,
  paymentGateway,
  sendBookingAcceptedtMail,
  sendBookingRejectedMail,
});

export default {
  listByUserOwner,
  listBooking,
  addBooking,
  updateConfirmBooking,
};
