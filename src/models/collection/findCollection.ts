import { PrismaClient, Prisma } from '@prisma/client';
import type { CollectionPayload } from './constants.ts';
import { collectionPrismaSelect as select } from './constants.ts';
import logger from '../../helpers/logger.ts';
import ApiError from '../../helpers/apiError.ts';

const prisma = new PrismaClient();

export const findCollection = async (
    where: Prisma.CollectionWhereUniqueInput,
): Promise<CollectionPayload | undefined> => {
    const collection = await prisma.collection.findUnique({
        select,
        where,
    });

    if (!collection) return undefined;

    logger.info({ collection }, 'Read collection');

    return collection;
};
