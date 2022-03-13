import { ParameterizedContext, Next } from 'koa';
import Logger from '../../../../Shared/Logger/Logger';

const LoggerMiddleware = async(ctx: ParameterizedContext, next: Next) =>
{
    Logger.debug(`${ctx.status} ${ctx.method}: ${ctx.path} - ${ctx.ip}`);
    await next();
};

export default LoggerMiddleware;
