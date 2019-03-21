import Joi from 'joi';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../data/connection';
import validate from "../helpers/validation";
import Helper from '../helpers/auth';

const users = {

    async register(req, res) {
        const { firstName, lastName, email, password} = req.body;

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
            const confirmed = 0;
            const isAdmin = "false";
            const hashPassword = bcrypt.hashSync(password, 10);
            const text = `INSERT INTO users(firstName, lastName, email, password, confirmed, isAdmin, createdOn)
            VALUES($1, $2, $3, $4, $5, $6, $7) returning *`;

            const values = [
                firstName,
                lastName,
                email,
                hashPassword,
                confirmed,
                isAdmin,
                moment(new Date())
            ];

            try {
                const { rows } = await db.query(text, values);
                // create token
                const token = jwt.sign({ id: rows[0].id }, process.env.SECRET_KEY, {
                    expiresIn: 604800 // 1 WEEK
                });
              
                const user = rows;
                // return success response
                return res.status(201).send({
                    status: res.statusCode,
                    data: [{token, user}],
                });
            } catch (error) {
                if (error.routine === '_bt_check_unique') {
                    return res.status(400).send({ status: 400, error: 'User with that EMAIL already exist' });
                }
                return res.status(500).json({ status: 500, error: `error ${error}` });
            }
        }
    },


    async login(req, res) {
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

            const text = 'SELECT * FROM users WHERE email = $1;';
            try {
                const { rows } = await db.query(text, [email]);
                if (rows.length === 0) {
                    return res.status(404).send({
                        status: res.statusCode,
                        error: 'User with that email is not found',
                    });
                }

                if (!Helper.comparePassword(rows[0].password, password)) {
                    return res.status(400).send({ message: 'The credentials you provided is incorrect' });
                }

                const token = jwt.sign({ id: rows[0].id }, process.env.SECRET_KEY, { expiresIn: "1d" });
                // const userData = rows[0];

                const user = rows;
                // return success response
                return res.status(200).send({
                    status: res.statusCode,
                    data: [{ token, user }],
                });

            } catch (error) {
                return res.status(400).send({
                    status: res.statusCode,
                    error: `error ${error}`
                });
            }
        }
    }

};

export default users;
