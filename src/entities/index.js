import buildMakeUser from './user';
import buildMakeCredentials from './credentials';
import buildMakeCar from './car';
import buildMakeCity from './city';

const makeUser = buildMakeUser({});
const makeCredentials = buildMakeCredentials({});
const makeCar = buildMakeCar({});
const makeCity = buildMakeCity({});

export { makeUser, makeCredentials, makeCar, makeCity };
