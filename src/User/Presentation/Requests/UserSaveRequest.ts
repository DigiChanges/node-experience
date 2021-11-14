import { Mixin } from 'ts-mixer';
import UserSavePayload from '../../InterfaceAdapters/Payloads/UserSavePayload';
import UserRepPasswordRequest from './UserRepPasswordRequest';
import UserRepRequest from './UserRepRequest';

class UserSaveRequest extends Mixin(UserRepRequest, UserRepPasswordRequest) implements UserSavePayload
{
    constructor(data: Record<string, any>)
    {
        super(data);
    }
}

export default UserSaveRequest;
