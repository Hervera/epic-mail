import Joi from "joi";
import moment from "moment";
import Group from "../models/Group";
import mock from "../data/mock";
import validate from "../helpers/validation";

const groups = {
   
    index(req, res) {
        if (mock.groups.length === 0) {
            return res.status(404).json({
                status: res.statusCode,
                error: "No group found",
            });
        } else {
            return res.status(200).json({
                status: res.statusCode,
                successGroup: "all groups created",
                data: mock.groups,
            });
        }
    },

    store(req, res) {
        const {
            name, role,
        } = req.body;
        const { error } = Joi.validate(req.body, validate.groupSchema, { abortEarly: false });

        if (error != null) {
            const errors = [];
            for (let index = 0; index < error.details.length; index++) {
                errors.push(error.details[index].group.split('"').join(''));
            }
            return res.status(400).send({
                status: res.statusCode,
                error: errors,
            });
        } else {
            const id = mock.groups.length + 1;
            const createdOn = moment().format('MMMM Do YYYY, h:mm:ss a');
            const updatedOn = moment().format('MMMM Do YYYY, h:mm:ss a');
            const group = new Group(
                id, name, role, createdOn, updatedOn
            );
            mock.groups.push(group);
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
