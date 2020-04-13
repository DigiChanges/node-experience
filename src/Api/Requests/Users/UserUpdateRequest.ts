import * as express from "express";
import UserUpdatePayload from "../../../Payloads/Users/UserUpdatePayload";
import {body, param} from "express-validator";

class UserUpdateRequest implements UserUpdatePayload
{
    private request: express.Request;

    constructor(request: express.Request)
    {
        this.request = request;
    }

    email(): string
    {
        return this.request.body.email;
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
            body('email')
                .exists().withMessage('Email must exist')
                .isString().withMessage('Name must be of type string'),
            body('enable')
                .optional()
                .isBoolean().withMessage('Enable must be of type boolean'),
            param('id')
                .exists().withMessage('ID mus exist')
                .isString().withMessage('Id must UUID type')
        ];
    }
}

export default UserUpdateRequest