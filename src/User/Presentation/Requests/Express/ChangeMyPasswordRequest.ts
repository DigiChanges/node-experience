import { IsString, IsUUID, Length } from 'class-validator';
import MainConfig from '../../../../Config/mainConfig';
import ChangeMyPasswordPayload from '../../../InterfaceAdapters/Payloads/ChangeMyPasswordPayload';
import UserRepPasswordRequest from './UserRepPasswordRequest';

class ChangeMyPasswordRequest extends UserRepPasswordRequest implements ChangeMyPasswordPayload
{
    @IsString()
    @Length(MainConfig.getInstance().getConfig().validationSettings.password.minLength,
        MainConfig.getInstance().getConfig().validationSettings.password.maxLength)
    currentPassword: string;

    @IsUUID('4')
    userId: string;

    constructor(data: Record<string, any>, userId: string)
    {
        super(data);
        this.currentPassword = data.currentPassword;
        this.userId = userId;
    }

    getCurrentPassword(): string
    {
        return this.currentPassword;
    }

    getId(): any
    {
        return this.userId;
    }
}

export default ChangeMyPasswordRequest;
