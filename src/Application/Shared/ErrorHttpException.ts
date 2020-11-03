import IStatusCode from "../../InterfaceAdapters/IPresentation/IStatusCode";

class ErrorHttpException extends Error
{
    private readonly _statusCode: IStatusCode;

    constructor(statusCode: IStatusCode, message: string)
    {
        super();
        this._statusCode = statusCode;
        this.message = message;
    }

    public get statusCode() : IStatusCode
    {
        return this._statusCode;
    }
}

export default ErrorHttpException;
