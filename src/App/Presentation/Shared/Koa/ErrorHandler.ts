import { Context } from 'koa';
import Responder from './Responder';
import { ErrorExceptionMapper } from '../ErrorExceptionMapper';
import ErrorHttpException from '../ErrorHttpException';

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
            const exception: ErrorHttpException = ErrorExceptionMapper.handle(err);

            responder.error(exception, ctx, exception.statusCode);
            ctx.app.emit('error', err, ctx);
        }
    }
}
