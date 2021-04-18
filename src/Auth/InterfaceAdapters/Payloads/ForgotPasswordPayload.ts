
interface ForgotPasswordPayload
{
    getEmail(): string;
    getConfirmationToken(): Promise<string>;
    getPasswordRequestedAT(): Date;
}

export default ForgotPasswordPayload;
