import { Prisma } from '@prisma/client';

export const artworkPrismaSelect = Prisma.validator<Prisma.ArtworkSelect>()({
    id: true,
    name: true,
    description: true,
    artwork_view: true,
    image: true,
    price_usd: true,
    price_sol: true,
    collection: {
        select: {
            title: true,
            artist_id: true,
        },
    },
    collection_id: true,
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
});

export type ArtworkPayload = Prisma.ArtworkGetPayload<{
    select: typeof artworkPrismaSelect;
}>;
