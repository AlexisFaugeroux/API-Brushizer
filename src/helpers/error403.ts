// Generate a new class Error403 that extends Error class
export default class Error403 extends Error {
    status;
    constructor(message: string) {
        super(message);
        this.name = 'Error 403 - Forbidden';
        this.status = 403;
    }
}
