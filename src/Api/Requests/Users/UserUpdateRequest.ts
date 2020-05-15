import * as express from "express";
import UserUpdatePayload from "../../../Payloads/Users/UserUpdatePayload";
import {body, param} from "express-validator";
import AuthService from "../../../Services/AuthService";

class UserUpdateRequest implements UserUpdatePayload
{
    private request: express.Request;

    constructor(request: express.Request)
    {
        this.request = request;
    }

    firstName(): string
    {
        return this.request.body.firstName;
    }

    lastName(): string
    {
        return this.request.body.lastName;
    }

    email(): string
    {
        return this.request.body.email;
    }

    enable(): boolean
    {
        const userId = AuthService.getLoggedId(this.request);

        // The logged user cant disable to himself.
        if(userId === this.id()){
            return true;
        }
        return this.request.body.hasOwnProperty('enable') ? this.request.body.enable : true;
    }

    id(): string
    {
        return this.request.params.id;
    }

    static validate()
    {
        return [
            body('firstName')
                .optional()
                .isString().withMessage('firstName must be of type string'),
            body('lastName')
                .optional()
                .isString().withMessage('lastName must be of type string'),
            body('email')
                .exists().withMessage('email must exist')
                .isString().withMessage('email must be of type string'),
            body('enable')
                .optional()
                .isBoolean().withMessage('enable must be of type boolean'),
            param('id')
                .exists().withMessage('id mus exist')
                .isLength({ min: 24, max:24 })
                .isString().withMessage('id must string type')
        ];
    }
}

export default UserUpdateRequest