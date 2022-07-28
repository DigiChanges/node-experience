import { Mixin } from 'ts-mixer';
import UserPasswordRequest from '../../../User/Presentation/Requests/UserPasswordRequest';
import UserWithoutPermissionsRequest
    from '../../../User/Presentation/Requests/UserWithoutPermissionsRequest';
import moment from 'moment';
import RegisterPayload from '../../Domain/Payloads/RegisterPayload';

class RegistrationRequest extends Mixin(UserWithoutPermissionsRequest, UserPasswordRequest) implements RegisterPayload
{
    constructor(data: Record<string, any>)
    {
        super(data);
    }

    get confirmationToken(): string
    {
        return `${this.email}${moment().utc().unix()}`;
    }
}

export default RegistrationRequest;
