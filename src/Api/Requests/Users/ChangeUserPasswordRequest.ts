import * as express from "express";
import ChangeUserPasswordPayload from "../../../Payloads/Users/ChangeUserPasswordPayload";
import {body, param} from "express-validator";

class ChangeUserPasswordRequest implements ChangeUserPasswordPayload
{
    private request: express.Request;

    constructor(request: express.Request)
    {
        this.request = request;
    }

    newPassword(): string
    {
        return this.request.body.newPassword;
    }

    newPasswordConfirmation(): string
    {
        return this.request.body.newPasswordConfirmation;
    }

    id(): string
    {
        return this.request.params.id;
    }

    static validate()
    {
        return [
            body('newPassword')
                .exists().withMessage('newPassword must exist')
                .isString().withMessage('newPassword must be of type string')
                .custom((value, { req }) => value === req.body.newPasswordConfirmation).withMessage("newPassword don't match"),
            body('newPasswordConfirmation')
                .exists().withMessage('newPasswordConfirmation must exist')
                .isString().withMessage('newPasswordConfirmation must be of type string'),
            param('id')
                .exists().withMessage('id must exist')
                .isLength({ min: 24, max:24 })
                .isString().withMessage('id must string type')
        ];
    }
}

export default ChangeUserPasswordRequest