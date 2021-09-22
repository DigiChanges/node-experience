import ChangeMyPasswordPayload from '../../../InterfaceAdapters/Payloads/ChangeMyPasswordPayload';
import {IsString, IsUUID, Length} from 'class-validator';
import Config from 'config';
import {Match} from '../../../../Shared/Decorators/Match';

class ChangeMyPasswordRequest implements ChangeMyPasswordPayload
{
    @IsString()
    @Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max'))
    currentPassword: string;

    @IsString()
    @Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max'))
    newPassword: string;

    @IsString()
    @Match('newPassword', {message: 'newPassword don\'t match'})
    newPasswordConfirmation: string;

    @IsUUID('4')
    userId: string;

    constructor(data: Record<string, any>, userId: string)
    {
        this.currentPassword = data.currentPassword;
        this.newPassword = data.newPassword;
        this.newPasswordConfirmation = data.newPasswordConfirmation;
        this.userId = userId;
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
