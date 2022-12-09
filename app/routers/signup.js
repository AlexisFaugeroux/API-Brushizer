import express from 'express';

import wrapper from '../middlewares/controllerWrapper.js';
import controller from '../controllers/signup.js';

import validate from '../validation/validator.js';
import signupSchema from '../validation/schemas/user/signup.js';

const router = express.Router();

router.route('/')
    /**
     * POST /signup
     * @summary Create a user in database
     * @return {User} - 200 - Success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     */
    .post(validate('body', signupSchema), wrapper(controller.signup));

export default router;
