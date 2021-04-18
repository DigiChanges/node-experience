import IdPayload from '../../../App/InterfaceAdapters/Payloads/IdPayload';

interface ChangeMyPasswordPayload extends IdPayload
{
    getCurrentPassword(): string;
    getNewPassword(): string;
    getNewPasswordConfirmation(): string;
}

export default ChangeMyPasswordPayload;
