import * as express from "express";
import ChangeUserPasswordPayload from "../../../../InterfaceAdapters/Payloads/Users/ChangeUserPasswordPayload";
import {body, param} from "express-validator";
import Config from "config";
import {IsString} from "class-validator";
import IdRequest from "../Defaults/IdRequest";

class ChangeUserPasswordRequest extends IdRequest implements ChangeUserPasswordPayload
{
    @IsString()
    newPassword: string;

    @IsString()
    newPasswordConfirmation: string;

    constructor(request: express.Request)
    {
        super(request);
        this.newPassword = request.body.newPassword;
        this.newPasswordConfirmation = request.body.newPasswordConfirmation;
    }

    getNewPassword(): string
    {
        return this.newPassword;
    }

    getNewPasswordConfirmation(): string
    {
        return this.newPasswordConfirmation;
    }

    // static validate()
    // {
    //     return [
    //         body('newPassword')
    //             .exists().withMessage('newPassword must exist')
    //             .isLength({ min: Config.get('validationSettings.password.min'), max: Config.get('validationSettings.password.max') }).withMessage("newPassword can\'t be empty")
    //             .isString().withMessage('newPassword must be of type string')
    //             .custom((value, { req }) => value === req.body.newPasswordConfirmation).withMessage("newPassword don't match"),
    //         body('newPasswordConfirmation')
    //             .exists().withMessage('newPasswordConfirmation must exist')
    //             .isLength({ min: Config.get('validationSettings.password.min'), max: Config.get('validationSettings.password.max') }).withMessage("newPasswordConfirmation can\'t be empty")
    //             .isString().withMessage('newPasswordConfirmation must be of type string'),
    //         param('id')
    //             .exists().withMessage('id must exist')
    //             .isUUID().withMessage('id must uuid type')
    //     ];
    // }
}

export default ChangeUserPasswordRequest