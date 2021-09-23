import { ValidationError } from 'class-validator';
import { IStatusCode } from '@digichanges/shared-experience';

class ErrorHttpException extends Error
{
    private _statusCode: IStatusCode;
    private _errors: ValidationError[];
    private _metadata: Record<string, any>;

    constructor(statusCode: IStatusCode, message: string, errors: ValidationError[], metadata: Record<string, any> = {})
    {
        super();
        this._statusCode = statusCode;
        this._errors = errors;
        this.message = message;
        this._metadata = metadata;
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

    public get metadata() : Record<string, any>
    {
        return this._metadata;
    }

    public set metadata(metadata: Record<string, any>)
    {
        this._metadata = metadata;
    }
}

export default ErrorHttpException;
