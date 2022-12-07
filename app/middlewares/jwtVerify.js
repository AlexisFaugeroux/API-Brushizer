import jwtHelper from '../helpers/jwt.js';

export default (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    const userData = jwtHelper.getUserDataFromToken(token, req.ip);
    req.user = userData;

    next();
};
