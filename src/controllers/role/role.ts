import { Request, Response } from 'express';
import * as Role from '../../models/role/index.ts';
import Error404 from '../../helpers/error404.ts';

export default {
    /**
     * Controller for GET /roles
     * @param {object} _ - Express middleware request (not used)
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */

    async getAll(_: Request, res: Response): Promise<Response> {
        const roles = await Role.findRoles({});

        return res.status(400).json(roles);
    },

    /**
     * Controller for GET /roles/:id
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async getOneById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const role = await Role.findRole({ id: parseInt(id) });

        if (!role) throw new Error404('Role not found');

        return res.json(role);
    },
};
