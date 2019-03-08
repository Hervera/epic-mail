import Joi from 'joi';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from "../models/User";
import mock from "../data/mock";
import validate from "../helpers/validation";

exports.register = (req, res) => {
    const { firstName, lastName, email, password, isAdmin} = req.body;

    const result = Joi.validate(req.body, validate.registerSchema, { abortEarly: false });

    if (result.error) {
        const errors = [];
        for (let index = 0; index < result.error.details.length; index++) {
            errors.push(result.error.details[index].message.split('"').join(''));
        }

        return res.status(400).send({
            status: res.statusCode,
            error: errors,
        });
    } else {
        const uniqueUser = mock.users.filter(user => user.email === email);
        if (uniqueUser.length === 1) {
            res.status(404).json({
                status: 404,
                error: "User with this email:" + JSON.stringify(email) + " is already registered",
            });
        }
        const id = mock.users.length + 1;
        const confirmed = 0;
        const user = new User(
            id, firstName, lastName, email, password, confirmed, isAdmin, moment().format('MMMM Do YYYY, h:mm:ss a')
        );

        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;
        const token = jwt.sign({ user: mock.users.push(user) }, "secret-key");
        res.status(201).send({
            status: res.statusCode,
            data: [{ token, user }],
        });
    }
};


exports.login = (req, res) => {
    const { email, password } = req.body;

    const { error } = Joi.validate(req.body, validate.loginSchema, { abortEarly: false });

    if (error) {
        const errors = [];
            for (let index = 0; index < error.details.length; index++) {
                errors.push(error.details[index].message.split('"').join(''));
            }

            return res.status(400).send({
                status: res.statusCode,
                error: errors,
            });

    } else {
        for (let i = 0; i < mock.users.length; i++) {
            if (mock.users[i].email === email) {
                const { firstName } = mock.users[i];
                const { lastName } = mock.users[i];
                const { email } = mock.users[i];
                const { confirmed } = mock.users[i];
                const { isAdmin } = mock.users[i];
                const { createdOn } = mock.users[i];
                const truePass = bcrypt.compareSync(password, mock.users[i].password);
                if (truePass) {
                    const token = jwt.sign({ user: mock.users[i] }, "secret-key", { expiresIn: "1h" });
                    res.status(200).send({
                        status: res.statusCode,
                        data: [{
                            token, firstName, lastName, email, confirmed, isAdmin, createdOn
                        }],
                    });
                } else {
                    res.status(400).send({ 
                        status: res.statusCode, 
                        error: "incorrect password" 
                    });
                }
            }
        }
        res.status(400).send({ status: 400, error: "User with that email is not found" });
    }
};

// Get user details
exports.getUser = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
};
