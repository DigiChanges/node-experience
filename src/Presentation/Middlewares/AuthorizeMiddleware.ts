import {NextFunction, Request, Response} from 'express';

import AuthService from "../../Application/Services/AuthService";

import IRoleRepository from "../../InterfaceAdapters/IRepositories/IRoleRepository";
import IUserRepository from "../../InterfaceAdapters/IRepositories/IUserRepository";
import UserRepoFactory from "../../Infrastructure/Factories/UserRepoFactory";
import RoleRepoFactory from "../../Infrastructure/Factories/RoleRepoFactory";
import Roles from "../../../config/Roles";
import IUserDomain from "../../InterfaceAdapters/IDomain/IUserDomain";
import IRoleDomain from "../../InterfaceAdapters/IDomain/IRoleDomain";

// TODO: Refactor. 1. Remove hardcording of repositories and set logic with isAllowed to disable authorization
const AuthorizeMiddleware = (...handlerPermissions: any) =>
{
    return async (req: Request, response: Response, next: NextFunction) =>
    {
        const authService = new AuthService();

        let handlerPermission = handlerPermissions[0]; // TODO: Refactor for more permissions for handler
        let rolesPermissions: any = [];
        let isAllowed: any = process.env.AUTHORIZATION;
        let token = req.get('Authorization');
        let tokentDecode = await authService.decodeToken(token);

        let userRepository: IUserRepository = UserRepoFactory.create();
        let roleRepository: IRoleRepository = RoleRepoFactory.create();

        let user: IUserDomain = await userRepository.getOneByEmail(tokentDecode.email);

        const count = (typeof user.roles === 'undefined') ? 0 : user.roles.length;

        for (let i = 0; i < count; i++)
        {
            const role: IRoleDomain = await roleRepository.getOne(user.roles[i]);

            if (role.slug === Roles.ADMIN.toLocaleLowerCase() || role.slug === Roles.SUPER_ADMIN.toLocaleLowerCase())
            {
                isAllowed = true; // Refactoring
            }

            if (role.permissions) {
                role.permissions.map( (rolePermission: string) => rolesPermissions.push(rolePermission));
            }
        }

        let totalPermissions = [...new Set(rolesPermissions)];

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