import Koa from 'koa';
import { mainConfig } from '../../../../Config/mainConfig';

import IUserDomain from '../../../../User/InterfaceAdapters/IUserDomain';
import ForbiddenHttpException from '../../Exceptions/ForbiddenHttpException';
import IAuthService from '../../../InterfaceAdapters/IAuthService';
import { SERVICES } from '../../../../services';
import ContainerFactory from '../../../../Shared/Factories/ContainerFactory';


const AuthorizeMiddleware = (...handlerPermissions: any) =>
{
    return async(ctx: Koa.ParameterizedContext, next: Koa.Next) =>
    {
        const authService =  ContainerFactory.create<IAuthService>(SERVICES.IAuthService);

        const handlerPermission = handlerPermissions[0]; // TODO: Refactor for more permissions for handler
        let isAllowed: boolean = mainConfig.auth.authorization !== true;
        const authUser = ctx.authUser as IUserDomain;

        const authorize = await authService.authorize(authUser, handlerPermission);

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

export default AuthorizeMiddleware;
