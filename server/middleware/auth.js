import jwt from "jsonwebtoken";
import db from '../data/connection';

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
// Verify Token
const auth = {
    async verifyToken(req, res, next) {
        // Get auth header value
        const bearerHeader = req.headers.authorization;
        // Check if bearer is undefined 
        if (typeof bearerHeader !== 'undefined') {
            // Split at the space
            const bearer = bearerHeader.split(' ');
            // Get token from array
            const bearerToken = bearer[1];
            // Set the token
            req.token = bearerToken;
            // Next middleware
            try {
                const user = await jwt.verify(req.token, process.env.SECRET_KEY);
                const text = 'SELECT * FROM users WHERE id = $1';
                const { rows } = await db.query(text, [user.id]);
                if (!rows[0]) {
                    return res.status(400).send({
                        status: res.statusCode,
                        error: 'Token expired'
                    });
                }
                req.user = { id: user.id };
                next();
            } catch (error) {
                return res.status(400).send({
                    status: res.statusCode,
                    error: 'Invalid token'
                });
            }
        } else {
            // Forbidden
            res.status(403).send({
                status: res.statusCode,
                error: "'Unauthorized, No token provided"
            });
        }
    }
};

export default auth;
