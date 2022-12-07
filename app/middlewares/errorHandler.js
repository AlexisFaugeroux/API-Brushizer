// Error handling express middleware

// eslint-disable-next-line no-unused-vars
export default (displayType) => (err, _, res, next) => {
    let status = 500;
    let { message } = err;

    // Joi returns Validation Error objects containing isJoi (boolean)
    // if true, error comes from user input (bad request) so status must be 400
    if (err.isJoi) {
        status = 400;
    }

    if (err.status) {
        status = err.status;
    }

    if (status === 500) {
        message = 'Internal Server Error, please try again later';
    }

    if (displayType === 'json') {
        res.status(status).json({ error: message });
    }
};
