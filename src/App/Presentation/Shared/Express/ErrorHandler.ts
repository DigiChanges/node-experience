import Responder from './Responder';
import FormatError from '../FormatError';
import { ErrorExceptionMapper } from '../ErrorExceptionMapper';
import ErrorHttpException from '../ErrorHttpException';
import Logger from '../../../../Shared/Logger/Logger';

export class ErrorHandler
{
    static handle(err: any, req: any, res: any, next: any)
    {
        const responder = new Responder();
        const formatError = new FormatError();

        const exception: ErrorHttpException = ErrorExceptionMapper.handle(err);

        if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test')
        {
            Logger.debug(err.stack);
        }

        responder.error(formatError.getFormat(exception), req, res, exception.statusCode, exception.metadata);
    }
}
