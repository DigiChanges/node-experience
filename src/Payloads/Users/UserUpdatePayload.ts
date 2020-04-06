import IdPayload from "../Defaults/IdPayload";
import UserRepPayload from "./UserRepPayload";

interface UserUpdatePayload extends IdPayload, UserRepPayload
{
}

export default UserUpdatePayload