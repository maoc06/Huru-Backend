import buildMakeUser from './user';
import buildMakeCredentials from './credentials';
import buildMakeCar from './car';
import buildMakeCity from './city';
import buildMakeBooking from './booking';
import buildMakeCarReview from './car-review';

const makeUser = buildMakeUser({});
const makeCredentials = buildMakeCredentials({});
const makeCar = buildMakeCar({});
const makeCity = buildMakeCity({});
const makeBooking = buildMakeBooking({});
const makeCarReview = buildMakeCarReview({});

export {
  makeUser,
  makeCredentials,
  makeCar,
  makeCity,
  makeBooking,
  makeCarReview,
};
