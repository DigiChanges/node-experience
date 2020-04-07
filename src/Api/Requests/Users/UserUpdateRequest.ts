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

    password(): string
    {
        return this.request.body.password;
    }

    passwordConfirmation(): string
    {
        return this.request.body.passwordConfirmation;
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
            body('password')
                .exists().withMessage('Type must exist')
                .isString().withMessage('Type must be of type integer'),
            body('enable')
                .optional()
                .isBoolean().withMessage('Enable must be of type boolean'),
            param('id')
                .exists().withMessage('ID mus exist')
                .isUUID().withMessage('Id must UUID type')
        ];
    }
}

export default UserUpdateRequest