import express from 'express';
import authentication from '../middlewares/authentication.ts';
import wrapper from '../middlewares/controllerWrapper.ts';
import controller from '../controllers/user/user.ts';
import validate from '../validation/validator.ts';
import signupSchema from '../validation/schemas/user/signup.ts';
import loginSchema from '../validation/schemas/user/login.ts';
import updateSchema from '../validation/schemas/user/update.ts';

const router = express.Router();

router
    .route('/')
    /**
     * GET /users
     * @summary Get all users
     * @tags User
     * @return {[User]} 200 - Success response - application/json
     */
    .get(authentication, wrapper(controller.getAll));

router
    .route('/:id(\\d+)')
    /**
     * GET /users/:id
     * @summary Get one user data by id
     * @tags User
     * @param {number} id - user identifier
     * @return {User} 200 - Success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - User not found - application/json
     */
    .get(wrapper(controller.getOneById))
    /**
     * PATCH /users/:id
     * @summary Update user data
     * @tags User
     * @param {number} id - user identifier
     * @param {InputData} request.body- user info top update
     * @return {User} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - User not found - application/json
     */
    .patch(
        authentication,
        validate('body', updateSchema),
        wrapper(controller.updateUser),
    );

router
    .route('/:pseudo')
    /**
     * GET /users/:pseudo
     * @summary Get one user data by pseudo
     * @tags User
     * @param {string} pseudo - user identifier
     * @return {User} 200 - Success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - User not found - application/json
     */
    .get(authentication, wrapper(controller.getOneByPseudo));

router
    .route('/signup')
    /**
     * POST /users/signup
     * @summary Create a user in database
     * @return {User} - 200 - Success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     */
    .post(validate('body', signupSchema), wrapper(controller.signup));

router
    .route('/signout/:id')
    /**
     * DELETE /users/signout/:id
     * @summary Delete a user in database
     * @return {Boolean} - 200 - Success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     */
    .delete(authentication, wrapper(controller.signout));

router
    .route('/login')
    /**
     * POST /users/login
     * @summary Authenticate a user
     * @return {string} JSON Web Token - 200 - Success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 401 - Incorrect pseudo or password response - application/json
     */
    .post(validate('body', loginSchema), wrapper(controller.login));

router
    .route('/logout')
    /**
     * POST /users/logout
     * @summary Logs out a user
     * @return - 200 - Success response - application/json
     */
    .post(authentication, wrapper(controller.logout));

export default router;
