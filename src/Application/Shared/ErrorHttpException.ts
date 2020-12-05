import IStatusCode from "../../InterfaceAdapters/IPresentation/IStatusCode";
import {ValidationError} from "class-validator";

class ErrorHttpException extends Error
{
    private _statusCode: IStatusCode;
    private _errors: ValidationError[];

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

    public set statusCode(value: IStatusCode)
    {
        this._statusCode = value;
    }

    public get errors() : ValidationError[]
    {
        return this._errors;
    }

    public set errors(err: ValidationError[])
    {
        this._errors = err;
    }
}

export default ErrorHttpException;
