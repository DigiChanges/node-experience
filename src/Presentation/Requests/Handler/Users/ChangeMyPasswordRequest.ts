import * as express from "express";
import ChangeMyPasswordPayload from "../../../../InterfaceAdapters/Payloads/Users/ChangeMyPasswordPayload";
import Config from "config";
import {lazyInject} from "../../../../inversify.config";
import {SERVICES} from "../../../../services";
import IAuthService from "../../../../InterfaceAdapters/IServices/IAuthService";
import {IsArray, IsBoolean, IsOptional, IsString} from "class-validator";

class ChangeMyPasswordRequest implements ChangeMyPasswordPayload
{
    private request: express.Request;
    @lazyInject(SERVICES.IAuthService)
    private service: IAuthService;

    @IsString()
    name: string;

    @IsString()
    slug: string;

    @IsArray()
    permissions: string[];

    @IsOptional()
    @IsBoolean()
    enable: boolean;

    constructor(request: express.Request)
    {
        this.request = request;
    }

    getCurrentPassword(): string
    {
        return this.request.body.currentPassword;
    }

    getNewPassword(): string
    {
        return this.request.body.newPassword;
    }

    getNewPasswordConfirmation(): string
    {
        return this.request.body.newPasswordConfirmation;
    }

    getId(): any
    {
        let tokenDecoded = this.service.decodeToken(this.request.get('Authorization'));

        return tokenDecoded.userId;
    }

    // static validate()
    // {
    //     return [
    //         body('currentPassword')
    //             .exists().withMessage('currentPassword must exist')
    //             .isLength({ min: Config.get('validationSettings.password.min'), max: Config.get('validationSettings.password.max') }).withMessage("currentPassword can\'t be empty")
    //             .isString().withMessage('currentPassword must be of type string')
    //             .custom((value, { req }) => value !== req.body.newPassword).withMessage("CurrentPassword and NewPassword can't be the same"),
    //         body('newPassword')
    //             .exists().withMessage('newPassword must exist')
    //             .isLength({ min: Config.get('validationSettings.password.min'), max: Config.get('validationSettings.password.max') }).withMessage("newPassword can\'t be empty")
    //             .isString().withMessage('newPassword must be of type string')
    //             .custom((value, { req }) => value === req.body.newPasswordConfirmation).withMessage("newPassword don't match"),
    //         body('newPasswordConfirmation')
    //             .exists().withMessage('newPasswordConfirmation must exist')
    //             .isLength({ min: Config.get('validationSettings.password.min'), max: Config.get('validationSettings.password.max') }).withMessage("newPasswordConfirmation can\'t be empty")
    //             .isString().withMessage('newPasswordConfirmation must be of type string')
    //     ];
    // }
}

export default ChangeMyPasswordRequest;
