"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disableDayDb = exports.favoriteDb = exports.carReviewDb = exports.paymentGateway = exports.paymentUserDb = exports.transactionDb = exports.bookingDb = exports.cityDb = exports.carBasicSettingsDb = exports.makerDb = exports.carDb = exports.userDb = exports.authDb = exports.verificationApi = exports.authGoogleClient = exports.client = void 0;

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

var _bookingDb = _interopRequireDefault(require("./booking-db"));

var _transactionDb = _interopRequireDefault(require("./transaction-db"));

var _paymentUser = _interopRequireDefault(require("./payment-user"));

var _paymentGateway = _interopRequireDefault(require("./payment-gateway"));

var _carReviewDb = _interopRequireDefault(require("./car-review-db"));

var _favoriteDb = _interopRequireDefault(require("./favorite-db"));

var _disableDayDb = _interopRequireDefault(require("./disable-day-db"));

var _authGoogleClient = _interopRequireDefault(require("./auth-google-client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authGoogleClient = _authGoogleClient.default.oAuth2Client;
exports.authGoogleClient = authGoogleClient;
const client = new _sequelize.Sequelize(_config.config.dbUri);
exports.client = client;
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
const userDb = (0, _userDb.default)();
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
const bookingDb = (0, _bookingDb.default)({
  client
});
exports.bookingDb = bookingDb;
const transactionDb = (0, _transactionDb.default)({
  client
});
exports.transactionDb = transactionDb;
const paymentUserDb = (0, _paymentUser.default)({
  client
});
exports.paymentUserDb = paymentUserDb;
const paymentGateway = (0, _paymentGateway.default)({
  client
});
exports.paymentGateway = paymentGateway;
const carReviewDb = (0, _carReviewDb.default)();
exports.carReviewDb = carReviewDb;
const favoriteDb = (0, _favoriteDb.default)();
exports.favoriteDb = favoriteDb;
const disableDayDb = (0, _disableDayDb.default)();
exports.disableDayDb = disableDayDb;