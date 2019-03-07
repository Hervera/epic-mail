import Joi from 'joi';

const userSchema = Joi.object().keys({
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

export default {
    userSchema, loginSchema,
};
