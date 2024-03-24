import { ErrorHttpException } from '../Exceptions/ErrorHttpException';
import { StatusCode } from './StatusCode';

export class FormatError
{
    getFormat = (errorHttpException: ErrorHttpException): any =>
    {
        const { statusCode, message, errors, metadata, errorCode } = errorHttpException;

        return {
            message: statusCode.code === StatusCode.HTTP_INTERNAL_SERVER_ERROR.code ? 'Internal Error Server' : message,
            errorCode,
            errors,
            metadata
        };
    };
}
