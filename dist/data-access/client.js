"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _config = require("../../config");

// import twilio from 'twilio';
const client = new _sequelize.Sequelize(_config.config.dbUri, {
  timezone: '-5:00'
}); // client
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

var _default = {
  client
};
exports.default = _default;