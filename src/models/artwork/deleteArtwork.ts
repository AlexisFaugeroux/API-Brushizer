import { PrismaClient, Prisma } from '@prisma/client';
import type { Artwork } from '../../types/artwork.ts';
import { artworkPrismaSelect as select } from './constants.js';
import logger from '../../helpers/logger.js';
import ApiError from '../../helpers/apiError.js';

const prisma = new PrismaClient();

export const deleteOneArtwork = async (
    where: Prisma.ArtworkWhereUniqueInput,
): Promise<Artwork> => {
    try {
        const artwork = await prisma.artwork.delete({
            where,
            select,
        });
        logger.info({ artwork }, 'Delete artwork');

        return artwork;
    } catch (error: unknown) {
        throw new ApiError('Could not delete artwork', error as {});
    }
};
