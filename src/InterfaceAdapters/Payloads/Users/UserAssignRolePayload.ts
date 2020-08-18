import IdPayload from "../Defaults/IdPayload";

interface UserAssignRolePayload extends IdPayload
{
    rolesId(): string[];
}

export default UserAssignRolePayload