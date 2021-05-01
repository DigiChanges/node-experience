import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';

interface ChangeMyPasswordPayload extends IdPayload
{
    getCurrentPassword(): string;
    getNewPassword(): string;
    getNewPasswordConfirmation(): string;
}

export default ChangeMyPasswordPayload;
