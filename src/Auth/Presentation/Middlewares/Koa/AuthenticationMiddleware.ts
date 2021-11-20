import IAuthService from '../../../InterfaceAdapters/IAuthService';
import { SERVICES } from '../../../../services';
import ContainerFactory from '../../../../Shared/Factories/ContainerFactory';
import Koa from 'koa';

const AuthenticationMiddleware = async(ctx: Koa.ParameterizedContext, next: Koa.Next) =>
{
    const authService =  ContainerFactory.create<IAuthService>(SERVICES.IAuthService);

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
