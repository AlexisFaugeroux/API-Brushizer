import express from 'express';

import wrapper from '../middlewares/controllerWrapper.js';
import controller from '../controllers/user.js';

import validate from '../validation/validator.js';
import signupSchema from '../validation/schemas/user/signup.js';
import loginSchema from '../validation/schemas/user/login.js';

const router = express.Router();

router.route('/')
    /**
     * GET /users
     * @summary Get all users
     * @tags User
     * @return {[User]} 200 - Success response - application/json
     */
    .get(wrapper(controller.getAll));

router.route('/:id(\\d+)')
    /**
     * GET /users/:id
     * @summary Get one user data
     * @tags User
     * @param {number} id - user identifier
     * @return {User} 200 - Success response - application/json
     * @return { ApiError } 400 - Bad request response - application/json
     * @return { ApiError } 404 - User not found - application/json
     */
    .get(wrapper(controller.getOneByPk));

router.route('/:pseudo')
    /**
     * GET /users/:pseudo
     * @summary Get one user
     * @tags User
     * @param {string} pseudo - user identifier
     * @return {User} 200 - Success response - application/json
     * @return { ApiError } 400 - Bad request response - application/json
     * @return { ApiError } 404 - User not found - application/json
     */
    .get(wrapper(controller.getOneByPseudo));

router.route('/signup')
    /**
     * POST /users/signup
     * @summary Create a user in database
     * @return {User} - 200 - Success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     */
    .post(validate('body', signupSchema), wrapper(controller.signup));

router.route('/signout/:id')
    /**
     * DELETE /users/signout/:id
     * @summary Delete a user in database
     * @return {Boolean} - 200 - Success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     */
    .delete(wrapper(controller.signout));

router.route('/login')
    /**
     * POST /users/login
     * @summary Authenticate a user
     * @return {string} JSON Web Token - 200 - Success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 401 - Incorrect pseudo or password response - application/json
     */
    .post(validate('body', loginSchema), wrapper(controller.login));

router.route('/logout')
    /**
     * GET /users/logout
     * @summary Logs out a user
     * @return - 200 - Success response - application/json
     */
    .get(wrapper(controller.logout));

export default router;
