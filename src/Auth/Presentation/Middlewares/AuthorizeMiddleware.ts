import {NextFunction, Response} from 'express';
import Config from 'config';

import AuthService from '../../Services/AuthService';

import IUserRepository from '../../../User/InterfaceAdapters/IUserRepository';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';
import ForbiddenHttpException from '../Exceptions/ForbiddenHttpException';
import ContainerFactory from '../../../Shared/Decorators/ContainerFactory';
import {REPOSITORIES} from '../../../repositories';

const AuthorizeMiddleware = (...handlerPermissions: any) =>
{
    return async(req: any, response: Response, next: NextFunction) =>
    {
        try
        {
            const authService = new AuthService();

            const handlerPermission = handlerPermissions[0]; // TODO: Refactor for more permissions for handler
            let isAllowed: boolean = Config.get('auth.authorization') !== 'true';
            const tokenDecode = req.tokenDecode;

            const userRepository: IUserRepository = ContainerFactory.create<IUserRepository>(REPOSITORIES.IUserRepository);

            const user: IUserDomain = await userRepository.getOneByEmail(tokenDecode.email);

            if (user.isSuperAdmin)
            {
                isAllowed = true;
            }

            const totalPermissions = authService.getPermissions(user);

            totalPermissions.forEach((permission: string) =>
            {
                if (permission === handlerPermission)
                {
                    isAllowed = true;
                }
            });

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
