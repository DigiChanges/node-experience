import { Mixin } from 'ts-mixer';
import UserRepPasswordRequest from '../../../../User/Presentation/Requests/Express/UserRepPasswordRequest';
import RegisterPayload from '../../../InterfaceAdapters/Payloads/RegisterPayload';
import UserWithoutPermissionsRequest
    from '../../../../User/Presentation/Requests/Express/UserWithoutPermissionsRequest';

class RegisterRequest extends Mixin(UserWithoutPermissionsRequest, UserRepPasswordRequest) implements RegisterPayload
{
    constructor(data: Record<string, any>)
    {
        super(data);
    }
}

export default RegisterRequest;
