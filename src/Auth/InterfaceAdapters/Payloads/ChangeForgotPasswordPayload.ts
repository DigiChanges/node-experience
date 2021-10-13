
interface ChangeForgotPasswordPayload
{
    get_confirmation_token(): string;
    get_password(): Promise<string>;
    get_password_confirmation(): string;
}

export default ChangeForgotPasswordPayload;
