import ChangeUserPasswordPayload from '../../../Domain/Payloads/User/ChangeUserPasswordPayload';
import IdRequest from '../../../../Shared/Presentation/Requests/IdRequest';
import { Mixin } from 'ts-mixer';
import UserPasswordRequest from './UserPasswordRequest';

class ChangeUserPasswordRequest extends Mixin(UserPasswordRequest, IdRequest) implements ChangeUserPasswordPayload
{
    constructor(data: Record<string, any>)
    {
        super(data);
        this._id = data.id;
    }
}

export default ChangeUserPasswordRequest;
