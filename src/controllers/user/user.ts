import { Request, Response } from 'express';
import { User } from '../../types/user.ts';
import { generateToken } from '../../helpers/jwt.ts';
import bcrypt from 'bcrypt';
import * as UserModel from '../../models/user/index.ts';
import Error400 from '../../helpers/error400.ts';
import Error401 from '../../helpers/error401.ts';
import Error404 from '../../helpers/error404.ts';
import { json } from 'stream/consumers';

export default {
    /**
     * Controller for GET /users
     * @param {object} _ - Express middleware request (not used)
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */

    async getAll(_: Request, res: Response): Promise<Response> {
        const users = await UserModel.findUsers({});

        return res.status(200).json(users);
    },

    /**
     * Controller for GET /users/:id
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async getOneById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const result = await UserModel.findUser({ id: parseInt(id) });

        if (!result) throw new Error404('User not found');

        const { password, ...user } = result;

        return res.status(200).json(user);
    },

    /**
     * Controller for GET /users/:pseudo
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async getOneByPseudo(req: Request, res: Response): Promise<Response> {
        const { pseudo } = req.params;
        const result = await UserModel.findUser({ pseudo });

        if (!result) throw new Error404('User not found');

        const { password, ...user } = result;

        return res.status(200).json(user);
    },

    /**
     * Controller for POST /users/signup
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async signup(
        req: Request<any, Response, User>,
        res: Response,
    ): Promise<Response> {
        if (!req.body.role_id) {
            req.body.role_id = 1;
        }

        const isNotUnique = await UserModel.findUser({
            email: req.body.email,
        });
        if (isNotUnique) {
            let field = '';
            if (req.body.email === isNotUnique.email) {
                field = 'email';
            } else {
                field = 'pseudo';
            }
            throw new Error400(`User already exists with this ${field}`);
        }

        req.body.password = await bcrypt.hash(req.body.password, 10);
        const newUser = await UserModel.createOneUser(req.body);

        req.body.password = '';

        return res.status(201).json(newUser);
    },

    /**
     * Controller for DELETE /users/signup/:id
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async signout(
        req: Request<any, Response, User>,
        res: Response,
    ): Promise<Response> {
        const id = parseInt(req.params.id, 10);

        if (req.user?.id !== id)
            throw new Error401('Cannot signout another user');

        const deletedUser = await UserModel.deleteOneUser({ id });

        if (!deletedUser) throw new Error404('This user does not exist');

        return res.status(200).json(deletedUser);
    },

    /**
     * Controller for POST /users/login
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async login(
        req: Request<any, Response, User>,
        res: Response,
    ): Promise<Response> {
        const { pseudo, password } = req.body;
        const user = await UserModel.findUser({ pseudo: pseudo });

        if (!user) throw new Error401('Incorrect pseudo or password');

        const isPasswordOK = await bcrypt.compare(password, user.password);

        if (!isPasswordOK) throw new Error401('Incorrect pseudo or password');

        const token = generateToken({ ...user, ip: req.ip });

        return res
            .status(200)
            .json({ token, pseudo: user.pseudo, id: user.id });
    },

    /**
     * Controller for POST /users/logout
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async logout(
        req: Request<any, Response, User>,
        res: Response,
    ): Promise<Response> {
        req.user = null;

        return res.status(200).json('User logged out');
    },

    /**
     * Controller for PATCH /users/:id
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async updateUser(
        req: Request<any, Response, User>,
        res: Response,
    ): Promise<Response> {
        const id = parseInt(req.params.id, 10);

        const user = await UserModel.findUser({ id });

        if (req.user?.id !== id)
            throw new Error401('Cannot update data from another user');

        if (!user) throw new Error404('This user does not exist');

        req.body.id = id;

        const updatedUser = await UserModel.updateOneUser(req.body);

        return res.status(200).json(updatedUser);
    },
};
