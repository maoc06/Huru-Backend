import buildMakeUser from './user';
import buildMakeCredentials from './credentials';
import buildMakeCar from './car';
import buildMakeCity from './city';
import buildMakeBooking from './booking';

const makeUser = buildMakeUser({});
const makeCredentials = buildMakeCredentials({});
const makeCar = buildMakeCar({});
const makeCity = buildMakeCity({});
const makeBooking = buildMakeBooking({});

export { makeUser, makeCredentials, makeCar, makeCity, makeBooking };
