import Joi from 'joi';

const registerSchema = Joi.object().keys({
    firstName: Joi.string().alphanum().min(3).max(20).required(),
    lastName: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(6).max(20).required(),
    isAdmin: Joi.boolean().allow(null),
});

const loginSchema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(6).max(20).required(),
});

const messageSchema = Joi.object().keys({
    subject: Joi.string().min(2).max(255)
        .required(),
    message: Joi.string().trim().min(3)
        .max(5000)
        .required(),
    senderId: Joi.number().integer()
        .required(),
    receiverId: Joi.number().integer()
        .required(),
    parentMessageId: Joi.number().integer()
        .required(),
    status: Joi.string().alphanum().valid("sent", "draft", "read")
        .required(),
});

const emailParams = Joi.object().keys({
    emailId: Joi.number().integer()
        .required(),
});

export default {
    registerSchema, loginSchema, messageSchema, emailParams
};
