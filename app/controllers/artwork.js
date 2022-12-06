import Model from '../models/index.js';

export default {
    /**
     * Controller for GET /artworks
     * @param {object} _ - Express middleware request (not used)
     * @param {object} res - Express middleware response
     * @returns {object} Route API JSON response
     */

    async getAll(_, res) {
        const artworks = await Model.artwork.findAll();

        return res.json(artworks);
    },

    /**
     * Controller for GET /artworks/:id
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns {object} Route API JSON response
     */
    async getOne(req, res) {
        const { id } = req.params;

        const artwork = await Model.artwork.findByPk(id);

        return res.json(artwork);
    },
};
