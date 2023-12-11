import { PrismaClient, Prisma } from '@prisma/client';
import type { AttributesOnArtworks } from '../../types/attributesOnArtworks.ts';
import { attributesOnArtworksPrismaSelect as select } from './constants.ts';
import logger from '../../helpers/logger.ts';
import ApiError from '../../helpers/apiError.ts';

const prisma = new PrismaClient();

export const findAtrributesOnArtworks = async (
    where: Prisma.AttributesOnArtworksWhereInput,
): Promise<Omit<AttributesOnArtworks, 'artwork_id' | 'attribute_id'>[]> => {
    try {
        const artwork = await prisma.attributesOnArtworks.findMany({
            select,
            where,
        });

        if (!artwork) throw new ApiError('Could not find artwork');

        logger.info({ artwork }, 'Read artwork');

        return artwork;
    } catch (error: unknown) {
        throw new ApiError('Could not read artwork', error as {});
    }
};
