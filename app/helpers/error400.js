// Generate a new class Error400 that extends Error class
export default class Error400 extends Error {
    constructor(message) {
        super(message);
        this.name = 'Error 400 - Bad request';
        // Add property "status" to Error400 class to provide response status to client
        this.status = 400;
    }
}
