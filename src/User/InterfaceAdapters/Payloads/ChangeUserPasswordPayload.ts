import IdPayload from '../../../App/InterfaceAdapters/Payloads/IdPayload';

interface ChangeUserPasswordPayload extends IdPayload
{
    getNewPassword(): string;
    getNewPasswordConfirmation(): string;
}

export default ChangeUserPasswordPayload;
