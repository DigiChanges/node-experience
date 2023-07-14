import { ParameterizedContext, Next } from 'koa';
import Logger from '../../../Shared/Helpers/Logger';

const LoggerKoaMiddleware = async(ctx: ParameterizedContext, next: Next) =>
{
    void Logger.info(`${ctx.method}: ${ctx.path} - ${ctx.ip}`);
    await next();
};

export default LoggerKoaMiddleware;
