/**
 * Validation middleware factory
 * @param {string} dataSource - Middleware request property name that contains data to validate
 * @param {Joi.object} schema - Joi schema
 * @returns {object} Middleware function
 */
export default (dataSource, schema) => async (req, _, next) => {
    try {
        await schema.validateAsync(req[dataSource]);
        next();
    } catch (err) {
        next(err);
    }
};
