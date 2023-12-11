import { PrismaClient } from '@prisma/client';
import type { User } from '../../types/user.ts';
import { userPrismaSelect as select } from './constants.ts';
import logger from '../../helpers/logger.ts';
import ApiError from '../../helpers/apiError.ts';

const prisma = new PrismaClient();

export const createOneUser = async (input: User): Promise<User> => {
    try {
        const user = await prisma.user.create({
            data: input,
            select,
        });

        logger.info({ user }, 'Create user');

        return user;
    } catch (error: unknown) {
        throw new ApiError('Could not create user', error as {});
    }
};
