import Error401 from '../helpers/error401.js';
import jwtHelper from '../helpers/jwt.js';

export default (req, res, next) => {
    if (!req.headers.authorization) throw new Error401('No authorization token provided');

    const token = req.headers.authorization.split(' ')[1];

    const userData = jwtHelper.getUserDataFromToken(token, req.ip);
    req.user = userData;

    next();
};
