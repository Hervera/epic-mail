import Joi from 'joi';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from "../models/User";
import validate from "../helpers/validation";


// Mock user
const users = [
    {
        id: 1,
        firstName: "Herve",
        lastName: "Nkuri",
        email: "herveralive@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        confirmed: 1,
        isAdmin: 1,
        createdOn: "",
    },
    {
        id: 1,
        email: 'brad@gmail.com',
        firstName: 'Brad',
        lastName: 'John',
        password: 'secret',
        confirmed: 0,
        isAdmin: 0,
        createdOn: "",
    },
];

exports.register = (req, res) => {
    const { firstName, lastName, email, password, isAdmin} = req.body;

    const result = Joi.validate(req.body, validate.userSchema, { abortEarly: false });

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
        
        const id = users.length + 1;
        const confirmed = 0;
        const user = new User(
            id, firstName, lastName, email, password, confirmed, isAdmin, moment(new Date())
        );

        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;
        const token = jwt.sign({ user: users.push(user) }, "secret-key");
        res.status(201).send({
            status: res.statusCode,
            data: [{ token, user }],
        });
    }
};


exports.login = (req, res) => {
    const { email, password } = req.body;

    const { error } = Joi.validate(req.body, validate.loginSchema);

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
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email) {
                const { firstName } = users[i];
                const { lastName } = users[i];
                const { email } = users[i];
                const { confirmed } = users[i];
                const { isAdmin } = users[i];
                const { createdOn } = users[i];
                const truePass = bcrypt.compareSync(password, users[i].password);
                if (truePass) {
                    const token = jwt.sign({ user: users[i] }, "secret-key", { expiresIn: "1h" });
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
        res.status(400).send({ status: 400, error: "invalid email" });
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
