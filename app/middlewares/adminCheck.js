import Error401 from '../helpers/error401';
import Error403 from '../helpers/error403';

// Middleware to check if user has admin rights
export default (user) => (_, __, next) => {
    if (!user.role_id) throw new Error401('User role is not defined');

    if (user.role_id !== 3) throw new Error403('Acces denied - insufficient persmission');

    next();
};
