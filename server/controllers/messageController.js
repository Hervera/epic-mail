import Joi from "joi";
import moment from "moment";
// import Message from "../models/Message";
import validate from "../helpers/validation";
import db from '../data/connection';

const messages = {
    async sendMail(req, res) {
        const {
            subject, message, receiverId, parentMessageId, status,
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
            // const retrieveSpecificUser = "SELECT * FROM users WHERE id = $1";
            
            const sendEmail = "INSERT INTO messages(subject, message, parentMessageid, senderId, receiverId, status, createdOn) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";

            const senderId = req.user.id;
            // const messagee = new Message(
            //     subject, message, parentMessageId, senderId, receiverId, status,
            // );
            const values = [
                subject,
                message,
                parentMessageId,
                senderId,
                receiverId,
                status,
                moment().format("LL")
            ];

            try {
                const { rows } = await db.query(sendEmail, values);
                res.status(201).json({
                    status: 201,
                    success: "email sent",
                    data: rows,
                });
            } catch (error) {
                res.status(500).json({
                    status: res.statusCode, 
                    error: `${error}`
                });
            }   
        }
    },

    async receivedEmails(req, res) {

        const findAllMessages = 'SELECT * FROM messages where receiverId = $1';
        try {

            const { rows, rowCount } = await db.query(findAllMessages, [req.user.id]);

            if (rows.length === 0) {
                return res.status(404).json({
                    status: res.statusCode,
                    error: "No received emails found",
                });
            } else {
                return res.status(200).json({
                    status: res.statusCode,
                    successMessage: "Received emails",
                    total: rowCount,
                    data: rows,
                });
            }
            
        } catch (error) {
            return res.status(400).json({
                status: res.statusCode,
                error: `${error}`
            });
        }

    },

    async sentEmails(req, res) {
        const findAllMessages = 'SELECT * FROM messages where receiverId = $1 AND status = $2';
        try {

            const { rows, rowCount } = await db.query(findAllMessages, [req.user.id, 'sent']);

            if (rows.length === 0) {
                return res.status(404).json({
                    status: res.statusCode,
                    error: "No sent emails found",
                });
            } else {
                return res.status(200).json({
                    status: res.statusCode,
                    successMessage: "Sent emails",
                    total: rowCount,
                    data: rows,
                });
            }

        } catch (error) {
            return res.status(400).json({
                status: res.statusCode,
                error: `${error}`
            });
        }
    },

    async receivedReadEmails(req, res) {
        const findAllMessages = 'SELECT * FROM messages where receiverId = $1 AND status = $2';
        try {

            const { rows, rowCount } = await db.query(findAllMessages, [req.user.id, 'read']);

            if (rows.length === 0) {
                return res.status(404).json({
                    status: res.statusCode,
                    error: "No read emails found",
                });
            } else {
                return res.status(200).json({
                    status: res.statusCode,
                    successMessage: "read emails",
                    total: rowCount,
                    data: rows,
                });
            }

        } catch (error) {
            return res.status(400).json({
                status: res.statusCode,
                error: `${error}`
            });
        }
    },

    async receivedUnreadEmails(req, res) {
        

        const findAllMessages = 'SELECT * FROM messages where receiverId = $1 AND status = $2';
        try {

            const { rows, rowCount } = await db.query(findAllMessages, [req.user.id, 'unread']);

            if (rows.length === 0) {
                return res.status(404).json({
                    status: res.statusCode,
                    error: "No unread emails found",
                });
            } else {
                return res.status(200).json({
                    status: res.statusCode,
                    successMessage: "Unread emails",
                    total: rowCount,
                    data: rows,
                });
            }

        } catch (error) {
            return res.status(400).json({
                status: res.statusCode,
                error: `${error}`
            });
        }
    },

    async draftEmails(req, res) {
        const findAllMessages = 'SELECT * FROM messages where receiverId = $1 AND status = $2';
        try {

            const { rows, rowCount } = await db.query(findAllMessages, [req.user.id, 'draft']);

            if (rows.length === 0) {
                return res.status(404).json({
                    status: res.statusCode,
                    error: "No draft emails found",
                });
            } else {
                return res.status(200).json({
                    status: res.statusCode,
                    successMessage: "Draft emails",
                    total: rowCount,
                    data: rows,
                });
            }

        } catch (error) {
            return res.status(400).json({
                status: res.statusCode,
                error: `${error}`
            });
        }
    },

    async showSpecificEmail(req, res) {
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

            const text = 'SELECT * FROM messages WHERE id = $1 AND receiverId = $2';
            try {
                const { rows } = await db.query(text, [req.params.id, req.user.id]);
                if (!rows[0]) {
                    return res.status(404).json({
                        status: res.statusCode,
                        error: "Email is not found",
                    });
                }
                return res.status(200).json({
                    status: res.statusCode,
                    successMessage: "Specific Email received",
                    data: rows[0],
                });
            } catch (error) {
                return res.status(400).send(error);
            }
        }
    },

    async deleteSpecificEmail(req, res) {
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
            const deleteQuery = 'DELETE FROM messages WHERE id=$1 AND receiverId = $2 returning *';
            try {
                const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
                if (!rows[0]) {
                    return res.status(404).json({
                        status: res.statusCode,
                        error: "Email is not found",
                    });
                }
                return res.status(200).json({
                    status: res.statusCode,
                    successMessage: "Email is deleted",
                    data: rows[0],
                });
            } catch (error) {
                return res.status(400).send(error);
            }
        }
    },


};

export default messages;
