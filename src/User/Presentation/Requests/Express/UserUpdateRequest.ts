import UserUpdatePayload from '../../../InterfaceAdapters/Payloads/UserUpdatePayload';
import IdRequest from '../../../../App/Presentation/Requests/IdRequest';
import { decorate, Mixin } from 'ts-mixer';
import UserRepRequest from './UserRepRequest';
import { IsUUID } from 'class-validator';
import { IsEmail, IsString, IsUUID, Length } from 'class-validator';
import { Unique } from '../../../../Shared/Decorators/unique';
import { REPOSITORIES } from '../../../../repositories';

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
