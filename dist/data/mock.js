"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var users = [{
  id: 1,
  email: "herveralive@gmail.com",
  firstName: "Herve",
  lastName: "Nkuri",
  password: _bcryptjs.default.hashSync("secret", 10),
  confirmed: 1,
  isAdmin: 1,
  createdOn: "March 3th 2019, 10:00:00 am"
}, {
  id: 2,
  email: 'brad@gmail.com',
  firstName: 'Brad',
  lastName: 'John',
  password: _bcryptjs.default.hashSync("secret", 10),
  confirmed: 0,
  isAdmin: 0,
  createdOn: "March 4th 2019, 03:00:00 pm"
}, {
  id: 3,
  email: 'johnLee@gmail.com',
  firstName: 'John',
  lastName: 'Lee',
  password: _bcryptjs.default.hashSync("secret", 10),
  confirmed: 0,
  isAdmin: 0,
  createdOn: "March 5th 2019, 07:00:00 am"
}];
var contacts = [{
  id: 1,
  email: "johnLee@gmail.com",
  firstName: "John",
  lastName: "Lee"
}, {
  id: 2,
  email: "brad@gmail.com",
  firstName: 'Brad',
  lastName: 'John'
}, {
  id: 3,
  email: "davidkagabo@gmail.com",
  firstName: "David",
  lastName: "Kagabo"
}];
var messages = [{
  id: 1,
  createdOn: "March 3th 2019, 04:00:00 am",
  subject: "Good morning",
  message: "How are you?",
  senderId: 2,
  receiverId: 1,
  parentMessageId: 1,
  status: "sent"
}, {
  id: 2,
  createdOn: "March 5th 2019, 03:00:00 am",
  subject: "Hello",
  message: "I am fine",
  senderId: 1,
  receiverId: 2,
  parentMessageId: 2,
  status: "read"
}, {
  id: 2,
  createdOn: "February 7th 2019, 03:00:00 am",
  subject: "Hi",
  message: "How are you doing?",
  senderId: 2,
  receiverId: 1,
  parentMessageId: 2,
  status: "unread"
}, {
  id: 3,
  createdOn: "March 6th 2019, 09:00:00 am",
  subject: "Hi brother",
  message: "Where are you now?",
  senderId: 2,
  receiverId: 1,
  parentMessageId: 2,
  status: "draft"
}];
var _default = {
  users: users,
  messages: messages,
  contacts: contacts
};
exports.default = _default;