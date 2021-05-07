import { bookingUseCases } from '../../use-cases';

import makeBooking from './get-booking';
import makeGetByUserOwner from './get-by-user-owner';
import makeGetUpcomingBookings from './get-upcoming-bookings';
import makeGetBookingsHistory from './get-history-bookings';
import makeGetCountCompletedTrips from './get-count-completed-trips';
import makePostBooking from './post-booking';
import makePutConfirmBooking from './put-confirm-booking';
import makePutCancelBooking from './put-cancel-booking';

const {
  listBooking,
  listByUserOwner,
  listUpcomingBookings,
  listBookingsHistory,
  countCompletedTrips,
  cancelBooking,
  addBooking,
  updateConfirmBooking,
} = bookingUseCases;

const getBooking = makeBooking({ listBooking });
const getByUserOwner = makeGetByUserOwner({ listByUserOwner });
const getUpcomingBookings = makeGetUpcomingBookings({ listUpcomingBookings });
const getBookingsHistory = makeGetBookingsHistory({ listBookingsHistory });
const getCountCompletedTrips = makeGetCountCompletedTrips({
  countCompletedTrips,
});
const postBooking = makePostBooking({ addBooking });
const putConfirmBooking = makePutConfirmBooking({ updateConfirmBooking });
const putCancelBooking = makePutCancelBooking({ cancelBooking });

export default {
  getBooking,
  getByUserOwner,
  getUpcomingBookings,
  getBookingsHistory,
  getCountCompletedTrips,
  postBooking,
  putConfirmBooking,
  putCancelBooking,
};
