import { Mixin } from 'ts-mixer';
import UserWithoutPermissionsRequest
    from '../../../User/Presentation/Requests/UserWithoutPermissionsRequest';
import UserRepPayload from '../../../User/Domain/Payloads/UserRepPayload';
import IUserDomain from '../../../User/Domain/Entities/IUserDomain';

class UpdateMeRequest extends Mixin(UserWithoutPermissionsRequest) implements UserRepPayload
{
    private readonly _authUser: IUserDomain;

    constructor(data: Record<string, any>, authUser: IUserDomain)
    {
        super(data);
        this._authUser = authUser;
    }

    get authUser()
    {
        return this._authUser;
    }
}

export default UpdateMeRequest;
