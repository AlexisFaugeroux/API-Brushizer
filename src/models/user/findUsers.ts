import { PrismaClient, Prisma } from '@prisma/client';
import type { User } from '../../types/user.ts';
import { userPrismaSelect as select } from './constants.ts';
import logger from '../../helpers/logger.ts';
import ApiError from '../../helpers/apiError.ts';

const prisma = new PrismaClient();

export const findUsers = async (
    where: Prisma.UserWhereInput,
): Promise<Omit<User, 'role_id'>[]> => {
    try {
        const user = await prisma.user.findMany({
            select,
            where,
        });

        if (!user) throw new ApiError('Could not find users');

        logger.info({ user }, 'List users');

        return user;
    } catch (error: unknown) {
        throw new ApiError('Could not list users', error as {});
    }
};
