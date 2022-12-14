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
}
