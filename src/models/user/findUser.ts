import { PrismaClient, Prisma } from '@prisma/client';
import type { UserPayload } from './constants.ts';
import { userPrismaSelect as select } from './constants.ts';
import logger from '../../helpers/logger.ts';
import Error401 from '../../helpers/error401.ts';

const prisma = new PrismaClient();

export const findUser = async (
    where: Prisma.UserWhereUniqueInput,
): Promise<UserPayload | undefined> => {
    const user = await prisma.user.findUnique({
        select,
        where,
    });

    if (!user) return undefined;

    logger.info({ user }, 'Read user');

    return user;
};
