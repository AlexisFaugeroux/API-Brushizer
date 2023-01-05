// Error handling express middleware
import debug from 'debug';
import logger from '../helpers/logger.js';

const debugError = debug('ErrorHandler');

// eslint-disable-next-line no-unused-vars
export default (displayType) => (err, _, res, next) => {
    let status = 500;
    let { message } = err;

    // Joi returns Validation Error objects containing isJoi property (boolean)
    // if true, error comes from user input (bad request) so status must be 400
    if (err.isJoi) {
        status = 400;
    }

    if (err.status) {
        status = err.status;
    }

    if (status === 500) {
        debugError(message);
        message = 'Internal Server Error, please try again later';
        logger.error(err);
    }

    if (displayType === 'json') {
        debugError(err);
        res.status(status).json({ error: message });
    }
};
