import { Prisma } from '@prisma/client';

export const userPrismaSelect = Prisma.validator<Prisma.UserSelect>()({
    id: true,
    email: true,
    password: true,
    pseudo: true,
    country: true,
    description: true,
    profile_pic: true,
    profile_view: true,
    role: {
        select: {
            label: true,
        },
    },
    role_id: true,
    collections: {
        select: {
            title: true,
            artworks: {
                select: {
                    name: true,
                    description: true,
                    artwork_view: true,
                    image: true,
                    price_usd: true,
                    price_sol: true,
                    attributes: {
                        select: {
                            attribute: {
                                select: {
                                    background: true,
                                    shape: true,
                                    shape_color: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    },
});

export type UserPayload = Prisma.UserGetPayload<{
    select: typeof userPrismaSelect;
}>;
