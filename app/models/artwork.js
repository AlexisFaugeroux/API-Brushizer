import CoreDatamapper from './coreDatamapper.js';

export default class Artwork extends CoreDatamapper {
    tableName = 'artwork';

    /**
     * Check if artwork exists in DB based on provided image name (fields with unique constraint)
     * @param {object} inputData - Data provided by the client
     * @param {number} artworkId - artwork identifier (optionnal)
     * @returns - Exisiting artwork or undefined if no artwork was found
     */
    async isUnique(inputData, id) {
        const fields = [];
        const values = [];
        let placeHolder = 1;

        Object.entries(inputData).forEach(([key, value]) => {
            // Checking for fields with unique constraint
            if (['image'].includes(key)) {
                // Generate filter
                fields.push(`"${key}" = $${placeHolder}`);
                placeHolder += 1;
                values.push(value);
            }
        });
        const preparedQuery = {
            text: `SELECT * FROM "${this.tableName}" WHERE (${fields.join(' OR ')})`,
            values,
        };

        // If id is provided, matching record is excluded
        if (id) {
            preparedQuery.text += ` AND id <> $${values.length + 1}`;
            preparedQuery.values.push(id);
        }
        const result = await this.client.query(preparedQuery);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    }

    /**
     * Delete user foreign key in table
     * @param {number} id user identifier
     * @returns {number} number of records deleted (truthy/falsy)
     */
    async deleteUserFkeyRecords(id) {
        const result = await this.client.query(`DELETE FROM "${this.tableName}" WHERE "user_id" = $1`, [id]);

        return !!result.rowCount;
    }

    /**
     * Delete collection foreign key in table
     * @param {number} id collection identifier
     * @returns {number} number of records deleted (truthy/falsy)
     */
    async deleteCollectionFkey(id) {
        const result = await this.client.query(`DELETE FROM "${this.tableName}" WHERE "collection_id" = $1`, [id]);

        return !!result.rowCount;
    }
}
