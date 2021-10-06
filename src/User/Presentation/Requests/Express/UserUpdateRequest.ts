import UserUpdatePayload from '../../../InterfaceAdapters/Payloads/UserUpdatePayload';
import IdRequest from '../../../../App/Presentation/Requests/IdRequest';
import { Mixin } from 'ts-mixer';
import UserRepRequest from './UserRepRequest';
import { IsString } from 'class-validator';

class UserUpdateRequest extends Mixin(UserRepRequest, IdRequest) implements UserUpdatePayload
{
    @IsString()
    user_id: string;

    constructor(data: Record<string, any>, id: string, user_id: string)
    {
        super(data);
        this.id = id;
        this.user_id = user_id;
    }

    get_token_user_id(): string
    {
        return this.user_id;
    }
}

export default UserUpdateRequest;
