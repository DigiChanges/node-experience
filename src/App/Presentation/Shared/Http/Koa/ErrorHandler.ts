import { Context } from 'koa';
import Responder from './Responder';
import ErrorHttpException from '../../ErrorHttpException';
import Logger from '../../../../../Shared/Logger/Logger';
import ExceptionFactory from '../../ExceptionFactory';

export class ErrorHandler
{
    static async handle(ctx: Context, next: () => Promise<any>)
    {
        try
        {
            await next();
        }
        catch (err)
        {
            const responder = new Responder();
            const exception: ErrorHttpException = ExceptionFactory.getException(err);

            if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test')
            {
                Logger.trace(err.stack);
            }

            responder.error(exception, ctx, exception.statusCode);
        }
    }
}
