import makeListByUserOwner from './list-by-user-owner';
import makeListBooking from './list-booking';
import makeListUpcomingBookings from './list-upcoming-bookings';
import makeListBookingsHistory from './list-history-bookings';
import makeAddBooking from './add-booking';
import makeCancelBooking from './cancel-booking';
import makeUpdateConfirmBooking from './update-confirm-booking';

import mailer from '../../mails';

import {
  bookingDb,
  transactionDb,
  userDb,
  carDb,
  carReviewDb,
  paymentUserDb,
  paymentGateway,
} from '../../data-access';

const {
  sendBookingRequestMail,
  sendBookingAcceptedtMail,
  sendBookingRejectedMail,
} = mailer;

const listByUserOwner = makeListByUserOwner({ bookingDb, userDb });

const listBooking = makeListBooking({ bookingDb });

const listUpcomingBookings = makeListUpcomingBookings({
  bookingDb,
  userDb,
});

const listBookingsHistory = makeListBookingsHistory({
  bookingDb,
  userDb,
  carReviewDb,
});

const cancelBooking = makeCancelBooking({ bookingDb });

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
  listUpcomingBookings,
  listBookingsHistory,
  cancelBooking,
  addBooking,
  updateConfirmBooking,
};
