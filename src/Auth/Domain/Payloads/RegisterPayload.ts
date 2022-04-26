import UserSavePayload from '../../../User/Domain/Payloads/UserSavePayload';
import ConfirmationTokenPayload from './ConfirmationTokenPayload';

interface RegisterPayload extends UserSavePayload, ConfirmationTokenPayload {}

export default RegisterPayload;
