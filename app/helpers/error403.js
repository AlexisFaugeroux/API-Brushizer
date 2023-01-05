// Generate a new class Error403 that extends Error class
export default class Error403 extends Error {
    constructor(message) {
        super(message);
        this.name = 'Error 403 - Forbidden';
        // Add property "status" to Error403 class to provide response status to client
        this.status = 403;
    }
}
