import UserPasswordRepPayload from '../../../User/Domain/Payloads/UserPasswordPayload';
import UserRepPayload from '../../../User/Domain/Payloads/UserRepPayload';

interface RegisterPayload extends UserPasswordRepPayload, UserRepPayload {}

export default RegisterPayload;
