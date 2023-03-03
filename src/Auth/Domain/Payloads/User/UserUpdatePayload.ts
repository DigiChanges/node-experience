import IdPayload from '../../../../Shared/Presentation/Requests/IdPayload';
import UserRepPayload from './UserRepPayload';

interface UserUpdatePayload extends IdPayload, UserRepPayload
{
    userId: string;
}

export default UserUpdatePayload;

