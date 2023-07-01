import express from 'express';
import wrapper from '../middlewares/controllerWrapper.ts';
import controller from '../controllers/collection/collection.ts';

const router = express.Router();

router
    .route('/')
    /**
     * GET /collections
     * @summary Get all collections
     * @tags Collection
     * @return {[Collection]} 200 - Success response - application/json
     */
    .get(wrapper(controller.getAll));

router
    .route('/:id(\\d+)')
    /**
     * GET /collections/:id
     * @summary Get one artwork
     * @tags Collection
     * @param {number} id - Collection identifier
     * @return {Collection} 200 - Success response - application/json
     * @return { ApiError } 400 - Bad request response - application/json
     * @return { ApiError } 404 - Collection not found - application/json
     */
    .get(wrapper(controller.getOneById));

export default router;
