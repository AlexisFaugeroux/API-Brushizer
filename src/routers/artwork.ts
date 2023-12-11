import express from 'express';
import authentication from '../middlewares/authentication.ts';
import wrapper from '../middlewares/controllerWrapper.ts';
import controller from '../controllers/artwork/artwork.ts';
import authCreator from '../middlewares/authCreator.ts';
import validate from '../validation/validator.ts';
import createSchema from '../validation/schemas/artwork/create.ts';
import updateSchema from '../validation/schemas/artwork/update.ts';

const router = express.Router();

router
    .route('/')
    /**
     * GET /artworks
     * @summary Get all artworks
     * @tags Artwork
     * @return {[Artwork]} 200 - Success response - application/json
     */
    .get(wrapper(controller.getAll))
    /**
     * POST /artworks
     * @summary Create an artwork in database
     * @tags Artwork
     * @return {Artwork} 200 - Success response - application/json
     * @return { ApiError } 400 - Bad request response - application/json
     */
    .post(
        authentication,
        authCreator,
        validate('body', createSchema),
        wrapper(controller.createArtwork),
    );

router
    .route('/:id(\\d+)')
    /**
     * GET /artworks/:id
     * @summary Get one artwork
     * @tags Artwork
     * @param {number} id - Artwork identifier
     * @return {Artwork} 200 - Success response - application/json
     * @return { ApiError } 400 - Bad request response - application/json
     * @return { ApiError } 404 - Artwork not found - application/json
     */
    .get(wrapper(controller.getOneById))
    /**
     * PATCH /artworks/:id
     * @summary Update artwork data
     * @tags Artwork
     * @param {number} id - artwork identifier
     * @param {InputData} request.body- artwork info top update
     * @return {Artwork} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - artwork not found - application/json
     */
    .patch(
        authentication,
        validate('body', updateSchema),
        wrapper(controller.updateArtwork),
    )
    /**
     * DELETE /artworks/:id
     * @summary Delete a artwork in database
     * @return {Boolean} - 200 - Success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     */
    .delete(authentication, wrapper(controller.deleteArtwork));

router
    .route('/user/:id(\\d+)')
    /**
     * GET /artworks/user/:id
     * @summary Get all artworks from a user
     * @tags Artwork
     * @return {[Artwork]} 200 - Success response - application/json
     */
    .get(wrapper(controller.getAllFromUser));

export default router;
