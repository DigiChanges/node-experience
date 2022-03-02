
interface ChangeForgotPasswordPayload
{
    getConfirmationToken(): string;
    getPassword(): string;
    getPasswordConfirmation(): string;
}

export default ChangeForgotPasswordPayload;
