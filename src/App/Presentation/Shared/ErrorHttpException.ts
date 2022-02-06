import { IErrorMessage, IStatusCode, StatusCode } from '@digichanges/shared-experience';
import { ValidationError } from 'class-validator';

class ErrorHttpException extends Error
{
    private _statusCode: IStatusCode;
    private _errors: ValidationError[];
    private _metadata: Record<string, any>;
    private _errorCode: string;

    constructor(statusCode: IStatusCode = StatusCode.HTTP_INTERNAL_SERVER_ERROR, errorMessage: IErrorMessage  = { message: 'Internal Error' }, errors: ValidationError[] = [],  metadata: Record<string, any> = {})
    {
        super();
        this._statusCode = statusCode;
        this._errors = errors;
        this.message = errorMessage?.message;
        this._errorCode = errorMessage?.errorCode ?? null;
        this._metadata = metadata;
    }

    public get statusCode(): IStatusCode
    {
        return this._statusCode;
    }

    public set statusCode(value: IStatusCode)
    {
        this._statusCode = value;
    }

    public get errors(): ValidationError[]
    {
        return this._errors;
    }

    public set errors(err: ValidationError[])
    {
        this._errors = err;
    }

    public get metadata(): Record<string, any>
    {
        return this._metadata;
    }

    public set metadata(metadata: Record<string, any>)
    {
        this._metadata = metadata;
    }

    public get errorCode(): string
    {
        return this._errorCode;
    }

    public set errorCode(errorKey: string)
    {
        this._errorCode = errorKey;
    }
}

export default ErrorHttpException;
