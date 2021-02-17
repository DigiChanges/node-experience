import * as express from "express";
import {IsString} from "class-validator";

import ChangeUserPasswordPayload from "../../../../InterfaceAdapters/Payloads/Users/ChangeUserPasswordPayload";
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
}

export default ChangeUserPasswordRequest;
