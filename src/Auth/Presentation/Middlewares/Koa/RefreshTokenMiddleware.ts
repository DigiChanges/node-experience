import Koa from 'koa';
import KeepAliveUseCase from '../../../Domain/UseCases/KeepAliveUseCase';


const RefreshTokenMiddleware = async(ctx: Koa.ParameterizedContext, next: Koa.Next) =>
{
    try
    {
        const email = ctx?.tokenDecode ? ctx.tokenDecode.email : null;
        const id = ctx?.tokenDecode ? ctx.tokenDecode.id : null;

        if (id && email)
        {
            const keepAliveUseCase = new KeepAliveUseCase();
            const payload = await keepAliveUseCase.handle({ getEmail: () => email, getTokenId: () => id });

            ctx.refreshToken = payload.getHash();
        }

        await next();
    }
    catch (error)
    {
        await next();
        return error;
    }
};

export default RefreshTokenMiddleware;
