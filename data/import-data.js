/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import '../app/helpers/loadEnv.js';

import pg from 'pg';
import debug from 'debug';
import bcrypt from 'bcrypt';

import roles from './role.json' assert {type: 'json'};
import users from './user.json' assert {type: 'json'};
import collections from './collection.json' assert {type: 'json'};
import artworks from './artwork.json' assert {type: 'json'};
import attributes from './attribute.json' assert {type: 'json'};
import artworkHasAttributes from './artwork_has_attribute.json' assert {type: 'json'};

const { Client } = pg;

const debugImport = debug('importData');

(async () => {
    const client = new Client(process.env.DATABASE_URL);

    await client.connect();

    debugImport('Client connected');

    debugImport('Clean table');
    await client.query('TRUNCATE TABLE "role", "user", "collection", "artwork", "attribute", "artwork_has_attribute" RESTART IDENTITY');

    const roleQueries = [];

    roles.forEach((role) => {
        debugImport('Processing role: ', role.label);
        const query = client.query(
            `
            INSERT INTO "role"("label")
                VALUES($1)
            `,
            [role.label],
        );
        roleQueries.push(query);
    });

    await Promise.all(roleQueries);

    for (const user of users) {
        debugImport('Processing user: ', user.email);
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await client.query(
            `
            INSERT INTO "user"("email", "password", "pseudo", "country", "description", "profile_pic", "role_id")
                VALUES($1,$2,$3,$4,$5,$6, $7)
            `,
            [
                user.email,
                hashedPassword,
                user.pseudo,
                user.country,
                user.description,
                user.profile_pic,
                user.role_id,
            ],
        );
    }

    const collectionQueries = [];

    collections.forEach((collection) => {
        debugImport('Processing collection: ', collection.name);
        const query = client.query(
            `
            INSERT INTO "collection"("name", "artist_name", "user_id")
                VALUES($1,$2,$3)
            `,
            [collection.name, collection.artist_name, collection.user_id],
        );
        collectionQueries.push(query);
    });

    await Promise.all(collectionQueries);

    const artworkQueries = [];

    artworks.forEach((artwork) => {
        debugImport('Processing artwork: ', artwork.name);
        const query = client.query(
            `
            INSERT INTO "artwork"("name", "image", "description", "artist_name", "price_usd", "price_sol", "user_id", "collection_id")
                VALUES($1,$2,$3,$4,$5,$6,$7,$8)
            `,
            [
                artwork.name,
                artwork.image,
                artwork.description,
                artwork.artist_name,
                artwork.price_usd,
                artwork.price_sol,
                artwork.user_id,
                artwork.collection_id,
            ],
        );
        artworkQueries.push(query);
    });

    await Promise.all(artworkQueries);

    const attributeQueries = [];

    attributes.forEach((attribute) => {
        debugImport('Processing attribute: ');
        const query = client.query(
            `
            INSERT INTO "attribute"("background", "shape", "shape_color")
                VALUES($1,$2,$3)
            `,
            [attribute.background, attribute.shape, attribute.shape_color],
        );
        attributeQueries.push(query);
    });

    await Promise.all(attributeQueries);

    const artworkHasAttributeQueries = [];

    artworkHasAttributes.forEach((artworkHasAttribute) => {
        debugImport('Processing artworkHasAttribute: ');
        const query = client.query(
            `
            INSERT INTO "artwork_has_attribute"("artwork_id", "attribute_id")
                VALUES($1,$2)
            `,
            [artworkHasAttribute.artwork_id, artworkHasAttribute.attribute_id],
        );
        artworkHasAttributeQueries.push(query);
    });

    await Promise.all(artworkHasAttributeQueries);

    debugImport('Import done');

    client.end();
})();
