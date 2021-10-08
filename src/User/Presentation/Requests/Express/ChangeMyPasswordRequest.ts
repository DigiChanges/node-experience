import ChangeMyPasswordPayload from '../../../InterfaceAdapters/Payloads/ChangeMyPasswordPayload';
import { IsString, IsUUID, Length } from 'class-validator';
import Config from 'config';
import UserRepPasswordRequest from './UserRepPasswordRequest';

class ChangeMyPasswordRequest extends UserRepPasswordRequest implements ChangeMyPasswordPayload
{
    @IsString()
    @Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max'))
    current_password: string;

    @IsUUID('4')
    user_id: string;

    constructor(data: Record<string, any>, user_id: string)
    {
        super(data);
        this.current_password = data.current_password;
        this.user_id = user_id;
    }

    get_current_password(): string
    {
        return this.current_password;
    }

    get_id(): any
    {
        return this.user_id;
    }
}

export default ChangeMyPasswordRequest;
