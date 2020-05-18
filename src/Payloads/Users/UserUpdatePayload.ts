import IdPayload from "../Defaults/IdPayload";

interface UserUpdatePayload extends IdPayload
{
    firstName(): string | null;
    lastName(): string | null;
    email(): string;
    enable(): boolean | null;
}

export default UserUpdatePayload