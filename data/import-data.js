import pg from 'pg';
import debug from 'debug';

import roles from './role.json' assert {type: 'json'};
import users from './user.json' assert {type: 'json'};
import collections from './collection.json' assert {type: 'json'};
import artworks from './artwork.json' assert {type: 'json'};
import attributes from './attribute.json' assert {type: 'json'};
import artwork_has_attribute from './artwork_has_attribute.json' assert {type: 'json'};

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

    const userQueries = [];

    users.forEach((user) => {
        debugImport('Processing user: ', user.email);
        const query = client.query(
            `
            INSERT INTO "user"("email", "password", "pseudo", "profile_pic", "role_id")
                VALUES($1,$2,$3,$4,$5)
            `,
            [user.email, user.password, user.pseudo, user.role_id],
        );
        userQueries.push(query);
    });

    await Promise.all(userQueries);
})();
