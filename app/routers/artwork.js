import express from 'express';

import wrapper from '../middlewares/controllerWrapper.js';
import controller from '../controllers/artwork.js';

const router = express.Router();

router.route('/')
    /**
     * GET /artworks
     * @summary Get all artworks
     * @tags Artwork
     * @return {[Artwork]} 200 - Success response - application/json
     */
    .get(wrapper(controller.getAll));

router.route('/:id(\\d+)')
    /**
     * GET /artworks/{id}
     * @summary Get one artwork
     * @tags Artwork
     * @param {number} id - Artwork identifier
     * @return {Artwork} 200 - Success response - application/json
     * @return { ApiError } 400 - Bad request response - application/json
     * @return { ApiError } 404 - Artwork not found - application/json
     */
    .get(wrapper(controller.getOne));

export default router;
