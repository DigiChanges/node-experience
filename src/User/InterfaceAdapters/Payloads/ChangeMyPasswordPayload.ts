import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import UserPasswordRepPayload from './UserPasswordPayload';

interface ChangeMyPasswordPayload extends IdPayload, UserPasswordRepPayload
{
    getCurrentPassword(): string;
}

export default ChangeMyPasswordPayload;
