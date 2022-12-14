import Model from '../models/index.js';
import Error400 from '../helpers/error400.js';
import Error404 from '../helpers/error404.js';

export default {
    /**
     * Controller for GET /artworks
     * @param {object} _ - Express middleware request (not used)
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */

    async getAll(_, res) {
        const artworks = await Model.artwork.findAll();

        return res.json(artworks);
    },

    /**
     * Controller for GET /artworks/:id
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async getOne(req, res) {
        const { id } = req.params;

        const artwork = await Model.artwork.findByPk(id);

        if (!artwork) throw new Error404('Artwork not found');

        return res.json(artwork);
    },

    /**
     * Controller for POST /artworks/
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async addOne(req, res) {
        req.body.user_id = req.user.id;

        const isNotUnique = await Model.artwork.isUnique(req.body);

        if (isNotUnique) {
            let field = '';
            if (req.body.image === isNotUnique.image) {
                field = 'image';
            }
            throw new Error400(`User already exists with this ${field}`);
        }

        const newArtwork = await Model.artwork.create(req.body);

        return res.json(newArtwork);
    },
};
