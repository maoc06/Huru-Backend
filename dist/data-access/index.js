"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cityDb = exports.carBasicSettingsDb = exports.makerDb = exports.carDb = exports.userDb = exports.authDb = exports.verificationApi = void 0;

var _sequelize = require("sequelize");

var _twilio = _interopRequireDefault(require("twilio"));

var _config = require("../../config");

var _verificationApi = _interopRequireDefault(require("./verification-api"));

var _authDb = _interopRequireDefault(require("./auth-db"));

var _userDb = _interopRequireDefault(require("./user-db"));

var _carDb = _interopRequireDefault(require("./car-db"));

var _makerDb = _interopRequireDefault(require("./maker-db"));

var _carBasicSettingsDb = _interopRequireDefault(require("./car-basic-settings-db"));

var _cityDb = _interopRequireDefault(require("./city-db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const client = new _sequelize.Sequelize(_config.config.dbUri);
client.authenticate().then(() => {
  console.log('Connection to the database has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
const twilioClient = (0, _twilio.default)(_config.config.twilioAccountSID, _config.config.twilioToken);
const verificationApi = (0, _verificationApi.default)(twilioClient);
exports.verificationApi = verificationApi;
const authDb = (0, _authDb.default)({
  client
});
exports.authDb = authDb;
const userDb = (0, _userDb.default)({
  client
});
exports.userDb = userDb;
const carDb = (0, _carDb.default)({
  client
});
exports.carDb = carDb;
const makerDb = (0, _makerDb.default)({
  client
});
exports.makerDb = makerDb;
const carBasicSettingsDb = (0, _carBasicSettingsDb.default)({
  client
});
exports.carBasicSettingsDb = carBasicSettingsDb;
const cityDb = (0, _cityDb.default)({
  client
});
exports.cityDb = cityDb;