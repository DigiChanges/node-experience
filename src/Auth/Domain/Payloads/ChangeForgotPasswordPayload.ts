import UserPasswordRepPayload from '../../../User/Domain/Payloads/UserPasswordPayload';
import ConfirmationTokenPayload from './ConfirmationTokenPayload';

interface ChangeForgotPasswordPayload extends UserPasswordRepPayload, ConfirmationTokenPayload {}

export default ChangeForgotPasswordPayload;
