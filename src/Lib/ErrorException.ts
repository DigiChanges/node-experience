
class ErrorException extends Error {

    private statusCode: number;

    constructor(statusCode: number, message: string) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

export default ErrorException;
