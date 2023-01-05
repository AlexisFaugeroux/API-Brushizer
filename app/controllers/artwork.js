import Model from '../models/index.js';
import Error400 from '../helpers/error400.js';
import Error404 from '../helpers/error404.js';
import Error401 from '../helpers/error401.js';

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
     * Controller for GET /artworks/user/:id
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async getAllFromUser(req, res) {
        const { id } = req.params;

        const user = await Model.user.findByPk(id);

        if (!user) throw new Error404('This user does not exist');

        const artworks = await Model.artwork.findAll({ $where: { user_id: id } });

        if (!artworks) throw new Error404('Artwork not found');

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
            throw new Error400(`A record already exists with this ${field}`);
        }

        const newArtwork = await Model.artwork.create(req.body);

        return res.json(newArtwork);
    },

    /**
     * Controller for PATCH /artworks/:id
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async update(req, res) {
        const id = parseInt(req.params.id, 10);

        const artwork = await Model.artwork.findByPk(id);

        if (!artwork) throw new Error404('This artwork does not exist');

        if (req.user.id !== artwork.user_id) throw new Error401('Cannot update artwork from another user');

        if (req.body.image) {
            const existingArtwork = await Model.artwork.isUnique(req.body, id);

            if (existingArtwork) {
                let field;
                if (existingArtwork.image === req.body.image) {
                    field = 'image';
                }
                throw new Error400(`Another artwork already exists with this ${field}`);
            }
        }

        req.body.id = id;
        const updatedArtwork = await Model.artwork.update(req.body);

        return res.json(updatedArtwork);
    },

    /**
     * Controller for DELETE /artworks/:id
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async delete(req, res) {
        const id = parseInt(req.params.id, 10);

        const artwork = await Model.artwork.findByPk(id);

        if (!artwork) throw new Error404('This artwork does not exist');

        if (req.user.id !== artwork.user_id) throw new Error401('Cannot delete an artwork from another artist');

        await Model.artwork_has_attribute.deleteOneArtworkFkeyRecords(id);

        const isDeletionOK = await Model.artwork.delete(id);

        return res.status(204).json(isDeletionOK);
    },
};
