import express from 'express';
import wrapper from '../middlewares/controllerWrapper.ts';
import controller from '../controllers/role/role.ts';

const router = express.Router();

router
    .route('/')
    /**
     * GET /roles
     * @summary Get all roles
     * @tags Role
     * @return {[Role]} 200 - Success response - application/json
     */
    .get(wrapper(controller.getAll));

router
    .route('/:id(\\d+)')
    /**
     * GET /roles/:id
     * @summary Get one role
     * @tags Role
     * @param {number} id - role identifier
     * @return {Role} 200 - Success response - application/json
     * @return { ApiError } 400 - Bad request response - application/json
     * @return { ApiError } 404 - Role not found - application/json
     */
    .get(wrapper(controller.getOneById));

export default router;
