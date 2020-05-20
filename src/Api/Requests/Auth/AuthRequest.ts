import * as express from "express";
import {body} from "express-validator";
import AuthPayload from "../../../Payloads/Auth/AuthPayload";
import Config from "config";

class AuthRequest implements AuthPayload
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

    static validate()
    {
        return [
            body('email')
                .exists().withMessage('email must exist')
                .isEmail().withMessage('email must be a valid email'),
            body('password')
                .exists().withMessage('password must exist')
                .isLength({ min: Config.get('validationSettings.password.min'), max: Config.get('validationSettings.password.max') }).withMessage("password can\'t be empty")
                .isString().withMessage('password must be of type string')
        ];
    }
}

export default AuthRequest