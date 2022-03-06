
interface ForgotPasswordPayload
{
    email: string;
    confirmationToken: string;
    passwordRequestedAt: Date;
}

export default ForgotPasswordPayload;
