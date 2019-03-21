// import Joi from "joi";
import moment from "moment";
import db from '../data/connection';
// import validate from "../helpers/validation";

const groups = {

    async addMember(req, res) {
   
        const { memberId, userRole} = req.body;

        const groupQuery = `INSERT INTO group_members(groupId, memberId, userRole, createdOn) VALUES($1, $2, $3, $4) returning *`;

        const values = [
            req.params.id,
            memberId,
            userRole,
            moment(new Date())
        ];

        try {
            const { rows } = await db.query(groupQuery, values);

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
    },

    async getMembers(req, res) {
        const findAllQuery = 'SELECT * FROM group_members where groupId = $1 AND memberId = $2';
        try {
            const { rows, rowCount } = await db.query(findAllQuery, [req.params.id, req.user.id]);
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

    async deleteMember(req, res) {
      
        const deleteQuery = 'DELETE FROM group_members WHERE groupId = $1 AND memberId = $2 returning *';

        try {
            const { rows } = await db.query(deleteQuery, [req.params.groupId, req.params.memberId]);
            if (!rows[0]) {
                return res.status(404).json({
                    status: res.statusCode,
                    error: "Group member is not found",
                });
            }
            return res.status(204).json({
                status: res.statusCode,
                successGroup: "Group member is deleted",
                data: { rows }
            });
        } catch (error) {
            return res.status(400).send(error);
        }
    },
};

export default groups;
