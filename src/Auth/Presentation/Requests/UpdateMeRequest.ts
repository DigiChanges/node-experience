import { Mixin } from 'ts-mixer';
import UserWithoutPermissionsRequest
    from '../../../User/Presentation/Requests/UserWithoutPermissionsRequest';
import UserRepPayload from '../../../User/Domain/Payloads/UserRepPayload';

class UpdateMeRequest extends Mixin(UserWithoutPermissionsRequest) implements UserRepPayload
{
    constructor(data: Record<string, any>)
    {
        super(data);
    }
}

export default UpdateMeRequest;
