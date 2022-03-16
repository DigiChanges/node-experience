import { Mixin } from 'ts-mixer';
import UserSavePayload from '../../Domain/Payloads/UserSavePayload';
import UserPasswordRequest from './UserPasswordRequest';
import UserRepRequest from './UserRepRequest';

class UserSaveRequest extends Mixin(UserRepRequest, UserPasswordRequest) implements UserSavePayload
{
    constructor(data: Record<string, any>)
    {
        super(data);
    }
}

export default UserSaveRequest;
