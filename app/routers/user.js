import express from 'express';

import wrapper from '../middlewares/controllerWrapper.js';
import controller from '../controllers/user.js';

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
     * GET /users/{id}
     * @summary Get one user
     * @tags User
     * @param {number} id - user identifier
     * @return {User} 200 - Success response - application/json
     * @return { ApiError } 400 - Bad request response - application/json
     * @return { ApiError } 404 - User not found - application/json
     */
    .get(wrapper(controller.getOne));

export default router;
