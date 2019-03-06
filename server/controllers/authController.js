import Joi from "joi";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from "../models/User";
import validate from "../helpers/validation";

//Mock user
const users = [
    {
        id: 1,
        firstname: "Herve",
        lastname: "Nkuri",
        email: "herveralive@gmail.com",
        password: bcrypt.hashSync("123456", 10),
    },
    {
        id: 1,
        email: 'brad@gmail.com',
        firstName: 'Brad',
        lastName: 'John',
        password: 'secret'
    }

]

exports.register = (req, res) => {
    const {
        firstname, lastname, email, password,
    } = req.body;

    const { error } = Joi.validate(
        req.body, validate.userSchema, ({ abortEarly: false })
    );

    if (error) {
        res.status(400).json({ error: error.details[0].message });
    } else {
        const id = users.length + 1;
        const user = new User(
            id, firstname, lastname, email, password,
        );
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;
        const token = jwt.sign({ user: users.push(user) }, "secret-key");
        res.status(201).json({
            status: 201, success: "user registered", data: [{ token, user }],
        });
    }
}


exports.login = (req, res) => {
 
    const {
        email, password,
    } = req.body;

    const { error } = Joi.validate({
        email, password,
    }, validate.loginSchema);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
    } else {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email) {
                const { firstname } = users[i];
                const { lastname } = users[i];
                // eslint-disable-next-line no-shadow
                const { email } = users[i];
                const truePass = bcrypt.compareSync(password, users[i].password);
                if (truePass) {
                    const token = jwt.sign({ user: users[i] }, "secret-key", { expiresIn: "1h" });
                    res.status(200).json({
                        status: 200,
                        success: "logged in",
                        data: [{
                            token, firstname, lastname, email,
                        }],
                    });
                } else {
                    res.status(400).json({ status: 400, error: "incorrect password" });
                }
            }
        }
        res.status(400).json({ status: 400, message: "invalid email" });
    }
}


// GETS A SINGLE USER FROM THE DATABASE
exports.getUser = (req, res) => {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
};





