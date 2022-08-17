import { Mixin } from 'ts-mixer';
import UserPasswordRequest from '../../../User/Presentation/Requests/UserPasswordRequest';
import UserWithoutPermissionsRequest
    from '../../../User/Presentation/Requests/UserWithoutPermissionsRequest';
import RegisterPayload from '../../Domain/Payloads/RegisterPayload';
import ConfirmationTokenRequest from './ConfirmationTokenRequest';

class RegisterRequest extends Mixin(UserWithoutPermissionsRequest, UserPasswordRequest, ConfirmationTokenRequest) implements RegisterPayload
{
    constructor(data: Record<string, any>)
    {
        super(data);
    }
}

export default RegisterRequest;
