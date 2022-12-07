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
            const userData = jwt.verify(token, process.env.JWT_SECRET ?? 'supersecretphrase');

            if (userData.ip !== ip) throw new Error401('Invalid token');

            return userData;
        } catch (err) {
            throw new Error401('Invalid token');
        }
    },
};
