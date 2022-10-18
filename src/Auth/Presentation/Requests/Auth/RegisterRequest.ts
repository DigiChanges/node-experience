import { Mixin } from 'ts-mixer';
import UserPasswordRequest from '../User/UserPasswordRequest';
import UserWithoutPermissionsRequest
    from '../User/UserWithoutPermissionsRequest';
import RegisterPayload from '../../../Domain/Payloads/Auth/RegisterPayload';
import ConfirmationTokenRequest from './ConfirmationTokenRequest';

class RegisterRequest extends Mixin(UserWithoutPermissionsRequest, UserPasswordRequest, ConfirmationTokenRequest) implements RegisterPayload
{
    constructor(data: Record<string, any>)
    {
        super(data);
    }
}

export default RegisterRequest;
