import IErrorMessage from '../../Domain/Errors/IErrorMessage';
import { IHttpStatusCode } from '../Application/IHttpStatusCode';
import { StatusCode } from '../Application/StatusCode';

interface ErrorHttpProps
{
    statusCode?: IHttpStatusCode;
    errorMessage?: IErrorMessage;
    errors?: any[];
    metadata?: Record<string, any>;
}

export class ErrorHttpException extends Error
{
    #_statusCode: IHttpStatusCode;
    #_errors: any[];
    #_metadata: Record<string, any>;
    #_errorCode: string | null;

    constructor(props?: ErrorHttpProps)
    {
        super();
        this.#_statusCode = props?.statusCode ?? StatusCode.HTTP_INTERNAL_SERVER_ERROR;
        this.#_errors = props?.errors ?? [];
        this.message = props?.errorMessage.message ?? 'Internal Error';
        this.#_errorCode = props?.errorMessage?.errorCode ?? null;
        this.#_metadata = props?.metadata ?? [];
    }

    public get statusCode(): IHttpStatusCode
    {
        return this.#_statusCode;
    }

    public set statusCode(value: IHttpStatusCode)
    {
        this.#_statusCode = value;
    }

    public get errors(): any[]
    {
        return this.#_errors;
    }

    public set errors(err: any[])
    {
        this.#_errors = err;
    }

    public get metadata(): Record<string, any>
    {
        return this.#_metadata;
    }

    public set metadata(metadata: Record<string, any>)
    {
        this.#_metadata = metadata;
    }

    public get errorCode(): string | null
    {
        return this.#_errorCode;
    }

    public set errorCode(errorKey: string | null)
    {
        this.#_errorCode = errorKey;
    }
}
