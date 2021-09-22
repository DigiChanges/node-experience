import UserUpdatePayload from '../../../InterfaceAdapters/Payloads/UserUpdatePayload';
import IdRequest from '../../../../App/Presentation/Requests/Express/IdRequest';
import {Mixin} from 'ts-mixer';
import UserRepRequest from './UserRepRequest';
import {IsString} from 'class-validator';

class UserUpdateRequest extends Mixin(UserRepRequest, IdRequest) implements UserUpdatePayload
{
    @IsString()
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
