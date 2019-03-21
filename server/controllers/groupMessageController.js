import Joi from "joi";
import moment from "moment";
// import Message from "../models/Message";
import validate from "../helpers/validation";
import db from '../data/connection';

const groupMessages = {
    async sendMailToGroup(req, res) {
        const {
            subject, message, parentMessageId, status
        } = req.body;

        const { error } = Joi.validate(req.body, validate.groupMessageSchema, { 
            abortEarly: false 
        });

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
            // const retrieveSpecificUser = "SELECT * FROM groups WHERE id = $1";

            const sendEmail = "INSERT INTO group_messages(subject, message, parentMessageid, senderId, groupId, status, createdOn) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";

            const senderId = req.user.id;
 
            const values = [
                subject,
                message,
                parentMessageId,
                senderId,
                req.params.groupId,
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
    }
};

export default groupMessages;
