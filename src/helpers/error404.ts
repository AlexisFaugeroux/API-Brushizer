// Generate a new class Error404 that extends Error class
export default class Error404 extends Error {
    status;
    constructor(message: string) {
        super(message);
        this.name = 'Error 404 - Ressource not found';
        this.status = 404;
    }
}
