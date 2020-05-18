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

    firstName(): string | null
    {
        return this.request.body.hasOwnProperty('firstName') ? this.request.body.firstName : null;
    }

    lastName(): string | null
    {
        return this.request.body.hasOwnProperty('lastName') ? this.request.body.lastName : null;
    }

    email(): string
    {
        return this.request.body.email;
    }

    enable(): boolean | null
    {
        if(!this.request.body.hasOwnProperty('enable')){
            return null;
        }

        const userId = AuthService.getLoggedId(this.request);

        // The logged user cant disable to himself.
        if(userId === this.id()){
            return true;
        }
        return this.request.body.enable;
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
                .isLength({ min: 3, max: 50 }).withMessage("firstName can\'t be empty")
                .isString().withMessage('firstName must be of type string'),
            body('lastName')
                .optional()
                .isLength({ min: 3, max: 50 }).withMessage("lastName can\'t be empty")
                .isString().withMessage('lastName must be of type string'),
            body('email')
                .exists().withMessage('email must exist')
                .isEmail().withMessage('email must be a valid email'),
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