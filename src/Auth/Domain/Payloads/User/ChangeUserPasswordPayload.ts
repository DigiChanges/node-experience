import IdPayload from '../../../../Shared/Presentation/Requests/IdPayload';
import UserPasswordRepPayload from './UserPasswordPayload';

interface ChangeUserPasswordPayload extends IdPayload, UserPasswordRepPayload {}

export default ChangeUserPasswordPayload;
