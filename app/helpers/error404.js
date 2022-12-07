// Generate a new class Error404 that extends Error class
export default class Error404 extends Error {
    constructor(message) {
        super(message);
        this.name = 'Error 404 - Ressource not found';
        // Add property "status" to error 404 class to provide response status to client
        this.status = 404;
    }
}
