import bcrypt from 'bcrypt';
import Model from '../models/index.js';
import jwtHelper from '../helpers/jwt.js';
import Error401 from '../helpers/error401.js';
// import Error400 from '../helpers/error400.js';

export default {
    /**
     * Controller for POST /login
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async login(req, res) {
        const { pseudo, password } = req.body;

        // if (!pseudo || !password) throw new Error400('Please provide both pseudo and password');

        const user = await Model.user.findByPseudo(pseudo.toLowerCase());

        if (!user) throw new Error401('Incorrect pseudo or password');

        const isPasswordOK = await bcrypt.compare(password, user.password);

        if (!isPasswordOK) throw new Error401('Incorrect pseudo or password');

        const token = jwtHelper.generateTokenForUser({ ...req.body, ip: req.ip });

        return res.status(200).json({ token, pseudo: user.pseudo });
    },

    // async testJWT(req, res) {
    //     res.status(200).json({ message: 'Login successful' });
    // },
};
