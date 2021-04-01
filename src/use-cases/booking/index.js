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
  addBooking,
  updateConfirmBooking,
};
