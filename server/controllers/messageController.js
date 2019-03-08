import Joi from "joi";
import moment from "moment";
import Message from "../models/Message";
import mock from "../data/mock";
import validate from "../helpers/validation";


const messages = {
    sendMail(req, res) {
        const {
            subject, message, senderId, receiverId, parentMessageId, status,
        } = req.body;
        const { error } = Joi.validate(req.body, validate.messageSchema, { abortEarly: false });

        if (error != null) {
            const errors = [];
            for (let index = 0; index < error.details.length; index++) {
                errors.push(error.details[index].message.split('"').join(''));
            }
            return res.status(400).send({
                status: res.statusCode,
                error: errors,
            });
        } else {
            const trueSender = mock.contacts.filter(sender => sender.id === senderId);
            if (trueSender.length === 0) {
                res.status(404).json({
                    status: 404,
                    error: "The senderId is not registered",
                });
            }
            const trueReceiver = mock.contacts.filter(receiver => receiver.id === receiverId);
            if (trueReceiver.length === 0) {
                res.status(404).json({
                    status: 404,
                    error: "The receiverId is not registered",
                });
            }
            if (senderId === receiverId) {
                res.status(400).json({
                    status: 400,
                    error: "The senderId and receiverId must not be the same",
                });
            }
            const id = mock.messages.length + 1;
            const createdOn = moment().format('MMMM Do YYYY, h:mm:ss a');
            const messagee = new Message(
                id, createdOn, subject, message, senderId, receiverId, parentMessageId, status,
            );
            mock.messages.push(messagee);
            if (status === "sent") {
                res.status(201).json({
                    status: 201, successMessage: "Your message is sent", data: [messagee],
                });
            } else if (status === "draft") {
                res.status(201).json({
                    status: 201, successMessage: "Your message is drafted", data: [messagee],
                });
            } else {
                res.status(201).json({
                    status: 201, successMessage: "Your message is read", data: [messagee],
                });
            }
        }
    },

    receivedEmails(req, res) {
        if (mock.messages.length === 0) {
            res.status(404).json({
                status: 404,
                error: "No received emails found",
            });
        } else {
            res.status(200).json({
                status: 200,
                successMessage: "Received emails",
                data: mock.messages,
            });
        }
    },

    sentEmails(req, res) {
        const sentEmails = mock.messages.filter(email => email.status === "sent");
        if (sentEmails.length === 0) {
            res.status(400).json({
                status: 400,
                successMessage: "No sent email found",
            });
        } else {
            res.status(200).json({
                status: 200,
                successMessage: "Sent emails",
                data: [sentEmails],
            });
        }
    },

    receivedReadEmails(req, res) {
        const readEmails = mock.messages.filter(email => email.status === "read");
        if (readEmails.length === 0) {
            res.status(400).json({
                status: 400,
                successMessage: "no received read email found",
            });
        } else {
            res.status(200).json({
                status: 200,
                successMessage: "Received read emails",
                data: [readEmails],
            });
        }
    },

    receivedUnreadEmails(req, res) {
        const unreadEmails = mock.messages.filter(email => email.status === "unread");
        if (unreadEmails.length === 0) {
            res.status(400).json({
                status: 400,
                successMessage: "No received unread email found",
            });
        } else {
            res.status(200).json({
                status: 200,
                successMessage: "Received unread emails",
                data: [unreadEmails],
            });
        }
    },

    showSpecificEmail(req, res) {
        const emailId = parseInt(req.params.id, 10);
        const { error } = Joi.validate(
            {
                emailId,
            },
            validate.emailParams,
        );

        if (error) {
            return res.status(400).json({
                status: res.statusCode,
                error: error.details[0].message,
            });
        } else {
            // eslint-disable-next-line array-callback-return
            mock.messages.map((email) => {
                if (email.id === emailId) {
                    res.status(200).json({
                        status: 200,
                        successMessage: "Email received",
                        data: email,
                    });
                }
            });
            res.status(404).json({
                status: 404,
                error: "Email is not found",
            });
        }
    },

    deleteSpecificEmail(req, res) {
        const emailId = parseInt(req.params.id, 10);
        const { error } = Joi.validate(
            {
                emailId,
            },
            validate.emailParams,
        );
        if (error) {
            return res.status(400).json({
                status: res.statusCode,
                error: error.details[0].message,
            });
        } else {
            const emailMessage = mock.messages.find(c => c.id === emailId);
            for (let i = 0; i < mock.messages.length; i++) {
                if (mock.messages[i].id === emailId) {
                    mock.messages.splice(i, emailId);
                    res.status(200).json({
                        status: 200,
                        successMessage: "email deleted",
                        data: emailMessage
                    });
                }
            }
            res.status(404).json({
                status: 404,
                error: "email not found",
            });
        }
    },


};

export default messages;
