import { PrismaClient, Prisma } from '@prisma/client';
import type { Attribute } from '../../types/attribute.ts';
import { attributePrismaSelect as select } from './constants.ts';
import logger from '../../helpers/logger.ts';
import ApiError from '../../helpers/apiError.ts';

const prisma = new PrismaClient();

export const findAttribute = async (
    where: Prisma.AttributeWhereUniqueInput,
): Promise<Omit<Attribute, 'collection_id'>> => {
    try {
        const attribute = await prisma.attribute.findUnique({
            select,
            where,
        });

        if (!attribute) throw new ApiError('Could not find attribute');

        logger.info({ attribute }, 'Read attribute');

        return attribute;
    } catch (error: unknown) {
        throw new ApiError('Could not read attribute', error as {});
    }
};
