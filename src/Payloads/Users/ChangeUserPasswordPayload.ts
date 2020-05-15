import IdPayload from "../Defaults/IdPayload";

interface ChangeUserPasswordPayload extends IdPayload
{
    newPassword(): string;
    newPasswordConfirmation(): string;
}

export default ChangeUserPasswordPayload