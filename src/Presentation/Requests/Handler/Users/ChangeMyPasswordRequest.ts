import ChangeMyPasswordPayload from "../../../../InterfaceAdapters/Payloads/Users/ChangeMyPasswordPayload";
import {IsString, IsUUID, Length} from "class-validator";
import Config from "config";
import {Match} from "../../../../Infrastructure/Shared/Decorators/match";

class ChangeMyPasswordRequest implements ChangeMyPasswordPayload
{
    @IsString()
    @Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max'))
    currentPassword: string;

    @IsString()
    @Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max'))
    newPassword: string;

    @IsString()
    @Match('newPassword', {message: "newPassword don't match"})
    newPasswordConfirmation: string;

    @IsUUID("4")
    userId: boolean;

    constructor(request: any)
    {
        this.currentPassword = request.body.currentPassword;
        this.newPassword = request.body.newPassword;
        this.newPasswordConfirmation = request.body.newPasswordConfirmation;
        this.userId = request.tokenDecode.userId;
    }

    getCurrentPassword(): string
    {
        return this.currentPassword;
    }

    getNewPassword(): string
    {
        return this.newPassword;
    }

    getNewPasswordConfirmation(): string
    {
        return this.newPasswordConfirmation;
    }

    getId(): any
    {
        return this.userId;
    }
}

export default ChangeMyPasswordRequest;
