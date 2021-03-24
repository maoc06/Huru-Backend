/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line node/no-unpublished-require
const dotenv = require('dotenv');

dotenv.config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  cors: process.env.CORS,
  dbUri: process.env.DB_URI,
  privateKey: process.env.PRIVATE_KEY,
  awsBucketName: process.env.AWS_BUCKET_NAME,
  twilioToken: process.env.TWILIO_AUTH_TOKEN,
  twilioAccountSID: process.env.TWILIO_ACCOUNT_SID,
  twilioVerifyServiceId: process.env.TWILIO_SERVICE_ID,
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD,
  emailPrivateKey: process.env.EMAIL_PRIVATE_KEY,
  payBaseUrl:
    process.env.NODE_ENV !== 'production'
      ? process.env.PAY_BASE_URL_DEV
      : process.env.PAY_BASE_URL_PROD,
  payPublicKey: process.env.PAY_PUBLIC_KEY,
  payPrivateKey: process.env.PAY_PRIVATE_KEY,
  payEventsPrivateKey: process.env.PAY_EVENTS_PRIVATE_KEY,
};

module.exports = { config };
