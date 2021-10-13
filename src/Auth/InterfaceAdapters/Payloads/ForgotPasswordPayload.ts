
interface ForgotPasswordPayload
{
    get_email(): string;
    get_confirmation_token(): Promise<string>;
    get_password_requested_at(): Date;
}

export default ForgotPasswordPayload;
