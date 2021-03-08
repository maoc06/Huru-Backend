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
};

module.exports = { config };
