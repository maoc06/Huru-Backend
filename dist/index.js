"use strict";

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _index = require("../config/index");

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initialization
const app = (0, _express.default)(); // middlewares

app.use((0, _morgan.default)('dev'));
app.use(_express.default.json()); // app.use(cors({ origin: config.cors, optionsSuccessStatus: 200 }));

app.use((0, _cors.default)()); // routes

app.use('/api', (0, _routes.default)());
app.listen(_index.config.port, () => {
  console.log(`Server running on http://localhost:${_index.config.port}`);
});