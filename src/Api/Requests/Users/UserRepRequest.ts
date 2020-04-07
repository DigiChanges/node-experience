import * as express from "express";
import UserRepPayload from "../../../Payloads/Users/UserRepPayload";
import {body} from "express-validator";

class UserRepRequest implements UserRepPayload
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

    static validate()
    {
        return [
            body('email')
                .exists().withMessage('Email must exist')
                .isString().withMessage('Email must be of type string'),
            body('password')
                .exists().withMessage('Password must exist')
                .isString().withMessage('Password must be of type string')
                .custom((value, { req }) => value === req.body.passwordConfirmation).withMessage("Password don't match"),
            body('passwordConfirmation')
                .exists().withMessage('Password must exist')
                .isString().withMessage('Password must be of type string'),
            body('enable')
                .optional()
                .isBoolean().withMessage('Enable must be of type boolean')
        ];
    }
}

export default UserRepRequest