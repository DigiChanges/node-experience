import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import UserRepPayload from './UserRepPayload';

interface UserUpdatePayload extends IdPayload, UserRepPayload
{
    get_token_user_id(): string;
}

export default UserUpdatePayload;

