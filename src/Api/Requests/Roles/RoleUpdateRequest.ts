import * as express from "express";
import RoleUpdatePayload from "../../../Payloads/Roles/RoleUpdatePayload";
import {body, param} from "express-validator";

class RoleUpdateRequest implements RoleUpdatePayload
{
    private request: express.Request;

    constructor(request: express.Request)
    {
        this.request = request;
    }

    name(): string
    {
        return this.request.body.email;
    }

    slug(): string
    {
        return this.request.body.slug;
    }

    permissions(): []
    {
        return this.request.body.permissions;
    }

    enable(): boolean
    {
        return this.request.body.hasOwnProperty('enable') ? this.request.body.enable : true;
    }

    id(): string
    {
        return this.request.params.id;
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
                .isArray().withMessage('permissions must be of type array'),
            param('id')
                .exists().withMessage('id mus exist')
                .isLength({ min: 24, max:24 })
                .isString().withMessage('id must string type')
        ];
    }
}

export default RoleUpdateRequest