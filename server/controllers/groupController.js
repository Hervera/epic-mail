import Joi from "joi";
import moment from "moment";
import db from '../data/connection';
import validate from "../helpers/validation";

const groups = {
   
    async index(req, res) {
        const findAllQuery = 'SELECT * FROM groups';
        try {
            const { rows, rowCount } = await db.query(findAllQuery);
            return res.status(200).send({ rows, rowCount });
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async store(req, res) {

        const text = `INSERT INTO groups(name, role, createdOn, updatedOn) VALUES($1, $2, $3, $4) returning *`;

        const values = [
            req.body.name,
            req.body.role,
            moment(new Date()),
            moment(new Date())
        ];

        try {
            const { rows } = await db.query(text, values);
            return res.status(201).send(rows[0]);
        } catch (error) {
            return res.status(400).send(error);
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
            const text = 'SELECT * FROM groups WHERE id = $1';

            try {
                const { rows } = await db.query(text, [req.params.id]);
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
                return res.status(400).send(error);
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
            const findOneQuery = 'SELECT * FROM groups WHERE id=$1';
            const updateOneQuery = `UPDATE groups SET name=$1, role=$2, updatedon=$3 WHERE id=$4 returning *`;
            try {
                const { rows } = await db.query(findOneQuery, [req.params.id]);
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
                return res.status(400).send( 
                    // eslint-disable-next-line no-undef
                    `error ${err}`
                );
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
            const deleteQuery = 'DELETE FROM groups WHERE id=$1 returning *';
            try {
                const { rows } = await db.query(deleteQuery, [req.params.id]);
                if (!rows[0]) {
                    return res.status(404).json({
                        status: res.statusCode,
                        error: "Group is not found",
                    });
                }
                return res.status(204).json({
                    status: res.statusCode,
                    successGroup: "Group is deleted",
                    data: { rows }
                });
            } catch (error) {
                return res.status(400).send(error);
            }   
        }
    },
};

export default groups;
