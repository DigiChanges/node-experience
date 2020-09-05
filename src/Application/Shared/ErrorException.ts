import IStatusCode from "../../InterfaceAdapters/IPresentation/IStatusCode";

class ErrorException extends Error
{
    private statusCode: IStatusCode;

    constructor(statusCode: IStatusCode, message: string)
    {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

export default ErrorException;
