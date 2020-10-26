
class ErrorException extends Error
{
    constructor(message: string, name = ErrorException.name)
    {
        super();
        this.message = message;
        this.name = name;
    }
}

export default ErrorException;
