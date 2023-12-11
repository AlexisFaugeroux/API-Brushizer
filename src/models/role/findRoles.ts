import { PrismaClient, Prisma } from '@prisma/client';
import type { Role } from '../../types/role.ts';
import { rolePrismaSelect as select } from './constants.ts';
import logger from '../../helpers/logger.ts';
import ApiError from '../../helpers/apiError.ts';

const prisma = new PrismaClient();

export const findRoles = async (
    where: Prisma.RoleWhereInput,
): Promise<Role[]> => {
    const role = await prisma.role.findMany({
        select,
        where,
    });

    if (!role) throw new ApiError('Could not list roles');

    logger.info({ role }, 'List roles');

    return role;
};
