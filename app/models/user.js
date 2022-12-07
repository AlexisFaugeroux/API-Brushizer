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
}
