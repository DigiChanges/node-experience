import IStatusCode from "../../InterfaceAdapters/IPresentation/IStatusCode";
import {ValidationError} from "class-validator";

class ErrorHttpException extends Error
{
    private readonly _statusCode: IStatusCode;
    private readonly _errors: ValidationError[];

    constructor(statusCode: IStatusCode, message: string, errors: ValidationError[])
    {
        super();
        this._statusCode = statusCode;
        this._errors = errors;
        this.message = message;
    }

    public get statusCode() : IStatusCode
    {
        return this._statusCode;
    }

    public get errors() : ValidationError[]
    {
        return this._errors;
    }
}

export default ErrorHttpException;
