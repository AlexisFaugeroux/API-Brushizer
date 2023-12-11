import { PrismaClient, Prisma } from '@prisma/client';
import type { Attribute } from '../../types/attribute.ts';
import { attributePrismaSelect as select } from './constants.ts';
import logger from '../../helpers/logger.ts';
import ApiError from '../../helpers/apiError.ts';

const prisma = new PrismaClient();

export const findAttributes = async (
    where: Prisma.AttributeWhereInput,
): Promise<Omit<Attribute, 'collection_id'>[]> => {
    try {
        const attribute = await prisma.attribute.findMany({
            select,
            where,
        });

        if (!attribute) throw new ApiError('Could not find attribute');

        logger.info({ attribute }, 'List attribute');

        return attribute;
    } catch (error: unknown) {
        throw new ApiError('Could not list attribute', error as {});
    }
};
