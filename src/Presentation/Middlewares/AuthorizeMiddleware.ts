import {NextFunction, Response} from 'express';
import Config from 'config';

import AuthService from "../../Application/Services/AuthService";

import IUserRepository from "../../InterfaceAdapters/IRepositories/IUserRepository";
import UserRepoFactory from "../../Infrastructure/Factories/UserRepoFactory";
import IUserDomain from "../../InterfaceAdapters/IDomain/IUserDomain";
import StatusCode from "../Shared/StatusCode";
import ErrorException from "../../Application/Shared/ErrorException";

const AuthorizeMiddleware = (...handlerPermissions: any) =>
{
    return async (req: any, response: Response, next: NextFunction) =>
    {
        const authService = new AuthService();

        let handlerPermission = handlerPermissions[0]; // TODO: Refactor for more permissions for handler
        let isAllowed: boolean = Config.get('auth.authorization') !== 'true';
        let tokentDecode = req.tokenDecode;

        let userRepository: IUserRepository = UserRepoFactory.create();

        let user: IUserDomain = await userRepository.getOneByEmail(tokentDecode.email);

        if (user.isSuperAdmin)
        {
            isAllowed = true;
        }

        let totalPermissions = authService.getPermissions(user);

        totalPermissions.forEach( (permission: string) =>
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
            throw new ErrorException(StatusCode.HTTP_FORBIDDEN, "Forbidden");
        }
    }
};

export default AuthorizeMiddleware;