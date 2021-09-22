import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import UserRepPayload from './UserRepPayload';

interface UserUpdatePayload extends IdPayload, UserRepPayload
{
    getTokenUserId(): string;
}

export default UserUpdatePayload;

