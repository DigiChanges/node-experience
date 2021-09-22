import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import UserPasswordRepPayload from './UserPasswordPayload';

interface ChangeUserPasswordPayload extends IdPayload, UserPasswordRepPayload {}

export default ChangeUserPasswordPayload;
