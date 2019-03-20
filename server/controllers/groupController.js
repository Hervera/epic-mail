import Joi from "joi";
import moment from "moment";
import uuidv4 from 'uuid/v4';
import db from '../data/create_tables';
import mock from "../data/mock";
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

        const text = `INSERT INTO
        groups(id, name, role, createdOn, updatedOn)
        VALUES($1, $2, $3, $4, $5)
        returning *`;

        const values = [
            uuidv4(),
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

    show(req, res) {
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
                error: error.details[0].group,
            });
        } else {
            const requestedGroup = mock.groups.find(c => c.id === groupId);
            for (let i = 0; i < mock.groups.length; i++) {
                if (mock.groups[i].id === groupId) {
                    return res.status(200).json({
                        status: res.statusCode,
                        successGroup: "Show specific group",
                        data: requestedGroup,
                    });
                }
            }
            return res.status(404).json({
                status: res.statusCode,
                error: "Group is not found",
            });
        }
    },

    update(req, res) {
        const groupId = parseInt(req.params.id, 10);
        const group = mock.groups.find(c => c.id === groupId);
        if (!group) {
            return res.status(404).send({
                status: (404),
                error: 'The group with the given ID was not found'
            });

        } else {
            // Update Group
            group.name = req.body.name;
            group.role = req.body.role;
            return res.send({
                status: (200),
                data: group
            });
        }
    },

    delete(req, res) {
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
                error: error.details[0].group,
            });
        } else {
            const requestedGroup = mock.groups.find(c => c.id === groupId);
            for (let i = 0; i < mock.groups.length; i++) {
                if (mock.groups[i].id === groupId) {
                    mock.groups.splice(i, groupId);
                    return res.status(200).json({
                        status: res.statusCode,
                        successGroup: "Group is deleted",
                        data: requestedGroup
                    });
                }
            }
            return res.status(404).json({
                status: res.statusCode,
                error: "Group is not found",
            });
        }
    },


};

export default groups;
