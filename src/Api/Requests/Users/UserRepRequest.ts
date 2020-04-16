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
                .exists().withMessage('email must exist')
                .isString().withMessage('email must be of type string'),
            body('password')
                .exists().withMessage('password must exist')
                .isString().withMessage('password must be of type string')
                .custom((value, { req }) => value === req.body.passwordConfirmation).withMessage("password don't match"),
            body('passwordConfirmation')
                .exists().withMessage('passwordConfirmation must exist')
                .isString().withMessage('passwordConfirmation must be of type string'),
            body('enable')
                .optional()
                .isBoolean().withMessage('enable must be of type boolean')
        ];
    }
}

export default UserRepRequest