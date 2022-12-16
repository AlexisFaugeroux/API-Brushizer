import CoreDatamapper from './coreDatamapper.js';

export default class ArtworkHasAttribute extends CoreDatamapper {
    tableName = 'artwork_has_attribute';

    /**
     * Delete a foreign keys in other tables
     * @param {number} id record identifier
     * @returns {number} number of records deleted (truthy/falsy)
     */
    async deleteFkey(id) {
        const result = await this.client.query(`DELETE FROM "${this.tableName}" WHERE artwork_id = $1`, [id]);

        return !!result.rowCount;
    }
}
