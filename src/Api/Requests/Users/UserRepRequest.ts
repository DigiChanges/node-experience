import * as express from "express";
import UserRepPayload from "../../../Payloads/Users/UserRepPayload";
import {body} from "express-validator";

class UserRepRequest implements UserRepPayload {

    private request: express.Request;

    constructor(request: express.Request) {
        this.request = request;
    }

    email(): string {
        return this.request.body.email;
    }

    password(): string {
        return this.request.body.password;
    }

    enable(): boolean {
        return this.request.body.hasOwnProperty('enable') ? this.request.body.enable : true;
    }

    static validate() {
        return [
            body('email')
                .exists().withMessage('Email must exist')
                .isString().withMessage('Name must be of type string'),
            body('password')
                .exists().withMessage('Type must exist')
                .isString().withMessage('Type must be of type integer'),
            body('enable')
                .optional()
                .isBoolean().withMessage('Enable must be of type boolean')
        ];
    }
}

export default UserRepRequest