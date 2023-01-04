import bcrypt from 'bcrypt';
import Model from '../models/index.js';
import jwtHelper from '../helpers/jwt.js';
import Error400 from '../helpers/error400.js';
import Error401 from '../helpers/error401.js';
import Error404 from '../helpers/error404.js';

export default {
    /**
     * Controller for GET /users
     * @param {object} _ - Express middleware request (not used)
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */

    async getAll(_, res) {
        const users = await Model.user.findAll();
        return res.json(users);
    },

    /**
     * Controller for GET /users/:id
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async getOneByPk(req, res) {
        const { id } = req.params;

        const user = await Model.user.findByPk(id);

        if (!user) throw new Error404('User not found');

        return res.json(user);
    },

    /**
     * Controller for GET /users/:pseudo
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async getOneByPseudo(req, res) {
        const { pseudo } = req.params;

        const result = await Model.user.findByPseudo(pseudo);

        const { password, ...user } = result;

        if (!user) throw new Error404('User not found');

        return res.json(user);
    },

    /**
     * Controller for POST /users/signup
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async signup(req, res) {
        if (!req.body.role_id) {
            req.body.role_id = 1;
        }

        req.body.password = await bcrypt.hash(req.body.password, 10);

        const isNotUnique = await Model.user.isUnique(req.body);

        if (isNotUnique) {
            let field = '';
            if (req.body.email === isNotUnique.email) {
                field = 'email';
            } else {
                field = 'pseudo';
            }
            throw new Error400(`User already exists with this ${field}`);
        }

        const newUser = await Model.user.create(req.body);

        delete req.body.password;

        return res.json(newUser);
    },

    /**
     * Controller for DELETE /users/signup/:id
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async signout(req, res) {
        const id = parseInt(req.params.id, 10);

        if (req.user.id !== id) throw new Error401('Cannot signout another user');

        // Next block of code ensure all foreign keys related to an artist in database are deleted
        if (req.user.role_id >= 2) {
            // Get all artworks from the artist
            const userArtworks = await Model.artwork.findAll({
                $where: { user_id: req.user.id },
            });

            if (userArtworks.length > 0) {
                // Build an array containing all the artworks ids
                const userArtworksIds = [];

                Object.values(userArtworks).forEach((artwork) => {
                    userArtworksIds.push(artwork.id);
                });

                // Delete foreign keys related to the artworks from the artwork_has_attribute table
                await Model.artwork_has_attribute.deleteArtworksFkeysRecords(userArtworksIds);
                // Delete all the artist artworks in artwork table
                await Model.artwork.deleteUserFkeyRecords(id);
                // Delete collections data related to the artist in collection table
                await Model.collection.deleteUserFkeyRecords(id);
            }
        // Ready for artist account deletion
        }

        const isDeletionOK = await Model.user.delete(id);

        if (!isDeletionOK) throw new Error404('This user does not exist');

        return res.status(204).json(isDeletionOK);
    },

    /**
     * Controller for POST /users/login
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async login(req, res) {
        const { pseudo, password } = req.body;

        const user = await Model.user.findByPseudo(pseudo.toLowerCase());

        if (!user) throw new Error401('Incorrect pseudo or password');

        const isPasswordOK = await bcrypt.compare(password, user.password);

        if (!isPasswordOK) throw new Error401('Incorrect pseudo or password');

        const token = jwtHelper.generateTokenForUser({ ...user, ip: req.ip });

        return res.status(200).json({ token, pseudo: user.pseudo, id: user.id });
    },

    /**
     * Controller for POST /users/logout
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async logout(req, res) {
        req.user = null;

        return res.status(200);
    },

    /**
     * Controller for PATCH /users/:id
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async update(req, res) {
        const id = parseInt(req.params.id, 10);

        const user = await Model.user.findByPk(id);

        if (req.user.id !== id) throw new Error401('Cannot update data from another user');

        if (!user) throw new Error404('This user does not exist');

        req.body.id = id;

        const updatedUser = await Model.user.update(req.body);

        return res.json(updatedUser);
    },
};
