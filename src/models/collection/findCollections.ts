import { PrismaClient, Prisma } from '@prisma/client';
import type { CollectionPayload } from './constants.ts';
import { collectionPrismaSelect as select } from './constants.ts';
import logger from '../../helpers/logger.ts';
import ApiError from '../../helpers/apiError.ts';

const prisma = new PrismaClient();

export const findCollections = async (
    where: Prisma.CollectionWhereInput,
): Promise<CollectionPayload[]> => {
    try {
        const collection = await prisma.collection.findMany({
            select,
            where,
        });

        if (!collection) throw new ApiError('Could not find collections');

        logger.info({ collection }, 'List collections');

        return collection;
    } catch (error: unknown) {
        throw new ApiError('Could not list collections', error as {});
    }
};
