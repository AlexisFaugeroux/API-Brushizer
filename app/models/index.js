// Import connection client to the database
import client from '../helpers/database.js';

// Import models
import Artwork from './artwork.js';
import ArtworkHasAttribute from './artwork_has_attribute.js';
import Attribute from './attribute.js';
import Collection from './collection.js';
import Role from './role.js';
import User from './user.js';

export default {
    artwork: new Artwork(client),
    role: new Role(client),
    user: new User(client),
    collection: new Collection(client),
    attribute: new Attribute(client),
    artwork_has_attribute: new ArtworkHasAttribute(client),
};
