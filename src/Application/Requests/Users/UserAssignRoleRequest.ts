import * as express from "express";
import {body, param} from "express-validator";
import UserAssignRolePayload from "../../../InterfaceAdapters/Payloads/Users/UserAssignRolePayload";
import IRoleRepository from "../../../InterfaceAdapters/IRepositories/IRoleRepository";
import RoleMongoRepository from "../../../Infrastructure/Repositories/RoleMongoRepository";

class UserAssignRoleRequest implements UserAssignRolePayload
{
    private request: express.Request;
    private repository: IRoleRepository;

    constructor(request: express.Request)
    {
        this.request = request;
        this.repository = new RoleMongoRepository();
    }

    async rolesId(): Promise<string[]>
    {
        await this.repository.exists(this.request.body.rolesId);

        return this.request.body.rolesId;
    }

    id(): string
    {
        return this.request.params.id;
    }

    static validate()
    {
        return [
            body('rolesId')
                .exists().withMessage('rolesId must exist')
                .isArray().withMessage('rolesId must be of type array'),
            body('rolesId.*')
                .isLength({ min: 24, max:24 }),
            param('id')
                .exists().withMessage('id must exist')
                .isLength({ min: 24, max:24 })
                .isString().withMessage('id must be of type string')
        ];
    }
}

export default UserAssignRoleRequest