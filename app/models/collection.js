import CoreDatamapper from './coreDatamapper.js';

export default class Collection extends CoreDatamapper {
    tableName = 'collection';

    /**
     * Delete user foreign key in table
     * @param {number} id user identifier
     * @returns {number} number of records deleted (truthy/falsy)
     */
    async deleteUserFkeyRecords(id) {
        const result = await this.client.query(`DELETE FROM "${this.tableName}" WHERE "user_id" = $1`, [id]);

        return !!result.rowCount;
    }
}
