import ChangeMyPasswordPayload from '../../../InterfaceAdapters/Payloads/ChangeMyPasswordPayload';
import { IsString, IsUUID, Length } from 'class-validator';
import Config from 'config';
import UserRepPasswordRequest from './UserRepPasswordRequest';

class ChangeMyPasswordRequest extends UserRepPasswordRequest implements ChangeMyPasswordPayload
{
    @IsString()
    @Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max'))
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
