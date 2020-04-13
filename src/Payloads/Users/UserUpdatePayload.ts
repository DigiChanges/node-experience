import IdPayload from "../Defaults/IdPayload";
import UserRepPayload from "./UserRepPayload";

interface UserUpdatePayload extends IdPayload
{
    email(): string;
    enable(): boolean;
}

export default UserUpdatePayload