import ExpressResponder from './ExpressResponder';
import ErrorHttpException from '../ErrorHttpException';
import Logger from '../../../../Shared/Logger/Logger';
import ExceptionFactory from '../ExceptionFactory';

export class ErrorExpressHandler
{
    static handle(err: any, req: any, res: any, next: any)
    {
        const responder = new ExpressResponder();
        const exception: ErrorHttpException = ExceptionFactory.getException(err);

        if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test')
        {
            Logger.trace(err.stack);
        }

        responder.error(exception, req, res, exception.statusCode, exception.metadata);
    }
}
