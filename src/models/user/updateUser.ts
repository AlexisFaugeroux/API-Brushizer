import { PrismaClient, Prisma } from '@prisma/client';
import type { User } from '../../types/user.ts';
import logger from '../../helpers/logger.ts';
import ApiError from '../../helpers/apiError.ts';

const prisma = new PrismaClient();

interface UserUpdateInput {
    id: number;
    email?: string;
    password?: string;
    pseudo?: string;
    country?: string;
    description?: string | null;
}

// This function only updates user info. Maybe create another route/function to update KPI's and role ?
export const updateOneUser = async (input: UserUpdateInput): Promise<User> => {
    try {
        const user = await prisma.user.update({
            where: { id: input.id },
            data: input,
        });

        logger.info({ user }, 'Update user');

        return user;
    } catch (error: unknown) {
        throw new ApiError('Could not update user', error as {});
    }
};
