import { PrismaClient, Prisma } from '@prisma/client';
import type { Role } from '../../types/role.ts';
import logger from '../../helpers/logger.ts';
import ApiError from '../../helpers/apiError.ts';

const prisma = new PrismaClient();

export const findRole = async (
    where: Prisma.RoleWhereUniqueInput,
): Promise<Role> => {
    const role = await prisma.role.findUnique({
        where,
    });

    if (!role) throw new ApiError('Could not read role');

    logger.info({ role }, 'Read role');

    return role;
};
