interface ChangeForgotPasswordPayload
{
    confirmationToken(): string;
    password(): Promise<string>;
    passwordConfirmation(): string;
}

export default ChangeForgotPasswordPayload