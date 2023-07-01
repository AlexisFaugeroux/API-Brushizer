export default class Error401 extends Error {
    status;
    constructor(message: string) {
        super(message);
        this.name = 'Error 401 - Unauthorized';
        this.status = 401;
    }
}
