import IdPayload from '../../../../Shared/Presentation/Requests/IdPayload';
import UserRepPayload from './UserRepPayload';

interface UserUpdatePayload extends IdPayload, UserRepPayload
{
    tokenUserId: string;
}

export default UserUpdatePayload;

