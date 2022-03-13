import { NextFunction, Response } from 'express';
import MainConfig from '../../../../Config/mainConfig';

import IUserDomain from '../../../../User/Domain/Entities/IUserDomain';
import ForbiddenHttpException from '../../Exceptions/ForbiddenHttpException';
import AuthService from '../../../Domain/Services/AuthService';

const AuthorizeMiddleware = (...handlerPermissions: string[]) =>
{
    return async(req: any, response: Response, next: NextFunction) =>
    {
        try
        {
            const authService = new AuthService();
            const { authorization } = MainConfig.getInstance().getConfig().auth;

            let isAllowed: boolean = authorization !== true;
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

export default AuthorizeMiddleware;
