"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _user = _interopRequireDefault(require("./routes/user"));

var _messages = _interopRequireDefault(require("./routes/messages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.use((0, _morgan.default)('dev')); // Parse incoming requests data

app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
})); // Routes which should handle requests

app.use('/api/v1/auth', _user.default);
app.use('/api/v1/messages', _messages.default);
app.use(function (req, res, next) {
  var error = new Error('Not found');
  error.status = 404;
  next(error);
}); // eslint-disable-next-line no-unused-vars

app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    status: 404,
    error: error.message
  });
});
var port = process.env.PORT || 3500;
app.listen(port, function () {
  console.log("Server running at port ".concat(port, "..."));
});
var _default = app;
exports.default = _default;