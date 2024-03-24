import IErrorMessage from './IErrorMessage';

export class ErrorException extends Error
{
    public metadata: Record<string, any>;
    public errorCode: string | null;

    constructor(errorMessage: IErrorMessage, name = ErrorException.name, metadata: Record<string, any> = {})
    {
        super();
        this.message = errorMessage.message;
        this.errorCode = errorMessage?.errorCode ?? null;
        this.name = name;
        this.metadata = metadata;
    }
}
