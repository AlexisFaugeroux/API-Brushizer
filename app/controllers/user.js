import debug from 'debug';
import bcrypt from 'bcrypt';
import Model from '../models/index.js';
import jwtHelper from '../helpers/jwt.js';
import Error400 from '../helpers/error400.js';
import Error401 from '../helpers/error401.js';
import Error404 from '../helpers/error404.js';

const debugSignup = debug('Signup');
const debugSignout = debug('Signout');

const debugLogout = debug('Logout');

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

        const user = await Model.user.findByPseudo(pseudo);

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
        req.body.role_id = 1;
        req.body.password = await bcrypt.hash(req.body.password, 10);

        debugSignup(req.body);

        const userCheck = await Model.user.isUnique(req.body);

        if (userCheck) {
            let field = '';
            if (req.body.email === userCheck.email) {
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
        const { id } = req.params;

        const isDeletionOK = await Model.user.delete(id);

        debugSignout(isDeletionOK);

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

        return res.status(200).json({ token, pseudo: user.pseudo });
    },

    /**
     * Controller for POST /users/login
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async logout(req, res) {
        debugLogout(req.user);

        req.user = null;

        return res.status(200);
    },
};
