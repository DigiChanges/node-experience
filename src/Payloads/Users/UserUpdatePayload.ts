import IdPayload from "../Defaults/IdPayload";

interface UserUpdatePayload extends IdPayload
{
    firstName(): string;
    lastName(): string;
    email(): string;
    enable(): boolean;
}

export default UserUpdatePayload