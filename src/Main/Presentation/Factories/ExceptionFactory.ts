import { ErrorHttpException } from '@digichanges/shared-experience';
import TokenExpiredHttpException from '../../../Auth/Presentation/Exceptions/TokenExpiredHttpException';
import DuplicateEntityHttpException from '../Exceptions/DuplicateEntityHttpException';
import exceptions from '../../../exceptions';
import MainConfig from '../../../Config/MainConfig';

const config = MainConfig.getInstance().getConfig().statusCode;

class ExceptionFactory
{
    private static exceptionsMapper = {
        ...exceptions,
        Error: config['HTTP_INTERNAL_SERVER_ERROR'],
        TypeError: config['HTTP_INTERNAL_SERVER_ERROR'],
        [ErrorHttpException.name]: config['HTTP_INTERNAL_SERVER_ERROR']
    };

    public static getException(err: any): ErrorHttpException
    {
        const statusCode = ExceptionFactory.exceptionsMapper[err?.name] ?? config['HTTP_INTERNAL_SERVER_ERROR'];

        let exception = new ErrorHttpException();

        exception.message = err?.message;
        exception.errorCode = err?.errorCode;
        exception.metadata = err?.metadata ?? {};
        exception.statusCode = err?.statusCode ?? statusCode;
        exception.errors = err?.errors ?? [];

        // TODO: Remove ifs
        if (err instanceof Error && err.message === 'Token expired')
        {
            exception = new TokenExpiredHttpException();
        }
        else if (err?.name === 'MongoServerError')
        {
            if (err.code === 11000)
            {
                exception = new DuplicateEntityHttpException();
            }
        }
        else if (err?.name === 'UniqueConstraintViolationException')
        {
            exception = new DuplicateEntityHttpException();
        }
        else if (err?.name === 'ValidatorSchemaError')
        {
            exception.errors = err.metadata.issues;
            exception.metadata = null;
            exception.statusCode = config['HTTP_UNPROCESSABLE_ENTITY'];
        }

        return exception;
    }
}

export default ExceptionFactory;
