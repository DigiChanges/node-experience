import IdPayload from "../Defaults/IdPayload";

interface ChangeMyPasswordPayload extends IdPayload
{
    getCurrentPassword(): string;
    getNewPassword(): string;
    getNewPasswordConfirmation(): string;
}

export default ChangeMyPasswordPayload;
