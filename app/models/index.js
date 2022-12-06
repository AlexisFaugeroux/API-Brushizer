// Import connection client to the database
import client from '../helpers/database.js';

// Import models
import Artwork from './artwork.js';

export default {
    artwork: new Artwork(client),
};
