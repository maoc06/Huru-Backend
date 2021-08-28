import buildMakeUser from './user';
import buildMakeUserReview from './user-review';
import buildMakeCredentials from './credentials';
import buildMakeCar from './car';
import buildMakeCity from './city';
import buildMakeBooking from './booking';
import buildMakeCarReview from './car-review';
import buildMakeFavorite from './favorite';
import buildMakeDisableDay from './disable-day';
import buildMakePaymentCard from './payment-card';
import buildMakePaymentNequi from './payment-nequi';

const makeUser = buildMakeUser({});
const makeUserReview = buildMakeUserReview({});
const makeCredentials = buildMakeCredentials({});
const makeCar = buildMakeCar({});
const makeCity = buildMakeCity({});
const makeBooking = buildMakeBooking({});
const makeCarReview = buildMakeCarReview({});
const makeFavorite = buildMakeFavorite({});
const makeDisableDay = buildMakeDisableDay({});
const makePaymentCard = buildMakePaymentCard({});
const makePaymentNequi = buildMakePaymentNequi({});

export {
  makeUser,
  makeUserReview,
  makeCredentials,
  makeCar,
  makeCity,
  makeBooking,
  makeCarReview,
  makeFavorite,
  makeDisableDay,
  makePaymentCard,
  makePaymentNequi,
};
