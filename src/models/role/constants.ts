import { Prisma } from '@prisma/client';

export const rolePrismaSelect = Prisma.validator<Prisma.RoleSelect>()({
    id: true,
    label: true,
});
