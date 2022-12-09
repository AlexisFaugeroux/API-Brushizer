import bcrypt from 'bcrypt';
import debug from 'debug';
import Error400 from '../helpers/error400.js';
import Model from '../models/index.js';
// import Error400 from '../helpers/error400.js';

const debugSignup = debug('signup');

export default {
    /**
     * Controller for POST /signup
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

};
