import { Request, Response } from 'express';
import type { Artwork } from '@prisma/client';
import * as ArtworkModel from '../../models/artwork/index.ts';
import * as UserModel from '../../models/user/index.ts';
import * as CollectionModel from '../../models/collection/index.ts';
import Error400 from '../../helpers/error400.ts';
import Error404 from '../../helpers/error404.ts';
import Error401 from '../../helpers/error401.ts';

export default {
    /**
     * Controller for GET /artworks
     * @param {object} _ - Express middleware request (not used)
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async getAll(_: Request, res: Response): Promise<Response> {
        const artworks = await ArtworkModel.findArtworks({});

        return res.json(artworks);
    },

    /**
     * Controller for GET /artworks/user/:id
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async getAllFromUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const user = await UserModel.findUser({ id: parseInt(id) });

        if (!user) throw new Error404('This user does not exist');

        const { pseudo, collections } = user;

        return res.json({ pseudo, collections });
    },

    /**
     * Controller for GET /artworks/:id
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async getOneById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const artwork = await ArtworkModel.findArtwork({ id: parseInt(id) });

        if (!artwork) throw new Error404('Artwork not found');

        return res.json(artwork);
    },

    /**
     * Controller for POST /artworks/
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async createArtwork(req: Request, res: Response): Promise<Response> {
        if (!req.body.collection_id)
            throw new Error400('Cannot create artwork whithout collection');

        const collection = await CollectionModel.findCollection({
            id: req.body.collection_id,
        });
        if (!collection) throw new Error400('Collection does not exist');

        const isNotUnique = collection.artworks.filter((artwork) => {
            artwork.image === req.body.image;
        });
        console.log(isNotUnique);
        if (isNotUnique.length !== 0) {
            throw new Error400(`A record with this image already exists`);
        }

        const newArtwork = await ArtworkModel.createOneArtwork(req.body);

        return res.status(201).json(newArtwork);
    },

    /**
     * Controller for PATCH /artworks/:id
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async updateArtwork(
        req: Request<any, Response, Artwork>,
        res: Response,
    ): Promise<Response> {
        const id = parseInt(req.params.id, 10);

        const artwork = await ArtworkModel.findArtwork({ id });

        if (!artwork) throw new Error404('This artwork does not exist');

        if (req.user?.id !== artwork.collection.artist_id)
            throw new Error401('Cannot update artwork from another user');

        if (req.body.image) {
            const existingArtworks = await ArtworkModel.findArtworks({});

            const isNotUnique = existingArtworks.filter((artwork) => {
                artwork.image === req.body.image;
            });
            if (isNotUnique) {
                throw new Error400(
                    `Another artwork already exists with this image`,
                );
            }
        }

        req.body.id = id;
        const updatedArtwork = await ArtworkModel.updateOneArtwork(req.body);

        return res.json(updatedArtwork);
    },

    /**
     * Controller for DELETE /artworks/:id
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async deleteArtwork(
        req: Request<any, Response, Artwork>,
        res: Response,
    ): Promise<Response> {
        const id = parseInt(req.params.id, 10);

        const artwork = await ArtworkModel.findArtwork({ id });

        if (!artwork) throw new Error404('This artwork does not exist');

        if (req.user?.id !== artwork.collection.artist_id)
            throw new Error401('Cannot delete an artwork from another artist');

        const deletedArtork = await ArtworkModel.deleteOneArtwork({ id });

        return res.status(204).json(deletedArtork);
    },
};
