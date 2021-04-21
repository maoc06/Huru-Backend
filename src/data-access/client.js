import { Sequelize } from 'sequelize';
// import twilio from 'twilio';

import { config } from '../../config';

const client = new Sequelize(config.dbUri);

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
