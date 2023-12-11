import { Prisma } from '@prisma/client';

export const collectionPrismaSelect =
    Prisma.validator<Prisma.CollectionSelect>()({
        id: true,
        title: true,
        artist: {
            select: {
                pseudo: true,
            },
        },
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
    });

export type CollectionPayload = Prisma.CollectionGetPayload<{
    select: typeof collectionPrismaSelect;
}>;
