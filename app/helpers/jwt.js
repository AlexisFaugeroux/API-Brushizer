import jwt from 'jsonwebtoken';
import Error401 from './error401.js';

export default {
    generateTokenForUser(userData) {
        return jwt.sign(
            {
                ...userData,
            },
            process.env.JWT_SECRET ?? 'supersecretphrase',
            {
                expiresIn: '6h',
            },
        );
    },

    getUserDataFromToken(token, ip) {
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET ?? 'supersecretphrase');

            if (payload.ip !== ip) throw new Error401('Invalid token');

            const { password, ...userData } = payload;

            return userData;
        } catch (err) {
            throw new Error401('Invalid token');
        }
    },
};
