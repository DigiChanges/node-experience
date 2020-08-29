import * as express from "express";
import ChangeUserPasswordPayload from "../../../../InterfaceAdapters/Payloads/Users/ChangeUserPasswordPayload";
import {body, param} from "express-validator";
import Config from "config";

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
                .isLength({ min: Config.get('validationSettings.password.min'), max: Config.get('validationSettings.password.max') }).withMessage("newPassword can\'t be empty")
                .isString().withMessage('newPassword must be of type string')
                .custom((value, { req }) => value === req.body.newPasswordConfirmation).withMessage("newPassword don't match"),
            body('newPasswordConfirmation')
                .exists().withMessage('newPasswordConfirmation must exist')
                .isLength({ min: Config.get('validationSettings.password.min'), max: Config.get('validationSettings.password.max') }).withMessage("newPasswordConfirmation can\'t be empty")
                .isString().withMessage('newPasswordConfirmation must be of type string'),
            param('id')
                .exists().withMessage('id must exist')
                .isUUID().withMessage('id must uuid type')
        ];
    }
}

export default ChangeUserPasswordRequest