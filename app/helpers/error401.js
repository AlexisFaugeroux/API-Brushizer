// Generate a new class Error401 that extends Error class
export default class Error401 extends Error {
    constructor(message) {
        super(message);
        this.name = 'Error 401 - Unauthorized';
        // Add property "status" to Error401 class to provide response status to client
        this.status = 401;
    }
}
