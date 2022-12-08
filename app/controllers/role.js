import Model from '../models/index.js';
import Error404 from '../helpers/error404.js';

export default {
    /**
     * Controller for GET /roles
     * @param {object} _ - Express middleware request (not used)
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */

    async getAll(_, res) {
        const roles = await Model.role.findAll();

        return res.json(roles);
    },

    /**
     * Controller for GET /roles/:id
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async getOne(req, res) {
        const { id } = req.params;

        const role = await Model.role.findByPk(id);

        if (!role) throw new Error404('Role not found');

        return res.json(role);
    },
};
