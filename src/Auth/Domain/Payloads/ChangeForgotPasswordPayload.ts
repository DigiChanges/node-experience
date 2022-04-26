import UserPasswordRepPayload from '../../../User/Domain/Payloads/UserPasswordPayload';

interface ChangeForgotPasswordPayload extends UserPasswordRepPayload
{
    confirmationToken: string;
}

export default ChangeForgotPasswordPayload;
