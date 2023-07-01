import { createRequire } from 'module';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import debug from 'debug';
import type { User } from '../src/types/user';

const require = createRequire(import.meta.url);

const artworks = require('./artwork.json');
const attributes = require('./attribute.json');
const attributes_on_artworks = require('./attributes-on-artworks.json');
const collections = require('./collection.json');
const roles = require('./role.json');
const users = require('./user.json');

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

async function hashUsersPasswords(): Promise<void> {
    const hashedPasswordPromesses: Promise<string>[] = [];
    users.forEach((user: User) => {
        const promess = Promise.resolve(bcrypt.hash(user.password, 10));
        hashedPasswordPromesses.push(promess);
    });
    const hashedPasswords = await Promise.all(hashedPasswordPromesses);
    users.forEach((user: User, index: number) => {
        user.password = hashedPasswords[index];
    });
}

async function importData() {
    debugImport('Processing : Roles');
    await prisma.role.createMany({ data: roles });

    debugImport('Processing : Users');
    await hashUsersPasswords();
    await prisma.user.createMany({ data: users });

    debugImport('Processing : Collection');
    await prisma.collection.createMany({
        data: collections,
    });

    debugImport('Processing : Artworks');
    await prisma.artwork.createMany({ data: artworks });

    debugImport('Processing : Attributes');
    await prisma.attribute.createMany({
        data: attributes,
    });

    debugImport('Processing : AttributesOnArtworks');
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
