import {NextFunction, Request, Response} from 'express';
import Config from 'config';

import AuthService from "../../Application/Services/AuthService";

import IUserRepository from "../../InterfaceAdapters/IRepositories/IUserRepository";
import UserRepoFactory from "../../Infrastructure/Factories/UserRepoFactory";
import Roles from "../../../config/Roles";
import IUserDomain from "../../InterfaceAdapters/IDomain/IUserDomain";

const AuthorizeMiddleware = (...handlerPermissions: any) =>
{
    return async (req: Request, response: Response, next: NextFunction) =>
    {
        const authService = new AuthService();

        let handlerPermission = handlerPermissions[0]; // TODO: Refactor for more permissions for handler
        // let rolesPermissions: any = [];
        let isAllowed: boolean = Config.get('auth.authorization') !== 'true';
        let token = req.get('Authorization');
        let tokentDecode = await authService.decodeToken(token);

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
            response.status(403).json({message: "Forbidden"});
        }
    }
};

export default AuthorizeMiddleware;