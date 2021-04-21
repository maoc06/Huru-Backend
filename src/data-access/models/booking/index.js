import client from '../../client';

import buildBookingModel from './booking';
import buildBookingStatusModel from './booking-status';

const Booking = buildBookingModel(client);
const BookingStatus = buildBookingStatusModel(client);

export default { Booking, BookingStatus };

export {
  buildBookingStatusModel as bookingStatus,
  buildBookingModel as booking,
};
