import { Mixin } from 'ts-mixer';
import UserWithoutPermissionsRequest
    from '../../../../User/Presentation/Requests/Express/UserWithoutPermissionsRequest';
import UserRepPayload from '../../../../User/InterfaceAdapters/Payloads/UserRepPayload';

class UpdateMeRequest extends Mixin(UserWithoutPermissionsRequest) implements UserRepPayload
{
    constructor(data: Record<string, any>)
    {
        super(data);
    }
}

export default UpdateMeRequest;
