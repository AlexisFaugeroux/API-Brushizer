import { PrismaClient } from '@prisma/client';

import debug from 'debug';

import roles from './role.json';
import users from './user.json';
import collections from './collection.json';
import artworks from './artwork.json';
import attributes from './attribute.json';
import attributes_on_artworks from './attributes-on-artworks.json';

const debugImport = debug('importData');

const prisma = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'error',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
    ],
});

async function importData() {
    debugImport('Processing : Roles');
    const importRoles = await prisma.role.createMany({ data: roles });

    debugImport('Processing : Users');
    const importUsers = await prisma.user.createMany({ data: users });

    debugImport('Processing : Collection');
    const importCollection = await prisma.collection.createMany({
        data: collections,
    });

    debugImport('Processing : Artworks');
    const importArtworks = await prisma.artwork.createMany({ data: artworks });

    debugImport('Processing : Attributes');
    const importAttributes = await prisma.attribute.createMany({
        data: attributes,
    });

    debugImport('Processing : AttributesOnArtworks');
    const importAttributesOnArtworks =
        await prisma.attributesOnArtworks.createMany({
            data: attributes_on_artworks,
        });

    debugImport('Import complete');
}

importData()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
