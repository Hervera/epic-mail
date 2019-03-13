"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var registerSchema = _joi.default.object().keys({
  firstName: _joi.default.string().alphanum().min(3).max(20).required(),
  lastName: _joi.default.string().alphanum().min(3).max(20).required(),
  email: _joi.default.string().email({
    minDomainAtoms: 2
  }).required(),
  password: _joi.default.string().min(6).max(20).required(),
  isAdmin: _joi.default.boolean().allow(null)
});

var loginSchema = _joi.default.object().keys({
  email: _joi.default.string().email({
    minDomainAtoms: 2
  }).required(),
  password: _joi.default.string().min(6).max(20).required()
});

var messageSchema = _joi.default.object().keys({
  subject: _joi.default.string().min(2).max(255).required(),
  message: _joi.default.string().trim().min(3).max(5000).required(),
  senderId: _joi.default.number().integer().required(),
  receiverId: _joi.default.number().integer().required(),
  parentMessageId: _joi.default.number().integer().required(),
  status: _joi.default.string().alphanum().valid("sent", "draft", "read").required()
});

var emailParams = _joi.default.object().keys({
  emailId: _joi.default.number().integer().required()
});

var _default = {
  registerSchema: registerSchema,
  loginSchema: loginSchema,
  messageSchema: messageSchema,
  emailParams: emailParams
};
exports.default = _default;