import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';

interface ChangeUserPasswordPayload extends IdPayload
{
    getNewPassword(): string;
    getNewPasswordConfirmation(): string;
}

export default ChangeUserPasswordPayload;
