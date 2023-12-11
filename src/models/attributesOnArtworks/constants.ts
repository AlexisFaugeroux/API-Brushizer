import { Prisma } from '@prisma/client';

export const attributesOnArtworksPrismaSelect =
    Prisma.validator<Prisma.AttributesOnArtworksSelect>()({
        artwork: {
            select: {
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
                        artist: {
                            select: {
                                pseudo: true,
                            },
                        },
                    },
                },
            },
        },
        attribute: {
            select: {
                background: true,
                shape: true,
                shape_color: true,
            },
        },
    });
