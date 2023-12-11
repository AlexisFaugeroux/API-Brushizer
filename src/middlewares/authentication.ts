import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../helpers/jwt.ts';
import ApiError from '../helpers/apiError.ts';
import Error401 from '../helpers/error401.ts';

export default (req: Request, _: Response, next: NextFunction): void => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            throw new Error401('Invalid Token');
        }
        if (token.toLowerCase().startsWith('bearer')) {
            token = token.slice('bearer'.length).trim();
        }

        const userData = validateToken(token, req.ip);
        req.user = { ...req.user, ...userData };

        next();
    } catch (error: unknown) {
        throw new Error401('Invalid token');
    }
};
