import UserPasswordRepPayload from '../../../User/InterfaceAdapters/Payloads/UserPasswordPayload';
import UserRepPayload from '../../../User/InterfaceAdapters/Payloads/UserRepPayload';

interface RegisterPayload extends UserPasswordRepPayload, UserRepPayload {}

export default RegisterPayload;
