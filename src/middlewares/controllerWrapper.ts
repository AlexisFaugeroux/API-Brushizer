import { Request, Response, NextFunction } from 'express';

export default (controller: Function) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await controller(req, res, next);
        } catch (err: unknown) {
            next(err);
        }
    };
