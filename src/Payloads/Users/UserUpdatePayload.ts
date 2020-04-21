import IdPayload from "../Defaults/IdPayload";

interface UserUpdatePayload extends IdPayload
{
    email(): string;
    enable(): boolean;
}

export default UserUpdatePayload