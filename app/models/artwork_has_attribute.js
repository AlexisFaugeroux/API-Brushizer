import CoreDatamapper from './coreDatamapper.js';

export default class ArtworkHasAttribute extends CoreDatamapper {
    tableName = 'artwork_has_attribute';

    /**
     * Delete several artworks foreign keys in table
     * @param {array} [id] list of record identifier
     * @returns {number} number of records deleted (truthy/falsy)
     */
    async deleteArtworksFkeysRecords(identifiers) {
        const placeHolders = [];
        let indexPlaceHolder = 1;

        identifiers.forEach(() => {
            placeHolders.push(`$${indexPlaceHolder}`);
            indexPlaceHolder += 1;
        });

        const preparedQuery = {
            text: `DELETE FROM "${this.tableName}" WHERE artwork_id IN (${placeHolders})`,
            values: identifiers,
        };

        const result = await this.client.query(preparedQuery);

        return !!result.rowCount;
    }

    /**
     * Delete one artwork foreign keys in table
     * @param {number} id record identifier
     * @returns {number} number of records deleted (truthy/falsy)
     */
    async deleteOneArtworkFkeyRecords(id) {
        const preparedQuery = {
            text: `DELETE FROM "${this.tableName}" WHERE artwork_id = $1`,
            values: [id],
        };

        const result = await this.client.query(preparedQuery);

        return !!result.rowCount;
    }
}
