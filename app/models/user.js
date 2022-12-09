import CoreDatamapper from './coreDatamapper.js';

export default class User extends CoreDatamapper {
    tableName = 'user';

    /**
     * Get a record by pseudo
     * @param {string} pseudo pseudo
     * @returns {object} record
     */
    async findByPseudo(pseudo) {
        const preparedQuery = {
            text: `SELECT * FROM "${this.tableName}" WHERE lower(pseudo) = $1`,
            values: [pseudo],
        };

        const result = await this.client.query(preparedQuery);

        if (!result.rows[0]) {
            return null;
        }

        return result.rows[0];
    }

    /**
     * Check if user exists in DB based on provided email or pseudo (fields with unique constraint)
     * @param {object} inputData - Data provided by the client
     * @param {number} userId - User identifier (optionnal)
     * @returns - Exisiting user or undefined if no user was found
     */
    async isUnique(inputData, userId) {
        const fields = [];
        const values = [];
        let placeHolder = 1;

        Object.entries(inputData).forEach(([key, value]) => {
            // Checking for fields with unique constraint
            if (['email', 'pseudo'].includes(key)) {
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
        if (userId) {
            preparedQuery.text += ` AND id <> $${values.length + 1}`;
            preparedQuery.values.push(userId);
        }
        const result = await this.client.query(preparedQuery);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    }
}
