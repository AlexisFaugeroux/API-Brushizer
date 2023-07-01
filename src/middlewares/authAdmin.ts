import { Request, Response, NextFunction } from 'express';
import { User } from '../types/user.ts';
import Error401 from '../helpers/error401.ts';
import Error403 from '../helpers/error403.ts';

export default (
    req: Request<any, Response, User>,
    __: Response,
    next: NextFunction,
): void => {
    if (!req.user?.role_id) throw new Error401('User role is not defined');

    if (req.user.role_id !== 3)
        throw new Error403('Acces denied - insufficient permission');

    next();
};
