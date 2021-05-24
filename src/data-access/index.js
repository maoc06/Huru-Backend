import { Sequelize } from 'sequelize';
import twilio from 'twilio';

import { config } from '../../config';

import makeVerificationApi from './verification-api';
import makeAuthDb from './auth-db';
import makeUserDb from './user-db';
import makeCarDb from './car-db';
import makeMakerDb from './maker-db';
import makeCarBasicSettingsDb from './car-basic-settings-db';
import makeCityDb from './city-db';
import makeBookingDb from './booking-db';
import makeTransactionDb from './transaction-db';
import makePaymentUserDb from './payment-user';
import makePaymentGateway from './payment-gateway';
import makeCarReviewDb from './car-review-db';
import makeFavoriteDb from './favorite-db';
import makeDisableDayDb from './disable-day-db';

import google from './auth-google-client';

const authGoogleClient = google.oAuth2Client;
const client = new Sequelize(config.dbUri);

client
  .authenticate()
  .then(() => {
    console.log(
      'Connection to the database has been established successfully.'
    );
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const twilioClient = twilio(config.twilioAccountSID, config.twilioToken);

const verificationApi = makeVerificationApi(twilioClient);
const authDb = makeAuthDb({ client });
const userDb = makeUserDb();
const carDb = makeCarDb({ client });
const makerDb = makeMakerDb({ client });
const carBasicSettingsDb = makeCarBasicSettingsDb({ client });
const cityDb = makeCityDb({ client });
const bookingDb = makeBookingDb({ client });
const transactionDb = makeTransactionDb({ client });
const paymentUserDb = makePaymentUserDb({ client });
const paymentGateway = makePaymentGateway({ client });
const carReviewDb = makeCarReviewDb();
const favoriteDb = makeFavoriteDb();
const disableDayDb = makeDisableDayDb();

export {
  client,
  authGoogleClient,
  verificationApi,
  authDb,
  userDb,
  carDb,
  makerDb,
  carBasicSettingsDb,
  cityDb,
  bookingDb,
  transactionDb,
  paymentUserDb,
  paymentGateway,
  carReviewDb,
  favoriteDb,
  disableDayDb,
};
