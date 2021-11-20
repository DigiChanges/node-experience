import Koa from 'koa';
import AuthService from '../../../Domain/Services/AuthService';

const AuthenticationMiddleware = async(ctx: Koa.ParameterizedContext, next: Koa.Next) =>
{
    const authService =  new AuthService();

    const existMethodAndUrl = authService.checkWhitelist(ctx.method, ctx.path);

    if (!existMethodAndUrl)
    {
        const token = ctx.get('Authorization');

        ctx.tokenDecode = authService.validateToken(token);

        ctx.authUser = await authService.getByEmail(ctx.tokenDecode.email);
    }

    await next();
};

export default AuthenticationMiddleware;
