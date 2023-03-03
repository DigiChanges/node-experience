import UserPasswordRepPayload from './UserPasswordPayload';
import UserRepPayload from './UserRepPayload';

interface UserSavePayload extends UserPasswordRepPayload, UserRepPayload {}

export default UserSavePayload;
