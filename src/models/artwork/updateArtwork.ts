import { PrismaClient } from '@prisma/client';
import type { Artwork } from '../../types/artwork.ts';
import logger from '../../helpers/logger.ts';
import ApiError from '../../helpers/apiError.ts';

const prisma = new PrismaClient();

interface ArtworkUpdateInput {
    id: number;
    description?: string | null;
    price_usd?: number;
    price_sol?: number;
}

export const updateOneArtwork = async (
    input: ArtworkUpdateInput,
): Promise<Artwork> => {
    try {
        const artwork = await prisma.artwork.update({
            where: { id: input.id },
            data: input,
        });

        logger.info({ artwork }, 'Update artwork');

        return artwork;
    } catch (error: unknown) {
        throw new ApiError('Could not update artwork', error as {});
    }
};
