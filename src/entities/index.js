import buildMakeUser from './user';
import buildMakeUserReview from './user-review';
import buildMakeCredentials from './credentials';
import buildMakeCar from './car';
import buildMakeCity from './city';
import buildMakeBooking from './booking';
import buildMakeCarReview from './car-review';
import buildMakeFavorite from './favorite';

const makeUser = buildMakeUser({});
const makeUserReview = buildMakeUserReview({});
const makeCredentials = buildMakeCredentials({});
const makeCar = buildMakeCar({});
const makeCity = buildMakeCity({});
const makeBooking = buildMakeBooking({});
const makeCarReview = buildMakeCarReview({});
const makeFavorite = buildMakeFavorite({});

export {
  makeUser,
  makeUserReview,
  makeCredentials,
  makeCar,
  makeCity,
  makeBooking,
  makeCarReview,
  makeFavorite,
};
