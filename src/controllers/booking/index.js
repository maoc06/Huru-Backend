import { bookingUseCases } from '../../use-cases';

import makeBooking from './get-booking';
import makeGetByUserOwner from './get-by-user-owner';
import makePostBooking from './post-booking';
import makePutConfirmBooking from './put-confirm-booking';

const {
  listBooking,
  listByUserOwner,
  addBooking,
  updateConfirmBooking,
} = bookingUseCases;

const getBooking = makeBooking({ listBooking });
const getByUserOwner = makeGetByUserOwner({ listByUserOwner });
const postBooking = makePostBooking({ addBooking });
const putConfirmBooking = makePutConfirmBooking({ updateConfirmBooking });

export default {
  getBooking,
  getByUserOwner,
  postBooking,
  putConfirmBooking,
};
