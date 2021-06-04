"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = require("../config/index");

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import fs from 'fs';
// import https from 'https';
// const privateKey = fs.readFileSync(
//   'C:/Users/migue/Documents/certs/privateKey.key'
// );
// const certificate = fs.readFileSync(
//   'C:/Users/migue/Documents/certs/certificate.crt'
// );
// initialization
// const credentials = { key: privateKey, cert: certificate };
const app = (0, _express.default)(); // middlewares

app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use((0, _cors.default)()); // routes

app.use('/api', (0, _routes.default)()); // https.createServer(credentials, app).listen(config.port, () => {
//   console.log(`Server running on https://localhost:${config.port}`);
// });

app.listen(_index.config.port, () => {
  console.log(`Server running on http://localhost:${_index.config.port}`);
});