import type { Request, Response } from 'express';
import * as CollectionModel from '../../models/collection/index.ts';
import Error404 from '../../helpers/error404.ts';

export default {
    /**
     * Controller for GET /collections
     * @param {object} _ - Express middleware request (not used)
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async getAll(_: Request, res: Response): Promise<Response> {
        const collections = await CollectionModel.findCollections({});

        return res.json(collections);
    },

    /**
     * Controller for GET /collection/:id
     * @param {object} req - Express middleware request
     * @param {object} res - Express middleware response
     * @returns Route API JSON response
     */
    async getOneById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const collection = await CollectionModel.findCollection({
            id: parseInt(id),
        });

        if (!collection) throw new Error404('Collection not found');

        return res.json(collection);
    },
};
