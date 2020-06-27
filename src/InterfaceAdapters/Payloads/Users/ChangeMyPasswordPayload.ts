import IdPayload from "../Defaults/IdPayload";

interface ChangeMyPasswordPayload extends IdPayload
{
    currentPassword(): string;
    newPassword(): string;
    newPasswordConfirmation(): string;
}

export default ChangeMyPasswordPayload