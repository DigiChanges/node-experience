import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import UserPasswordRepPayload from './UserPasswordPayload';

interface ChangeMyPasswordPayload extends IdPayload, UserPasswordRepPayload
{
    currentPassword: string;
}

export default ChangeMyPasswordPayload;
