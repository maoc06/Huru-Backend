import makeListByUserOwner from './list-by-user-owner';
import makeListBooking from './list-booking';
import makeListUpcomingBookings from './list-upcoming-bookings';
import makeListBookingsHistory from './list-history-bookings';
import makeCountCompletedTrips from './count-completed-trips';
import makeCountCompletedTripsByCar from './count-completed-trips-by-car';
import makeAddBooking from './add-booking';
import makeCancelBooking from './cancel-booking';
import makeUpdateConfirmBooking from './update-confirm-booking';
import makeDestroyBooking from './destroy-booking';

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

const countCompletedTrips = makeCountCompletedTrips({
  bookingDb,
  userDb,
});

const countCompletedTripsByCar = makeCountCompletedTripsByCar({
  bookingDb,
  carDb,
});

const cancelBooking = makeCancelBooking({ bookingDb });

const addBooking = makeAddBooking({
  bookingDb,
  userDb,
  carDb,
  paymentUserDb,
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

const destroyBooking = makeDestroyBooking({
  bookingDb,
});

export default {
  listByUserOwner,
  listBooking,
  listUpcomingBookings,
  listBookingsHistory,
  countCompletedTrips,
  countCompletedTripsByCar,
  cancelBooking,
  addBooking,
  updateConfirmBooking,
  destroyBooking,
};
