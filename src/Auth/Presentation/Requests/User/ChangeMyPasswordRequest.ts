import { IsString, IsUUID, Length } from 'class-validator';
import MainConfig from '../../../../Config/MainConfig';
import ChangeMyPasswordPayload from '../../../Domain/Payloads/User/ChangeMyPasswordPayload';
import UserPasswordRequest from './UserPasswordRequest';

class ChangeMyPasswordRequest extends UserPasswordRequest implements ChangeMyPasswordPayload
{
    private readonly _currentPassword: string;
    private readonly _id: string;

    constructor(data: Record<string, any>)
    {
        super(data);
        this._currentPassword = data.currentPassword;
        this._id = data.userId;
    }

    @IsString()
    @Length(
        MainConfig.getInstance().getConfig().validationSettings.password.minLength,
        MainConfig.getInstance().getConfig().validationSettings.password.maxLength
    )
    get currentPassword(): string
    {
        return this._currentPassword;
    }

    @IsUUID('4')
    get id(): string
    {
        return this._id;
    }
}

export default ChangeMyPasswordRequest;
