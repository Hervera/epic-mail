"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function Message(id, createdOn, subject, message, senderId, receiverId, parentMessageId, status) {
  _classCallCheck(this, Message);

  this.id = id;
  this.createdOn = createdOn;
  this.subject = subject;
  this.message = message;
  this.senderId = senderId;
  this.receiverId = receiverId;
  this.parentMessageId = parentMessageId;
  this.status = status;
};

var _default = Message;
exports.default = _default;