import Koa from 'koa';
import MainConfig from '../../../Config/MainConfig';
import { SERVICES } from '../../../Config/Injects';

import IUserDomain from '../../Domain/Entities/IUserDomain';
import ForbiddenHttpException from '../Exceptions/ForbiddenHttpException';
import AuthService from '../../Domain/Services/AuthService';
import { DependencyContainer } from 'tsyringe';

const AuthorizeKoaMiddleware = (...handlerPermissions: string[]) =>
{
    return async(ctx: Koa.ParameterizedContext, next: Koa.Next) =>
    {
        const container: DependencyContainer = ctx.container;
        const authService: AuthService = container.resolve<AuthService>(SERVICES.AuthService);
        const config = MainConfig.getInstance().getConfig();

        let isAllowed = !config.auth.authorization;

        const authUser = ctx.authUser as IUserDomain;

        const authorize = await authService.authorize(authUser, handlerPermissions);

        if (authorize)
        {
            isAllowed = true;
        }

        if (isAllowed)
        {
            await next();
        }
        else
        {
            throw new ForbiddenHttpException();
        }
    };
};

export default AuthorizeKoaMiddleware;
