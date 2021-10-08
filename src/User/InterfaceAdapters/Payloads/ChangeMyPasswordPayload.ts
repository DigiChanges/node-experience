import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import UserPasswordRepPayload from './UserPasswordPayload';

interface ChangeMyPasswordPayload extends IdPayload, UserPasswordRepPayload
{
    get_current_password(): string;
}

export default ChangeMyPasswordPayload;
