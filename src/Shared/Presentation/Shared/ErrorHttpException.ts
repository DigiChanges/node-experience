import IHttpStatusCode from '../../Application/IHttpStatusCode';
import StatusCode from '../../Application/StatusCode';
import IErrorMessage from './IErrorMessage';

class ErrorHttpException extends Error
{
    private _statusCode: IHttpStatusCode;
    private _errors: any[];
    private _metadata: Record<string, any>;
    private _errorCode: string | null;

    constructor(statusCode: IHttpStatusCode = StatusCode.HTTP_INTERNAL_SERVER_ERROR, errorMessage: IErrorMessage  = { message: 'Internal Error' }, errors: any[] = [],  metadata: Record<string, any> = {})
    {
        super();
        this._statusCode = statusCode;
        this._errors = errors;
        this.message = errorMessage?.message;
        this._errorCode = errorMessage?.errorCode ?? null;
        this._metadata = metadata;
    }

    public get statusCode(): IHttpStatusCode
    {
        return this._statusCode;
    }

    public set statusCode(value: IHttpStatusCode)
    {
        this._statusCode = value;
    }

    public get errors(): any[]
    {
        return this._errors;
    }

    public set errors(err: any[])
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

    public get errorCode(): string | null
    {
        return this._errorCode;
    }

    public set errorCode(errorKey: string | null)
    {
        this._errorCode = errorKey;
    }
}

export default ErrorHttpException;
