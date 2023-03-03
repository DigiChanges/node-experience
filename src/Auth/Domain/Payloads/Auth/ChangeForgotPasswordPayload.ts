import UserPasswordRepPayload from '../User/UserPasswordPayload';
import ConfirmationTokenPayload from './ConfirmationTokenPayload';

interface ChangeForgotPasswordPayload extends UserPasswordRepPayload, ConfirmationTokenPayload {}

export default ChangeForgotPasswordPayload;
