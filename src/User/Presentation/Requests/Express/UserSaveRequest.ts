import { Mixin } from 'ts-mixer';
import UserSavePayload from '../../../InterfaceAdapters/Payloads/UserSavePayload';
import UserRepPasswordRequest from './UserRepPasswordRequest';
import UserRepRequest from './UserRepRequest';

class UserSaveRequest extends Mixin(UserRepRequest, UserRepPasswordRequest) implements UserSavePayload
{
    constructor(data: Record<string, any>)
    {
        super(data);
        this.password = data.password;
        this.passwordConfirmation = data.password_confirmation;
    }
}

export default UserSaveRequest;
