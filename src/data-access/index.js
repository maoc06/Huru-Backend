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
const userDb = makeUserDb({ client });
const carDb = makeCarDb({ client });
const makerDb = makeMakerDb({ client });
const carBasicSettingsDb = makeCarBasicSettingsDb({ client });
const cityDb = makeCityDb({ client });

export {
  verificationApi,
  authDb,
  userDb,
  carDb,
  makerDb,
  carBasicSettingsDb,
  cityDb,
};
