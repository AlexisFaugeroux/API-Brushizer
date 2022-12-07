import express from 'express';

import wrapper from '../middlewares/controllerWrapper.js';
import controller from '../controllers/authentication';

const router = express.Router();

router.route('/')
    /**
     * POST /users
     * @summary Authenticate a user
     * @return {[User]} 200 - Success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - User not found - application/json
     */
    .get(wrapper(controller.login));

export default router;
