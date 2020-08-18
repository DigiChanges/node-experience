interface ForgotPasswordPayload
{
    email(): string;
    confirmationToken(): Promise<string>;
    passwordRequestedAT(): Date;
}

export default ForgotPasswordPayload