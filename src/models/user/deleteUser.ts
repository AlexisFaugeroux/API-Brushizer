import { PrismaClient, Prisma } from '@prisma/client';
import type { User } from '../../types/user.ts';
import { userPrismaSelect as select } from './constants.ts';
import logger from '../../helpers/logger.ts';
import ApiError from '../../helpers/apiError.ts';

const prisma = new PrismaClient();

export const deleteOneUser = async (
    where: Prisma.UserWhereUniqueInput,
): Promise<User> => {
    try {
        const user = await prisma.user.delete({
            where,
            select,
        });

        logger.info({ user }, 'Delete user');

        return user;
    } catch (error: unknown) {
        throw new ApiError('Could not delete user', error as {});
    }
};
