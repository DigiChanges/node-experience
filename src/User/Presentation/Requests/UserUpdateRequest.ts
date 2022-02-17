import { decorate, Mixin } from 'ts-mixer';
import { IsUUID } from 'class-validator';
import UserRepRequest from './UserRepRequest';
import IdRequest from '../../../App/Presentation/Requests/IdRequest';
import UserUpdatePayload from '../../InterfaceAdapters/Payloads/UserUpdatePayload';

class UserUpdateRequest extends Mixin(UserRepRequest, IdRequest) implements UserUpdatePayload
{
    @decorate(IsUUID('4'))
        userId: string;

    constructor(data: Record<string, any>, id: string, userId: string)
    {
        super(data);
        this.id = id;
        this.userId = userId;
    }

    getTokenUserId(): string
    {
        return this.userId;
    }
}

export default UserUpdateRequest;
