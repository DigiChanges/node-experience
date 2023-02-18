import { Context } from 'koa';
import KoaResponder from './KoaResponder';
import ErrorHttpException from '../../Presentation/Shared/ErrorHttpException';
import ExceptionFactory from '../../Presentation/Shared/ExceptionFactory';
import Logger from '../Logger/Logger';

export class ErrorKoaHandler
{
    static async handle(ctx: Context, next: () => Promise<any>)
    {
        try
        {
            await next();
        }
        catch (err: any)
        {
            const responder = new KoaResponder();
            const exception: ErrorHttpException = ExceptionFactory.getException(err);

            if (process.env.NODE_ENV !== 'test')
            {
                await Logger.error(err.stack);
            }

            responder.error(exception, ctx, exception.statusCode, exception.metadata);
        }
    }
}
