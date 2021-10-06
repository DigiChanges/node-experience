import { NextFunction, Response } from 'express';
import Config from 'config';

import IUserDomain from '../../../../User/InterfaceAdapters/IUserDomain';
import ForbiddenHttpException from '../../Exceptions/ForbiddenHttpException';
import IAuthService from '../../../InterfaceAdapters/IAuthService';
import { SERVICES } from '../../../../services';
import ContainerFactory from '../../../../Shared/Factories/ContainerFactory';


const AuthorizeMiddleware = (...handlerPermissions: any) =>
{
    return async(req: any, response: Response, next: NextFunction) =>
    {
        try
        {
            const auth_service =  ContainerFactory.create<IAuthService>(SERVICES.IAuthService);

            const handler_permission = handlerPermissions[0]; // TODO: Refactor for more permissions for handler
            let is_allowed: boolean = Config.get('auth.authorization') !== 'true';
            const auth_user = req.authUser as IUserDomain;

            const authorize = await auth_service.authorize(auth_user, handler_permission);

            if (authorize)
            {
                is_allowed = true;
            }

            if (is_allowed)
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
