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

    firstName(): string {
        return this.request.body.firstName;
    }

    lastName(): string {
        return this.request.body.lastName;
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

    confirmationToken(): null {
        return null;
    }

    passwordRequestedAt(): null {
        return null;
    }

    roles(): null {
        return null;
    }

    permissions(): null {
        return null;
    }

    isSuperAdmin(): boolean {
        return false;
    }

    static validate()
    {
        return [
            body('firstName')
                .exists().withMessage('firstName must exist')
                .isString().withMessage('firstName must be of type string'),
            body('lastName')
                .exists().withMessage('lastName must exist')
                .isString().withMessage('lastName must be of type string'),
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