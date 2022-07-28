import { decorate, Mixin } from 'ts-mixer';
import { IsUUID } from 'class-validator';
import UserRepRequest from './UserRepRequest';
import IdRequest from '../../../App/Presentation/Requests/IdRequest';
import UserUpdatePayload from '../../Domain/Payloads/UserUpdatePayload';

class UserUpdateRequest extends Mixin(UserRepRequest, IdRequest) implements UserUpdatePayload
{
    private readonly _tokenUserId: string;

    constructor(data: Record<string, any>)
    {
        super(data);
        this._tokenUserId = data.userId;
    }

    @decorate(IsUUID('4'))
    get tokenUserId(): string
    {
        return this._tokenUserId;
    }
}

export default UserUpdateRequest;
