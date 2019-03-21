import Joi from "joi";
import moment from "moment";
import db from '../data/connection';
import validate from "../helpers/validation";

const groups = {
   
    async store(req, res) {
        const { name, role} = req.body;

        const { error } = Joi.validate(req.body, validate.groupSchema, { abortEarly: false });

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

            const group = `INSERT INTO groups(name, role, owner, createdOn, updatedOn) VALUES($1, $2, $3, $4, $5) returning *`;

            const authUserId = req.user.id;
            const values = [
                name,
                role,
                authUserId,
                moment(new Date()),
                moment(new Date())
            ];

            try {
                const { rows } = await db.query(group, values);
                res.status(201).json({
                    status: 201,
                    data: rows,
                });
            } catch (error) {
                res.status(400).json({
                    status: res.statusCode,
                    error: `${error}`
                });
            }
        }
    },

    async index(req, res) {
        const findAllQuery = 'SELECT * FROM groups where owner = $1';
        try {
            const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
            // return res.status(200).send({ rows, rowCount });
            return res.status(200).json({
                status: res.statusCode,
                total: rowCount,
                data: rows,
            });
        } catch (error) {
            res.status(400).json({
                status: res.statusCode,
                error: `${error}`
            });
        }
    },


    async show(req, res) {
        const groupId = parseInt(req.params.id, 10);
        const { error } = Joi.validate(
            {
                groupId,
            },
            validate.groupParams,
        );

        if (error) {
            return res.status(400).json({
                status: res.statusCode,
                error: error.details[0].message,
            });
        } else {
            const text = 'SELECT * FROM groups WHERE id = $1 AND owner = $2';

            try {
                const { rows } = await db.query(text, [req.params.id, req.user.id]);
                if (!rows[0]) {
                    return res.status(404).send({ 
                        status: res.statusCode,
                        error: "Group is not found",
                     });
                }
                return res.status(200).json({
                    status: res.statusCode,
                    successGroup: "Show specific group",
                    data: { rows }
                });
            } catch (error) {
                res.status(400).json({
                    status: res.statusCode,
                    error: `${error}`
                });
            }
        }
    },

    async update(req, res) {
        const groupId = parseInt(req.params.id, 10);
        const { error } = Joi.validate(
            {
                groupId,
            },
            validate.groupParams,
        );
        if (error) {
            return res.status(400).json({
                status: res.statusCode,
                error: error.details[0].message,
            });
        } else {
            // Update Group
            const findOneQuery = 'SELECT * FROM groups WHERE id=$1 AND owner = $2';
            const updateOneQuery = `UPDATE groups SET name=$1, role=$2, updatedon=$3 WHERE id=$4 returning *`;
            try {
                const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
                if (!rows[0]) {
                    return res.status(404).send({ 
                        status: res.statusCode,
                        error: "Group is not found",
                    });
                }
                const values = [
                    req.body.name || rows[0].name,
                    req.body.role || rows[0].role,
                    moment(new Date()),
                    req.params.id
                ];
                const response = await db.query(updateOneQuery, values);
                return res.send({
                    status: (200),
                    data: response.rows[0]
                });
            } catch (err) {
                res.status(400).json({
                    status: res.statusCode,
                    error: `${error}`
                });
            }
        }
    },

    async delete(req, res) {
        const groupId = parseInt(req.params.id, 10);
        const { error } = Joi.validate(
            {
                groupId,
            },
            validate.groupParams,
        );
        if (error) {
            return res.status(400).json({
                status: res.statusCode,
                error: error.details[0].message,
            });
        } else {
            const deleteQuery = 'DELETE FROM groups WHERE id=$1 AND owner = $2 returning *';
            try {
                const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
                if (!rows[0]) {
                    return res.status(404).json({
                        status: res.statusCode,
                        error: "Group is not found",
                    });
                }
                return res.status(200).json({
                    status: res.statusCode,
                    successGroup: "Group is deleted",
                    data: { rows }
                });
            } catch (error) {
                res.status(400).json({
                    status: res.statusCode,
                    error: `${error}`
                });
            }   
        }
    },
};

export default groups;
