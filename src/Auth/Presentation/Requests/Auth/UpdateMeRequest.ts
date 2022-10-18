import { Mixin } from 'ts-mixer';
import UserWithoutPermissionsRequest
    from '../User/UserWithoutPermissionsRequest';
import UserRepPayload from '../../../Domain/Payloads/User/UserRepPayload';
import IUserDomain from '../../../Domain/Entities/IUserDomain';

class UpdateMeRequest extends Mixin(UserWithoutPermissionsRequest) implements UserRepPayload
{
    private readonly _authUser: IUserDomain;

    constructor(data: Record<string, any>)
    {
        super(data);
        this._authUser = data.authUser;
    }

    get authUser()
    {
        return this._authUser;
    }
}

export default UpdateMeRequest;
