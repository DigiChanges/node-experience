import Koa from 'koa';
import MainConfig from '../../../Config/MainConfig';
import { SERVICES } from '../../../Config/Injects';

import { DependencyContainer } from 'tsyringe';
import AuthorizeService from '../../Domain/Services/AuthorizeService';
import AuthHelperService from '../../Domain/Services/AuthHelperService';

const AuthorizeKoaMiddleware = (...handlerPermissions: string[]) =>
{
    return async(ctx: Koa.ParameterizedContext, next: Koa.Next) =>
    {
        const container: DependencyContainer = ctx.container;

        const authorizationHeader = ctx.get('Authorization');
        const authorizeService: AuthorizeService = container.resolve<AuthorizeService>(SERVICES.AuthorizeService);
        const authHelperService = new AuthHelperService();
        const token = authHelperService.getToken(authorizationHeader);

        const config = MainConfig.getInstance().getConfig();

        const { authorization: hasActiveAuthorization } = config.auth;

        if (hasActiveAuthorization)
        {
            await authorizeService.authorize(token, handlerPermissions);
        }

        ctx.accessToken = token;
        ctx.authUser = await authorizeService.getAuthUser(token, hasActiveAuthorization);

        await next();
    };
};

export default AuthorizeKoaMiddleware;
