import IdPayload from "../Defaults/IdPayload";

interface UserUpdatePayload extends IdPayload
{
    getFirstName(): string | null;
    getLastName(): string | null;
    getEmail(): string;
    getEnable(): boolean | null;
}

export default UserUpdatePayload