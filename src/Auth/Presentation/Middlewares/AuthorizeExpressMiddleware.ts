import { SERVICES } from '../../../Config/Injects';
import { NextFunction, Response } from 'express';
import MainConfig from '../../../Config/MainConfig';

import IUserDomain from '../../Domain/Entities/IUserDomain';
import ForbiddenHttpException from '../Exceptions/ForbiddenHttpException';
import AuthService from '../../Domain/Services/AuthService';
import { DependencyContainer } from 'tsyringe';

const AuthorizeExpressMiddleware = (...handlerPermissions: string[]) =>
{
    return async(req: any, response: Response, next: NextFunction) =>
    {
        try
        {
            const container: DependencyContainer = req.container;
            const authService = container.resolve<AuthService>(SERVICES.AuthService);
            const { authorization } = MainConfig.getInstance().getConfig().auth;

            let isAllowed = !authorization;
            const authUser = req.authUser as IUserDomain;

            const authorize = await authService.authorize(authUser, handlerPermissions);

            if (authorize)
            {
                isAllowed = true;
            }

            if (isAllowed)
            {
                next();
            }
            else
            {
                throw new ForbiddenHttpException();
            }
        }
        catch (err)
        {
            next(err);
        }
    };
};

export default AuthorizeExpressMiddleware;
