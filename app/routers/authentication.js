import express from 'express';

import wrapper from '../middlewares/controllerWrapper.js';
import controller from '../controllers/authentication.js';

const router = express.Router();

router.route('/')
    /**
     * POST /login
     * @summary Authenticate a user
     * @return {string} JSON Web Token - 200 - Success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 401 - Incorrect pseudo or password response - application/json
     */
    .post(wrapper(controller.login));

export default router;
