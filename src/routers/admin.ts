import express from 'express';
import authentication from '../middlewares/authentication.ts';
import wrapper from '../middlewares/controllerWrapper.ts';
import controller from '../controllers/admin/admin.ts';
import authAdmin from '../middlewares/authAdmin.ts';

const router = express.Router();

router
    .route('/users/delete/:id')
    /**
     * DELETE /users/delete/:id
     * @summary Delete a user in database
     * @return {Boolean} - 200 - Success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     */
    .delete(authentication, authAdmin, wrapper(controller.deleteUser));

export default router;
