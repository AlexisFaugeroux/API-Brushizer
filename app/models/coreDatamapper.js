// This is the module where all CRUD methods are defined to handle data in the database tables
export default class CoreDatamapper {
    tableName;

    // Get database client passed to the models
    constructor(client) {
        this.client = client;
    }

    /**
     * Get a record by identifier
     * @param {number} id identifier
     * @returns {object} record
     */
    async findByPk(id) {
        const preparedQuery = {
            text: `SELECT * FROM "${this.tableName}" WHERE id = $1`,
            values: [id],
        };

        const result = await this.client.query(preparedQuery);

        if (!result.rows[0]) {
            return null;
        }

        return result.rows[0];
    }

    /**
     * Get all records from a table or a list of records based on parameters
     * Example : model.findAll({
     *      $where:
     *          {
     *              $or: [
     *                  {name: '#001', artist_name = 'Mezange'}
     *                  {name: 'La Gioconda', artist_name = 'Da Vinci'}
     *              ]
     *          }
     * })
     * @param {object} params
     * @returns {object[]} list of records
     */
    async findAll(params) {
        let filter = '';
        const values = [];

        if (params?.$where) {
            const filters = [];
            let indexPlaceholder = 1;

            Object.entries(params.$where).forEach(([param, value]) => {
                if (param === '$or') {
                    const filtersOr = [];
                    Object.entries(value).forEach(([key, val]) => {
                        filtersOr.push(`${key} = $${indexPlaceholder}`);
                        values.push(val);
                        indexPlaceholder += 1;
                    });
                    filters.push(`${filtersOr.join(' OR ')}`);
                } else {
                    filters.push(`${param} = $${indexPlaceholder}`);
                    values.push(value);
                    indexPlaceholder += 1;
                }
            });
            filter = `WHERE ${filters.join(' AND ')}`;
        }

        const result = await this.client.query(
            `
            SELECT * FROM "${this.tableName}" ${filter};
            `,
            values,
        );

        return result.rows;
    }
}
