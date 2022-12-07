import Error401 from '../helpers/error401.js';
import jwtHelper from '../helpers/jwt.js';

export default {
    async login(req, res, next) {
        if (req.body.email !== 'xxxxxx' && req.body.password !== '') throw new Error401('Incorrect email or password');

        const token = jwtHelper.generateTokenForUser({ userData: req.body });

        return res.status(200).json({ token });
    },
};
