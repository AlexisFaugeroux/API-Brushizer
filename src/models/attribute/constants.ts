import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const attributePrismaSelect = Prisma.validator<Prisma.AttributeSelect>()(
    {
        id: true,
        background: true,
        shape: true,
        shape_color: true,
    },
);
