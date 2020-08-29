import * as express from "express";
import {body, param} from "express-validator";
import UserAssignRolePayload from "../../../../InterfaceAdapters/Payloads/Users/UserAssignRolePayload";

class UserAssignRoleRequest implements UserAssignRolePayload
{
    private request: express.Request;

    constructor(request: express.Request)
    {
        this.request = request;
    }

    rolesId(): string[]
    {
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
                .isUUID().withMessage('id must uuid type'),
            param('id')
                .exists().withMessage('id must exist')
                .isUUID().withMessage('id must uuid type')
        ];
    }
}

export default UserAssignRoleRequest