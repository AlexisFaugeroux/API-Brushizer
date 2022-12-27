import express from 'express';

import jwtVerify from '../middlewares/jwtVerify.js';
import wrapper from '../middlewares/controllerWrapper.js';
import controller from '../controllers/admin.js';

import adminCheck from '../middlewares/adminCheck.js';

const router = express.Router();

router.route('/users/delete/:id')
    /**
     * DELETE /users/delete/:id
     * @summary Delete a user in database
     * @return {Boolean} - 200 - Success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     */
    .delete(jwtVerify, adminCheck, wrapper(controller.deleteUser));

    export default router;