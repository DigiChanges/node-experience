import {NextFunction, Response} from 'express';
import Config from 'config';


import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';
import ForbiddenHttpException from '../Exceptions/ForbiddenHttpException';
import IAuthService from '../../InterfaceAdapters/IAuthService';
import {SERVICES} from '../../../services';
import ContainerFactory from '../../../Shared/Factories/ContainerFactory';

const AuthorizeMiddleware = (...handlerPermissions: any) =>
{
    return async(req: any, response: Response, next: NextFunction) =>
    {
        try
        {
            const authService =  ContainerFactory.create<IAuthService>(SERVICES.IAuthService);

            const handlerPermission = handlerPermissions[0]; // TODO: Refactor for more permissions for handler
            let isAllowed: boolean = Config.get('auth.authorization') !== 'true';
            const authUser = req.authUser as IUserDomain;

            const authorize = await authService.authorize(authUser, handlerPermission);

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
