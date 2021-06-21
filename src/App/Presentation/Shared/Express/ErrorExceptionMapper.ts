import ExceptionFactory from './ExceptionFactory';

export class ErrorExceptionMapper
{
    static handle(err: any)
    {
        const exceptionFactory = new ExceptionFactory();

        return exceptionFactory.getException(err);
    }
}
