import IdPayload from "../Defaults/IdPayload";

interface ChangeUserPasswordPayload extends IdPayload
{
    getNewPassword(): string;
    getNewPasswordConfirmation(): string;
}

export default ChangeUserPasswordPayload;
