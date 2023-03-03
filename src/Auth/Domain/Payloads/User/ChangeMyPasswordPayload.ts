import IdPayload from '../../../../Shared/Presentation/Requests/IdPayload';
import UserPasswordRepPayload from './UserPasswordPayload';

interface ChangeMyPasswordPayload extends IdPayload, UserPasswordRepPayload
{
    currentPassword: string;
}

export default ChangeMyPasswordPayload;
