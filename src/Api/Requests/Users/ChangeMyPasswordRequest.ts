import * as express from "express";
import ChangeMyPasswordPayload from "../../../Payloads/Users/ChangeMyPasswordPayload";
import {body} from "express-validator";
import AuthService from "../../../Services/AuthService";
import Config from "config";

class ChangeMyPasswordRequest implements ChangeMyPasswordPayload
{
    private request: express.Request;

    constructor(request: express.Request)
    {
        this.request = request;
    }

    currentPassword(): string
    {
        return this.request.body.currentPassword;
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
        let tokenDecoded = AuthService.decodeToken(this.request.get('Authorization'));

        return tokenDecoded.userId;
    }

    static validate()
    {
        return [
            body('currentPassword')
                .exists().withMessage('currentPassword must exist')
                .isLength({ min: Config.get('validationSettings.password.min'), max: Config.get('validationSettings.password.max') }).withMessage("currentPassword can\'t be empty")
                .isString().withMessage('currentPassword must be of type string')
                .custom((value, { req }) => value !== req.body.newPassword).withMessage("CurrentPassword and NewPassword can't be the same"),
            body('newPassword')
                .exists().withMessage('newPassword must exist')
                .isLength({ min: Config.get('validationSettings.password.min'), max: Config.get('validationSettings.password.max') }).withMessage("newPassword can\'t be empty")
                .isString().withMessage('newPassword must be of type string')
                .custom((value, { req }) => value === req.body.newPasswordConfirmation).withMessage("newPassword don't match"),
            body('newPasswordConfirmation')
                .exists().withMessage('newPasswordConfirmation must exist')
                .isLength({ min: Config.get('validationSettings.password.min'), max: Config.get('validationSettings.password.max') }).withMessage("newPasswordConfirmation can\'t be empty")
                .isString().withMessage('newPasswordConfirmation must be of type string')
        ];
    }
}

export default ChangeMyPasswordRequest