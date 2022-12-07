// Import connection client to the database
import client from '../helpers/database.js';

// Import models
import Artwork from './artwork.js';
import Role from './role.js';
import User from './user.js';

export default {
    artwork: new Artwork(client),
    role: new Role(client),
    user: new User(client),
};
