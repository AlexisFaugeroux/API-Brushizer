export default class Error400 extends Error {
    status;
    constructor(message: string) {
        super(message);
        this.name = 'Error 400 - Bad request';
        this.status = 400;
    }
}
