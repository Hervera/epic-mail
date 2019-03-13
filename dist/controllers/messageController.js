"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _moment = _interopRequireDefault(require("moment"));

var _Message = _interopRequireDefault(require("../models/Message"));

var _mock = _interopRequireDefault(require("../data/mock"));

var _validation = _interopRequireDefault(require("../helpers/validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messages = {
  sendMail: function sendMail(req, res) {
    var _req$body = req.body,
        subject = _req$body.subject,
        message = _req$body.message,
        senderId = _req$body.senderId,
        receiverId = _req$body.receiverId,
        parentMessageId = _req$body.parentMessageId,
        status = _req$body.status;

    var _Joi$validate = _joi.default.validate(req.body, _validation.default.messageSchema, {
      abortEarly: false
    }),
        error = _Joi$validate.error;

    if (error != null) {
      var errors = [];

      for (var index = 0; index < error.details.length; index++) {
        errors.push(error.details[index].message.split('"').join(''));
      }

      return res.status(400).send({
        status: res.statusCode,
        error: errors
      });
    } else {
      var trueSender = _mock.default.contacts.filter(function (sender) {
        return sender.id === senderId;
      });

      if (trueSender.length === 0) {
        return res.status(404).json({
          status: res.statusCode,
          error: "The senderId is not registered"
        });
      }

      var trueReceiver = _mock.default.contacts.filter(function (receiver) {
        return receiver.id === receiverId;
      });

      if (trueReceiver.length === 0) {
        return res.status(404).json({
          status: res.statusCode,
          error: "The receiverId is not registered"
        });
      }

      if (senderId === receiverId) {
        return res.status(400).json({
          status: res.statusCode,
          error: "The senderId and receiverId must not be the same"
        });
      }

      var id = _mock.default.messages.length + 1;
      var createdOn = (0, _moment.default)().format('MMMM Do YYYY, h:mm:ss a');
      var messagee = new _Message.default(id, createdOn, subject, message, senderId, receiverId, parentMessageId, status);

      _mock.default.messages.push(messagee);

      if (status === "sent") {
        return res.status(201).json({
          status: res.statusCode,
          successMessage: "Your message is sent",
          data: [messagee]
        });
      } else if (status === "draft") {
        return res.status(201).json({
          status: res.statusCode,
          successMessage: "Your message is drafted",
          data: [messagee]
        });
      } else {
        return res.status(201).json({
          status: res.statusCode,
          successMessage: "Your message is read",
          data: [messagee]
        });
      }
    }
  },
  receivedEmails: function receivedEmails(req, res) {
    if (_mock.default.messages.length === 0) {
      return res.status(404).json({
        status: res.statusCode,
        error: "No received emails found"
      });
    } else {
      return res.status(200).json({
        status: res.statusCode,
        successMessage: "Received emails",
        data: _mock.default.messages
      });
    }
  },
  sentEmails: function sentEmails(req, res) {
    var sentEmails = _mock.default.messages.filter(function (email) {
      return email.status === "sent";
    });

    if (sentEmails.length === 0) {
      return res.status(400).json({
        status: res.statusCode,
        successMessage: "No sent email found"
      });
    } else {
      return res.status(200).json({
        status: res.statusCode,
        successMessage: "Sent emails",
        data: [sentEmails]
      });
    }
  },
  receivedReadEmails: function receivedReadEmails(req, res) {
    var readEmails = _mock.default.messages.filter(function (email) {
      return email.status === "read";
    });

    if (readEmails.length === 0) {
      return res.status(400).json({
        status: res.statusCode,
        successMessage: "no received read email found"
      });
    } else {
      return res.status(200).json({
        status: res.statusCode,
        successMessage: "Received read emails",
        data: [readEmails]
      });
    }
  },
  receivedUnreadEmails: function receivedUnreadEmails(req, res) {
    var unreadEmails = _mock.default.messages.filter(function (email) {
      return email.status === "unread";
    });

    if (unreadEmails.length === 0) {
      return res.status(400).json({
        status: res.statusCode,
        successMessage: "No received unread email found"
      });
    } else {
      return res.status(200).json({
        status: res.statusCode,
        successMessage: "Received unread emails",
        data: [unreadEmails]
      });
    }
  },
  draftEmails: function draftEmails(req, res) {
    var draftEmails = _mock.default.messages.filter(function (email) {
      return email.status === "draft";
    });

    if (draftEmails.length === 0) {
      return res.status(400).json({
        status: res.statusCode,
        successMessage: "No draft email found"
      });
    } else {
      return res.status(200).json({
        status: res.statusCode,
        successMessage: "Draft emails",
        data: [draftEmails]
      });
    }
  },
  showSpecificEmail: function showSpecificEmail(req, res) {
    var emailId = parseInt(req.params.id, 10);

    var _Joi$validate2 = _joi.default.validate({
      emailId: emailId
    }, _validation.default.emailParams),
        error = _Joi$validate2.error;

    if (error) {
      return res.status(400).json({
        status: res.statusCode,
        error: error.details[0].message
      });
    } else {
      var emailMessage = _mock.default.messages.find(function (c) {
        return c.id === emailId;
      });

      for (var i = 0; i < _mock.default.messages.length; i++) {
        if (_mock.default.messages[i].id === emailId) {
          return res.status(200).json({
            status: res.statusCode,
            successMessage: "Specific Email received",
            data: emailMessage
          });
        }
      }

      return res.status(404).json({
        status: res.statusCode,
        error: "Email is not found"
      });
    }
  },
  deleteSpecificEmail: function deleteSpecificEmail(req, res) {
    var emailId = parseInt(req.params.id, 10);

    var _Joi$validate3 = _joi.default.validate({
      emailId: emailId
    }, _validation.default.emailParams),
        error = _Joi$validate3.error;

    if (error) {
      return res.status(400).json({
        status: res.statusCode,
        error: error.details[0].message
      });
    } else {
      var emailMessage = _mock.default.messages.find(function (c) {
        return c.id === emailId;
      });

      for (var i = 0; i < _mock.default.messages.length; i++) {
        if (_mock.default.messages[i].id === emailId) {
          _mock.default.messages.splice(i, emailId);

          return res.status(200).json({
            status: res.statusCode,
            successMessage: "Email is deleted",
            data: emailMessage
          });
        }
      }

      return res.status(404).json({
        status: res.statusCode,
        error: "Email is not found"
      });
    }
  }
};
var _default = messages;
exports.default = _default;