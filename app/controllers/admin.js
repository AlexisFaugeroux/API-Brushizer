import Model from '../models/index.js';
import Error404 from '../helpers/error404.js';

export default {
    async deleteUser(req, res) {
        const id = parseInt(req.params.id, 10);

        // Next block of code ensure all foreign keys related to an artist in database are deleted
        // Get all artworks from the artist
        const userArtworks = await Model.artwork.findAll({ $where: { user_id: id } });

        if (userArtworks.length > 0) {
            // Build an array containing all the artworks ids
            const userArtworksIds = [];

            Object.values(userArtworks).forEach((artwork) => {
                userArtworksIds.push(artwork.id);
            });

            // Delete foreign keys related to the artworks from the artwork_has_attribute table
            await Model.artwork_has_attribute.deleteArtworksFkeysRecords(userArtworksIds);
            // Delete all the artist artworks in artwork table
            await Model.artwork.deleteUserFkeyRecords(id);
            // Delete collections data related to the artist in collection table
            await Model.collection.deleteUserFkeyRecords(id);
        }
        // Ready for artist account deletion
        const isDeletionOK = await Model.user.delete(id);

        if (!isDeletionOK) throw new Error404('This user does not exist');

        return res.status(204).json(isDeletionOK);
    },
};
