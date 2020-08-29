import * as express from "express";
import RoleRepPayload from "../../../../InterfaceAdapters/Payloads/Roles/RoleRepPayload";
import {body} from "express-validator";

class RoleRepRequest implements RoleRepPayload
{
    private request: express.Request;

    constructor(request: express.Request)
    {
        this.request = request;
    }

    name(): string
    {
        return this.request.body.name;
    }

    slug(): string
    {
        return this.request.body.slug;
    }

    permissions(): string[]
    {
        return this.request.body.permissions;
    }

    enable(): boolean
    {
        return this.request.body.hasOwnProperty('enable') ? this.request.body.enable : true;
    }

    static validate()
    {
        return [
            body('name')
                .exists().withMessage('name must exist')
                .isString().withMessage('name must be of type string'),
            body('slug')
                .exists().withMessage('slug must exist')
                .isString().withMessage('slug must be of type string'),
            body('enable')
                .optional()
                .isBoolean().withMessage('enable must be of type boolean'),
            body('permissions')
                .optional()
                .isArray().withMessage('permissions must be of type array')
        ];
    }
}

export default RoleRepRequest