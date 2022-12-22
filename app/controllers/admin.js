import debug from 'debug';
import Model from '../models/index.js';
import Error404 from '../helpers/error404.js';

const debugAdminDeleteUser = debug('AdminDeleteUser');

export default {
    async signout(req, res) {
        const id = parseInt(req.params.id, 10);
    
        // Next block of code ensure all foreign keys related to an artist in database are deleted
        // Get all artworks from the artist
        const userArtworks = await Model.artwork.findAll({$where: { user_id: id }});
    
        if (userArtworks.length > 0) {
            // Build an array containing all the artworks ids
            const userArtworksIds = [];
    
            Object.values(userArtworks).forEach((artwork) => {
                userArtworksIds.push(artwork.id);
            });
    
            // Delete foreign keys related to the artworks from the artwork_has_attribute table
            debugAdminDeleteUser('Delete artworks foreign keys in artwork_has_attribute table');
            await Model.artwork_has_attribute.deleteArtworkFkeysRecords(userArtworksIds);
    
            debugAdminDeleteUser('Delete all the artist artworks in artwork table');
            await Model.artwork.deleteUserFkeyRecords(id);
    
            debugAdminDeleteUser('Delete collections data related to the artist in collection table');
            await Model.collection.deleteUserFkeyRecords(id);
        }
    // Ready for artist account deletion
    const isDeletionOK = await Model.user.delete(id);
    
     debugAdminDeleteUser('isDeletionOK', isDeletionOK);
    
    if (!isDeletionOK) throw new Error404('This user does not exist');
    
    return res.status(204).json(isDeletionOK);
    }
}
