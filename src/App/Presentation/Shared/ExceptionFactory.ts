import ErrorHttpException from './ErrorHttpException';
import TokenExpiredHttpException from '../../../Auth/Presentation/Exceptions/TokenExpiredHttpException';
import DuplicateEntityHttpException from '../Exceptions/DuplicateEntityHttpException';
import { StatusCode } from '@digichanges/shared-experience';
import exceptions from '../../../exceptions';

class ExceptionFactory
{
    private exceptionsMapper: any = {
        ...exceptions,
        Error: new ErrorHttpException(StatusCode.HTTP_INTERNAL_SERVER_ERROR, { message: 'Internal Error' }),
        TypeError: new ErrorHttpException(StatusCode.HTTP_INTERNAL_SERVER_ERROR, { message: 'Internal Error' }),
        ErrorHttpException: new ErrorHttpException(StatusCode.HTTP_INTERNAL_SERVER_ERROR, { message: 'Internal Error' })
    };

    public getException(err: any): ErrorHttpException
    {
        let exception = this.exceptionsMapper[err?.name || 'Error'] as ErrorHttpException;

        const message = err?.message || exception?.message;
        const errorCode = err?.errorCode || exception?.errorCode;
        const metadata = err?.metadata || exception?.metadata;

        if (err instanceof Error && err.message === 'Token expired')
        {
            exception = new TokenExpiredHttpException();
        }
        else if (err?.name === 'MongoError')
        {
            if (err.code === 11000)
            {
                exception = new DuplicateEntityHttpException();
            }
        }
        else if (err instanceof ErrorHttpException)
        {
            exception.statusCode = err.statusCode;
            exception.message = err.message;
            exception.errors = err.errors;
        }
        else if (!exception)
        {
            exception = this.exceptionsMapper.ErrorHttpException;
        }

        exception.message = message;
        exception.metadata = metadata;
        exception.errorCode = errorCode;

        return exception;
    }
}

export default ExceptionFactory;
