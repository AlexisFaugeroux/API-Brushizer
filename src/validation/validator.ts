import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

/**
 * Validation middleware factory
 * @param {string} dataSource - Middleware request property name that contains data to validate
 * @param {Joi.object} schema - Joi schema
 * @returns {object} Middleware function
 */
export default (dataSource: keyof Request, schema: Joi.ObjectSchema) =>
    async (req: Request, _: Response, next: NextFunction): Promise<void> => {
        try {
            await schema.validateAsync(req[dataSource]);
            next();
        } catch (err) {
            next(err);
        }
    };
