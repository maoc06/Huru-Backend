import { Sequelize } from 'sequelize';
// import twilio from 'twilio';

import { config } from '../../config';

const client = new Sequelize(config.dbUri, {
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  timezone: '-5:00',
});

// client
//   .authenticate()
//   .then(() => {
//     console.log(
//       'Connection to the database has been established successfully.'
//     );
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

// const twilioClient = twilio(config.twilioAccountSID, config.twilioToken);

export default {
  client,
};
