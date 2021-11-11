import UserUpdatePayload from '../../../InterfaceAdapters/Payloads/UserUpdatePayload';
import IdRequest from '../../../../App/Presentation/Requests/IdRequest';
import { Mixin } from 'ts-mixer';
import UserRepRequest from './UserRepRequest';
import { IsUUID } from 'class-validator';

class UserUpdateRequest extends Mixin(UserRepRequest, IdRequest) implements UserUpdatePayload
{
    @IsUUID('4')
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
