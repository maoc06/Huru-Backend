import { bookingUseCases } from '../../use-cases';

import makePostBooking from './post-booking';
import makePutConfirmBooking from './put-confirm-booking';

const { addBooking, updateConfirmBooking } = bookingUseCases;

const postBooking = makePostBooking({ addBooking });
const putConfirmBooking = makePutConfirmBooking({ updateConfirmBooking });

export default {
  postBooking,
  putConfirmBooking,
};
