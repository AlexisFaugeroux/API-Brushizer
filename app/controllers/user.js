import Model from '../models/index.js';
import Error404 from '../helpers/error404.js';

export default {
    /**
     * Controller for GET /users
     * @param {object} _ - Express middleware request (not used)
     * @param {object} res - Express middleware response
     * @returns {object} Route API JSON response
     */

    async getAll(_, res) {
        const users = await Model.user.findAll();

        return res.json(users);
    },

    /**
     * Controller for GET /users/:id
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns {object} Route API JSON response
     */
    async getOne(req, res) {
        const { id } = req.params;

        const user = await Model.user.findByPk(id);

        if (!user) throw new Error404('User not found');

        return res.json(user);
    },
};
