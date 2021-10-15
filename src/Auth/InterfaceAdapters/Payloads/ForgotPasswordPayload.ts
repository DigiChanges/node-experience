
interface ForgotPasswordPayload
{
    getEmail(): string;
    getConfirmationToken(): Promise<string>;
    getPasswordRequestedAt(): Date;
}

export default ForgotPasswordPayload;
