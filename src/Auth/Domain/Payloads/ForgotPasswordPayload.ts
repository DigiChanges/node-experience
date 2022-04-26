import ConfirmationTokenPayload from './ConfirmationTokenPayload';

interface ForgotPasswordPayload extends ConfirmationTokenPayload
{
    email: string;
    passwordRequestedAt: Date;
}

export default ForgotPasswordPayload;
