import UserSavePayload from '../User/UserSavePayload';
import ConfirmationTokenPayload from './ConfirmationTokenPayload';

interface RegisterPayload extends UserSavePayload, ConfirmationTokenPayload {}

export default RegisterPayload;
