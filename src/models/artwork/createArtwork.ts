import { PrismaClient } from '@prisma/client';
import type { Artwork } from '../../types/artwork.ts';
import { artworkPrismaSelect as select, ArtworkPayload } from './constants.ts';
import logger from '../../helpers/logger.ts';
import ApiError from '../../helpers/apiError.ts';

const prisma = new PrismaClient();

export const createOneArtwork = async (
    input: Artwork,
): Promise<ArtworkPayload> => {
    try {
        const artwork = await prisma.artwork.create({
            data: input,
            select,
        });

        logger.info({ artwork }, 'Create artwork');

        return artwork;
    } catch (error: unknown) {
        throw new ApiError('Could not create artwork', error as {});
    }
};
