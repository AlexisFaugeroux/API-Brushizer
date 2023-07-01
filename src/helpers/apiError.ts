export default class ApiError extends Error {
    status;
    error;
    constructor(message: string, error?: {}) {
        super(message);
        this.name = 'ApiError';
        this.status = 400;
        this.error = error;
    }
}
