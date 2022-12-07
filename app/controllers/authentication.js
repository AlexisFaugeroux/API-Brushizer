import bcrypt from 'bcrypt';
import Model from '../models/index.js';
import jwtHelper from '../helpers/jwt.js';
import Error401 from '../helpers/error401.js';

export default {
    async login(req, res) {
        const { pseudo, password } = req.params;

        const user = await Model.user.findByPseudo(pseudo);

        const isPasswordOK = await bcrypt.compare(password, user.password);

        if (!user || !isPasswordOK) throw new Error401('Incorrect pseudo or password');

        const token = jwtHelper.generateTokenForUser({ userData: req.body });

        return res.status(200).json({ token });
    },
};
