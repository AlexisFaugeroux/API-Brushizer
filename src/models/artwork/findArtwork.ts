import { PrismaClient, Prisma } from '@prisma/client';
import { ArtworkPayload, artworkPrismaSelect as select } from './constants.ts';
import logger from '../../helpers/logger.ts';
import ApiError from '../../helpers/apiError.ts';

const prisma = new PrismaClient();

export const findArtwork = async (
    where: Prisma.ArtworkWhereUniqueInput,
): Promise<ArtworkPayload> => {
    try {
        const artwork = await prisma.artwork.findUnique({
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
