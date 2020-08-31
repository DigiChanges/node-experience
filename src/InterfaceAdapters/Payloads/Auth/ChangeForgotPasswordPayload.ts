interface ChangeForgotPasswordPayload
{
    getConfirmationToken(): string;
    getPassword(): Promise<string>;
    getPasswordConfirmation(): string;
}

export default ChangeForgotPasswordPayload