"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emptyMessage = exports.unregisteredSender = exports.unregisteredReceiver = exports.falseReadMessage = exports.draftMessage = exports.readMessage = exports.sentMessage = void 0;
var sentMessage = {
  subject: "Testing sender subject",
  message: "Testing sender message",
  senderId: 1,
  receiverId: 2,
  parentMessageId: 4,
  status: "sent"
};
exports.sentMessage = sentMessage;
var readMessage = {
  subject: "Testing sender subject",
  message: "Testing sender message",
  senderId: 2,
  receiverId: 1,
  parentMessageId: 5,
  status: "read"
};
exports.readMessage = readMessage;
var draftMessage = {
  subject: "Testing sender subject",
  message: "Testing sender message",
  senderId: 3,
  receiverId: 1,
  parentMessageId: 6,
  status: "draft"
};
exports.draftMessage = draftMessage;
var falseReadMessage = {
  subject: "Testing sender subject",
  message: "Testing sender message",
  senderId: 1,
  receiverId: 1,
  parentMessageId: 4,
  status: "read"
};
exports.falseReadMessage = falseReadMessage;
var unregisteredReceiver = {
  subject: "Testing sender subject",
  message: "Testing sender message",
  senderId: 1,
  receiverId: 11,
  parentMessageId: 4,
  status: "draft"
};
exports.unregisteredReceiver = unregisteredReceiver;
var unregisteredSender = {
  subject: "Testing sender subject",
  message: "Testing sender message",
  senderId: 20,
  receiverId: 1,
  parentMessageId: 4,
  status: "draft"
};
exports.unregisteredSender = unregisteredSender;
var emptyMessage = {
  subject: "Testing sender subject",
  message: "",
  senderId: 1,
  receiverId: 3,
  parentMessageId: 4,
  status: "draft"
};
exports.emptyMessage = emptyMessage;