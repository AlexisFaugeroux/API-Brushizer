import { PrismaClient, Prisma } from '@prisma/client';
import { ArtworkPayload, artworkPrismaSelect as select } from './constants.ts';
import logger from '../../helpers/logger.ts';
import ApiError from '../../helpers/apiError.ts';

const prisma = new PrismaClient();

export const findArtworks = async (
    where: Prisma.ArtworkWhereInput,
): Promise<ArtworkPayload[]> => {
    try {
        const artwork = await prisma.artwork.findMany({
            select,
            where,
        });

        if (!artwork) throw new ApiError('Could not find artworks');

        logger.info({ artwork }, 'List artwork');

        return artwork;
    } catch (error: unknown) {
        throw new ApiError('Could not list artworks', error as {});
    }
};
