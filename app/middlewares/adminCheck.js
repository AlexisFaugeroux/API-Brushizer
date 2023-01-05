import Error401 from '../helpers/error401.js';
import Error403 from '../helpers/error403.js';

// Middleware to check if user has admin rights before accessing endpoint
export default (req, __, next) => {
    if (!req.user.role_id) throw new Error401('User role is not defined');

    if (req.user.role_id !== 3) throw new Error403('Acces denied - insufficient permission');

    next();
};
